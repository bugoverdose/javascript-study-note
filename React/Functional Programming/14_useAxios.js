/*
  axios로 api fetch 및 refetch 기능
  - 인자1. options
  - 인자2. 별도로 configure된 axios instance를 보내주지 않으면 디폴트로 axios 패키지를 대입.
*/
import defaultAxios from "axios";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

const useAxios = (options, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });
  const [trigger, setTrigger] = useState(0);
  if (!options.url) {
    return; // 옵션으로 api url이 없으면 종료.
  }
  const refetch = () => {
    setState({
      ...state, // loading 이외의 값들은 그대로 유지
      loading: true,
    });
    setTrigger(Date.now());
  };
  useEffect(() => {
    axiosInstance(options)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]); // refetch 실행시, trigger가 변화 => useEffect 재실행.
  return { ...state, refetch };
};

const App = () => {
  const { loading, data, error, refetch } = useAxios({
    url: "https://yts.mx/api/v2/list_movies.json",
  });
  // JSON.stringify(data)
  console.log(`loading: ${loading}\ndata: ${data}\nerror: ${error}`);
  return (
    <div className="App">
      <h1>{data && data.status}</h1>
      <h2>{loading && "Loading"}</h2>
      <button onClick={refetch}>Refetch API</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
