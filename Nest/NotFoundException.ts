/*
  throw new NotFoundException("메시지")
  - Nest 자체 예외처리 기능.
  - 인자에는 에러 메시지.
*/
import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MoviesService {
  private movies: Movie[] = []; // movies는 Movie들의 배열. 초기값은 빈 배열.

  getOne(id: string): Movie {
    // string타입의 id를 인자로 받고, Movie 하나를 반환.
    const movie = this.movies.find((movie) => movie.id === +id); // +id는 parseInt(id)과 동일 효과. 문자열=>숫자.
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    } // Nest 자체 예외처리 기능.
    // { "statusCode": 404, "message": "Movie with ID 113 not found.", "error": "Not Found" }
    return movie;
  }
}
