/*
  react-router-dom의 useHistory
  - 세부적인 redirection 실행.

  * Redirect : used for overall route protection
  * useHistory : used for specific redirection

1) import { useHistory } from "react-router-dom";
2) const history = useHistory();
3) history.push("/");
*/
import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};

export default Profile;
