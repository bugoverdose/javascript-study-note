import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "src/jwt/jwt.service";
import { Repository } from "typeorm";
import { User, UserRole } from "./entities/user.entity";
import { UserService } from "./user.service";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findOneOrFail: jest.fn(),
});

const SIGNED_TOKEN = "createdToken";

const mockJwtService = () => ({
  sign: jest.fn(() => SIGNED_TOKEN),
  verify: jest.fn(),
});

describe("Userervice", () => {
  let service: UserService;
  let usersRepo: MockRepository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository() },
        { provide: JwtService, useValue: mockJwtService() },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    usersRepo = module.get(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createAccount", () => {
    const createAccountInput = {
      email: "test1@naver.com",
      password: "testtest",
      role: UserRole.Host,
    };
    const createdUserEntity = {
      id: 1,
      createdAt: 123,
      updatedAt: 123, // 기타 메서드 생략.
      ...createAccountInput,
    };
    it("should fail if the user already exists", async () => {
      usersRepo.findOne.mockResolvedValue({
        id: 1,
        email: "test@naver.com",
      });
      const result = await service.createAccount(createAccountInput);
      expect(result).toMatchObject({
        ok: false,
        error: "User with the given email address already exists",
      });
    });

    it("should create a new user", async () => {
      usersRepo.findOne.mockResolvedValue(undefined);
      usersRepo.create.mockResolvedValue(createdUserEntity);
      usersRepo.save.mockResolvedValue(createdUserEntity);
      const result = await service.createAccount(createAccountInput);
      expect(result).toMatchObject({ ok: true, id: 1 });
      expect(usersRepo.findOne).toBeCalledTimes(1);
      expect(usersRepo.findOne).toBeCalledWith({
        email: createAccountInput.email,
      });
      expect(usersRepo.create).toBeCalledTimes(1);
      expect(usersRepo.create).toBeCalledWith(createAccountInput);
      expect(usersRepo.save).toBeCalledTimes(1);
      expect(usersRepo.save).toBeCalledWith(
        new Promise(() => createdUserEntity)
      );
    });

    it("should fail on exception", async () => {
      usersRepo.findOne.mockRejectedValue(new Error());
      const result = await service.createAccount(createAccountInput);
      expect(result).toMatchObject({
        ok: false,
        error: "Failed to Create an Account.",
      });
    });
  });

  describe("login", () => {
    const loginInput = {
      email: "test1@naver.com",
      password: "testtest",
    };

    it("should fail with wrong email", async () => {
      usersRepo.findOne.mockResolvedValue(undefined);
      const result = await service.login(loginInput);
      expect(result).toMatchObject({
        ok: false,
        error: "User with the given email does not exist.",
      });
      expect(usersRepo.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepo.findOne).toHaveBeenCalledWith(
        { email: loginInput.email },
        { select: ["id", "password"] }
      );
    });

    it("should fail with wrong password", async () => {
      const mockedUserEntity = {
        // email, password, role, id, createdAt, updatedAt 값이 존재하는 Entity 데이터로 간주.
        checkPassword: jest.fn(() => Promise.resolve(false)),
      };
      usersRepo.findOne.mockResolvedValue(mockedUserEntity);
      const result = await service.login(loginInput);
      expect(result).toEqual({ ok: false, error: "Wrong Password" });
      expect(usersRepo.findOne).toHaveBeenCalledTimes(1);
      expect(mockedUserEntity.checkPassword).toHaveBeenCalledWith(
        loginInput.password
      );
      expect(mockedUserEntity.checkPassword).toHaveBeenCalledTimes(1);
    });

    it("should create a token and log the user in with correct password", async () => {
      const mockedUserEntity = {
        id: 1, // email, password, role, id, createdAt, updatedAt 값이 존재하는 Entity 데이터로 간주.
        checkPassword: jest.fn(() => Promise.resolve(true)),
      };
      usersRepo.findOne.mockResolvedValue(mockedUserEntity);
      const result = await service.login(loginInput);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith(mockedUserEntity.id);
      expect(result).toEqual({ ok: true, token: SIGNED_TOKEN });
    });

    it("should fail on exception", async () => {
      usersRepo.findOne.mockRejectedValue(new Error());
      const result = await service.login(loginInput);
      expect(result).toEqual({ ok: false, error: "Failed to Login" });
    });
  });

  describe("seeProfile", () => {
    it("should find the user", async () => {
      usersRepo.findOneOrFail.mockResolvedValue({ id: 1 });
      const result = await service.seeProfile({ userId: 1 });
      expect(result).toEqual({ ok: true, user: { id: 1 } });
    });

    it("should fail on exception", async () => {
      usersRepo.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.seeProfile({ userId: 1 });
      expect(result).toEqual({ ok: false, error: "Failed to Find the User" });
    });
  });

  // 주의: 로그인된 UserEntity 자체를 인자로 받는 경우.
  describe("editProfile", () => {
    const currentAccountInput = {
      email: "test1@naver.com",
      password: "testtest1",
      role: UserRole.Host,
    };
    const editProfileInput = {
      email: "test2@naver.com",
      password: "testtest2",
    };

    it("should fail on same email input", async () => {
      usersRepo.create.mockResolvedValue({ id: 1, ...currentAccountInput });
      const currentUser = await usersRepo.create(currentAccountInput);
      const result = await service.editProfile(currentUser, {
        email: currentAccountInput.email,
      });
      expect(result).toEqual({
        ok: false,
        error: "You are already using that email.",
      });
    });

    it("should fail on already taken email", async () => {
      usersRepo.create.mockResolvedValue({ id: 1, ...currentAccountInput });
      const currentUser = await usersRepo.create(currentAccountInput);
      usersRepo.findOne.mockResolvedValue("anotherUserEntityFromDB");
      const result = await service.editProfile(currentUser, {
        email: editProfileInput.email,
      });
      expect(result).toEqual({
        ok: false,
        error: "User with the given email address already exists.",
      });
    });

    it("should edit email", async () => {
      usersRepo.create.mockResolvedValue({ id: 1, ...currentAccountInput });
      const currentUser = await usersRepo.create(currentAccountInput);
      usersRepo.findOne.mockResolvedValue(undefined);
      const result = await service.editProfile(currentUser, {
        email: editProfileInput.email,
      });
      expect(result).toEqual({ ok: true });
      expect(usersRepo.findOne).toBeCalledTimes(1);
      expect(usersRepo.findOne).toBeCalledWith({
        email: editProfileInput.email,
      });
      expect(usersRepo.save).toBeCalledTimes(1);
      expect(usersRepo.save).toBeCalledWith({
        ...currentUser,
        email: editProfileInput.email,
      });
    });

    it("should fail on same password input", async () => {
      const mockedCurrentUserEntity = {
        id: 1,
        ...currentAccountInput,
        checkPassword: jest.fn(() => Promise.resolve(true)),
      };
      usersRepo.create.mockResolvedValue(mockedCurrentUserEntity);
      const currentUser = await usersRepo.create(currentAccountInput);
      usersRepo.findOne.mockResolvedValue(currentUser);
      const result = await service.editProfile(currentUser, {
        password: editProfileInput.password,
      });
      expect(result).toEqual({
        ok: false,
        error: "You are already using that password.",
      });
      expect(usersRepo.findOne).toBeCalledWith(currentUser.id, {
        select: ["password"],
      });
      expect(mockedCurrentUserEntity.checkPassword).toHaveBeenCalledWith(
        editProfileInput.password
      );
      expect(mockedCurrentUserEntity.checkPassword).toHaveBeenCalledTimes(1);
    });

    it("should edit password", async () => {
      const mockedCurrentUserEntity = {
        id: 1,
        ...currentAccountInput,
        checkPassword: jest.fn(() => Promise.resolve(false)),
      };
      usersRepo.create.mockResolvedValue(mockedCurrentUserEntity);
      const currentUser = await usersRepo.create(currentAccountInput);
      usersRepo.findOne.mockResolvedValue(currentUser);
      const result = await service.editProfile(currentUser, {
        password: editProfileInput.password,
      });
      expect(result).toEqual({ ok: true });
      expect(usersRepo.findOne).toBeCalledWith(currentUser.id, {
        select: ["password"],
      });
      expect(usersRepo.save).toBeCalledTimes(1);
      expect(usersRepo.save).toBeCalledWith({
        ...mockedCurrentUserEntity,
        password: editProfileInput.password,
      });
      expect(mockedCurrentUserEntity.checkPassword).toHaveBeenCalledWith(
        editProfileInput.password
      );
      expect(mockedCurrentUserEntity.checkPassword).toHaveBeenCalledTimes(1);
    });

    it("should fail on exception", async () => {
      usersRepo.save.mockRejectedValue(new Error());
      const currentUser = await usersRepo.create(currentAccountInput);
      const result = await service.editProfile(currentUser, editProfileInput);
      expect(result).toEqual({
        ok: false,
        error: "Failed to Edit the Profile",
      });
    });
  });
});
