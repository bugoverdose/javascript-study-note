/*
  FileReader API
  - 사용자의 컴퓨터에 저장된 파일을 읽는 기능.
  - 사용자에게 업로드하려는 이미지 파일의 미리보기 버전 제공 등 가능.
  - https://developer.mozilla.org/en-US/docs/Web/API/FileReader
*/
import React from "react";

const Home = () => {
  const onFileChange = (event) => {
    const imageFile = event.target.files[0]; // input type="file"에 선택된 파일 정보.
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent.target.result); // 읽어진 url 주소 선택.
    };
    reader.readAsDataURL(imageFile); // 선택된 파일을 url 주소 형식으로 읽기.
  };
  return (
    <>
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Tweet" />
    </>
  );
};

export default Home;
