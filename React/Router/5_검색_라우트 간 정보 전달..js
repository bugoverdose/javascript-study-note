/*
[라우트 간 정보 전달 방법들] 
방법1) state 옵션 : 검색창에 입력했을 때만 해당 결과 나오도록. url에 정보X.
  history.push({
    pathname: "/abc"
    state: { "zxcv" }
  })   
  => '/abc'로 이동.    // history.push만을 통해 검색 내용 변경 가능.
  => {pathname: "/abc", state: {searchTerm: "asd"}, search: "", hash: "", key: "dhv0d9"}
     중요: state 값은 브라우저의 메모리에 저장됨. 새로고침해도 유지.

방법2) search 옵션 사용시 url에 모든 정보들 그대로 담기게 됨.
  history.push({
    pathname: "/abc"
    search: "zxcv"
  })   
  => '/abc/zxcv'로 이동.    // 해당 라우트 값 수정으로 직접 검색내용 변경 가능.
  => {pathname: "/abc", search: "zxcv", hash: "", key: "howvvk"}
*/ 
interface ISearchFormProps {
  searchTerm: string; // 필수는 아님. useForm의 제네릭으로 대입한 경우,
} // => input의 name 속성 값과 일치해야 함. name="searchTerm"

export const Restaurants = () => {
  const { register, handleSubmit, getValues } = useForm<ISearchFormProps>();
  const history = useHistory();

  const onSearchSubmit1 = () => {
    const { searchTerm } = getValues(); // input에 입력된 값.
    history.push({
      pathname: "/search",
      state: {
        searchTerm,
      }, // state 옵션 : /search로 이동. url에 정보 담기지 않게 됨.
    }); // url 값 수정으로 직접 검색 내용 수정 불가.
  };

  const onSearchSubmit2 = () => {
    const { searchTerm } = getValues(); // input에 입력된 값.
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    }); // chicken 검색시, '/search?term=chicken'로 이동.
  };
  return (
    <div>
      <Helmet>
        <title>Home | Uber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit1)}
        className="bg-gray-800 w-full flex items-center justify-center py-40"
      >
        <input
          ref={register({ required: true, min: 2 })}
          name="searchTerm"
          type="search"
          className="capsule-input w-1/2 md:w-4/12 xl:w-3/12 border-0 rounded-md"
          placeholder="Search restaurants..."
        />
      </form>
    </div>
  );
};

// /search 라우트의 결과.
import React, { useEffect } from "react";
import { useLocation } from "react-router";

export const Search = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }); 
  return <h1>Search</h1>;
};
// {pathname: "/search", search: "?term=asd", hash: "", key: "howvvk"}