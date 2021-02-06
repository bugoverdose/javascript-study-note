// 기본 형식. 예제.
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    // service로 MovieService에 접근 가능하도록
    service.createMovie({
      title: "Test Movie",
      year: 2000,
      genres: ["test"],
    }); // 각 테스트 실행시 매번 처음에 id=1인 영화 데이터 하나 생성.
  });
  // beforeEach, afterEach, beforeAll, afterAll 등의 hook으로 DB 자동 작업 가능.
  // ex) afterAll로 DB 깔끔하게 정리 등.

  it("should be defined", () => {
    expect(service).toBeDefined(); // MovieService의 존재여부 확인.
  });

  describe("getAll()", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); // getAll 함수가 배열 타입을 반환하는지 확인.
    });
  });

  describe("createMovie()", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: "Test Movie",
        year: 2000,
        genres: ["test"],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
      console.log(beforeCreate, "=>", afterCreate);
    });
  });

  describe("getOne()", () => {
    it("should return a movie with the given id", () => {
      const movie = service.getOne(1); // id = 1인 영화를 찾도록 getOne 함수 실행.
      expect(movie).toBeDefined(); // getOne(1) 함수가 데이터를 찾을 수 있는지 확인.
      expect(movie.id).toEqual(1); // getOne(1)이 제대로 id = 1인 데이터를 찾는지 확인.
      expect(movie.title).toEqual("Test Movie");
    });

    it("should throw NotFoundException", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.");
      }
      // expect(() => {
      //   service.getOne(999); // id=999인 영화를 찾도록 실행시 NotFoundException이 제대로 뜨는지 확인.
      // }).toThrow(NotFoundException);
    });
  });

  describe("updateMovie()", () => {
    it("should update a movie", () => {
      service.updateMovie(1, { title: "Updated Test" });
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Test");
      expect(movie.year).toEqual(2000);
      expect(movie.genres).toEqual(["test"]);
    });

    it("should throw NotFoundException", () => {
      try {
        service.updateMovie(999, { title: "Updated Test" });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.");
      }
    });
  });

  describe("deleteMovie()", () => {
    it("should delete a movie", () => {
      // console.log(service.getAll())
      const beforeDelete = service.getAll().length;
      service.deleteMovie(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it("should throw NotFoundException", () => {
      try {
        service.deleteMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.");
      }
    });
  });
});
