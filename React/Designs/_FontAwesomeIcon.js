/*
[React - fontawesome] (https://fontawesome.com/how-to-use/on-the-web/using-with/react)

npm i --save @fortawesome/fontawesome-svg-core      
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome

선택사항.
// npm install --save @fortawesome/free-brands-svg-icons // 깃헙 로고 등 추가 사용 목적.   
// npm install --save @fortawesome/free-regular-svg-icons
*/
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Header: React.FC = () => {
  return (
    <span>
      <FontAwesomeIcon icon={faUser} className="text-xl" />
    </span>
  );
};
// camelCase로 클래스명 대입.
