import { getMovies, getById, addMovie, deleteMovie } from "./2_db";

// resolvers: 누군가가 특정 Query 혹은 Mutation을 요청하면 어떻게 반응할 것인가.
const resolvers = {
  Query: {
    movies: () => getMovies(), // getMovies 함수 실행
    movie: (_, { id }) => getById(id), // id 인자를 받아, getById 함수 실행.
  },
  Mutation: {
    addMovie: (_, { name, score }) => addMovie(name, score), // name, score 인자를 받아 addMovie 함수 실행.
    deleteMovie: (_, { id }) => deleteMovie(id), // id 인자를 받아 deleteMovie 함수 실행.
  },
};

export default resolvers;
