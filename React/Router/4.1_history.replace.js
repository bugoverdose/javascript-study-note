/*
  history.push("/") : 뒤로가기하면 최초의 라우트로 다시 접근하게 됨. history API에 그대로 존재.
  history.replace("/") : 뒤로가기하면 대체된 라우트로 접근하게 됨. history API에 다른 라우트 저장.
  : 접근했던 라우트에 뒤로가기로 재접근 불가. history API에 redirect된 라우트만 저장.
*/
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const searchTerm = location.search.split("?term=")[1];
    if (!searchTerm) {
      return history.replace("/"); // 뒤로가기하면 대체된 라우트로 접근하게 됨. history API에 대체된 라우트 저장.
    }
  }, []);
  return (
    <div>
      <Helmet>
        <title>Search | Uber Eats</title>
      </Helmet>
      <h1>Search</h1>
    </div>
  );
};
