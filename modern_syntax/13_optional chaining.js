/*
  ?. 연산자는 .와 기본적으로 동일 기능. 
  - 다만, React가 너무 빨리 동작해서 잠시 element가 undefined가 될 때 에러 예방 가능.

  {<div>{data?.movie?.title}</div>}
  === {!loading && data && data.movie && <div>{data.movie.title}</div>}

  {data?.suggestions?.map((s) => (<div>s</div>))}
  === {data && data.suggestions && data.suggestions.map((s) => <div>s</div>)}
*/
import ReactDOM from "react-dom";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      rating
      description_intro
      language
      medium_cover_image
    }
    suggestions(id: $id) {
      title
      medium_cover_image
      rating
    }
  }
`;

const App = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, { variables: { id: +id } });
  return (
    <>
      <div img={data && data.movie ? data.movie.medium_cover_image : ""}></div>
      <div img={data?.movie?.medium_cover_image}></div>

      {data?.suggestions?.map((s) => (
        <div>s</div>
      ))}
      {data && data.suggestions && data.suggestions.map((s) => <div>s</div>)}

      {!loading && data && data.movie && <div>{data.movie.title}</div>}
      {<div>{data?.movie?.title}</div>}
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
