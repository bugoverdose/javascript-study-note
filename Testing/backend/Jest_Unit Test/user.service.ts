import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '../jwt/jwt.service';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { SeeProfileInput, SeeProfileOutput } from './dtos/see-profile.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const existingUser = await this.usersRepo.findOne({ email });
      if (existingUser) {
        return {
          ok: false,
          error: 'User with the given email address already exists',
        };
      }
      const newUser = this.usersRepo.create({ email, password, role });
      const { id } = await this.usersRepo.save(newUser); // Repo.save 직전에 자동으로 @BeforeInsert() hashPassword 메서드 실행.
      return { ok: true, id };
    } catch (e) {
      return { ok: false, error: 'Failed to Create an Account.' };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.usersRepo.findOne(
        { email },
        { select: ['id', 'password'] }, // 해당 칼럼의 데이터들만 가져오기.
      ); // { select: false } 옵션 적용된 칼럼들 선택하기 위해 필요.
      if (!user) {
        return {
          ok: false,
          error: 'User with the given email does not exist.',
        };
      }
      const passwordCorrect = await user.checkPassword(password); // await 없으면 true/false가 아니라 Promise로 return됨. 즉 항상 참.
      if (!passwordCorrect) {
        return { ok: false, error: 'Wrong Password' };
      }
      const token = this.jwtService.sign(user.id);
      return { ok: true, token };
    } catch (e) {
      return { ok: false, error: 'Failed to Login' };
    }
  }

  async seeProfile({ userId }: SeeProfileInput): Promise<SeeProfileOutput> {
    try {
      const user = await this.usersRepo.findOneOrFail(userId); // typeORM. Repo의 findOneOrFail 메서드: 못찾으면 에러 발생 => catch문으로 이동.
      return { ok: true, user };
    } catch (e) {
      return { ok: false, error: 'Failed to Find the User' };
    }
  }

  async editProfile(
    currentUser: User,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      if (email) {
        if (currentUser.email === email) {
          return { ok: false, error: 'You are already using that email.' };
        }
        const existingUser = await this.usersRepo.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: 'User with the given email address already exists.',
          };
        }
        currentUser.email = email;
      }
      if (password) {
        const { password: currentPassword } = await this.usersRepo.findOne(
          currentUser.id,
          {
            select: ['password'],
          }, // select:false 때문에 현재 UserEntity에 password 칼럼 데이터는 없음.
        );
        currentUser.password = currentPassword; // checkPassword 메서드의 비교 대상 설정. (hash된 현재 비밀번호)
        const samePassword = await currentUser.checkPassword(password); // await 없으면 true/false가 아니라 Promise로 return됨. 즉 항상 참.
        if (samePassword) {
          return { ok: false, error: 'You are already using that password.' };
        }
        currentUser.password = password; // 새로운 비밀번호를 현재 UserEntity에 재설정.
      }
      await this.usersRepo.save(currentUser); // @BeforeUpdate 호출. DB에 저장되기 직전에 비번 hashing 진행.
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Failed to Edit the Profile' };
    }
  }
}
