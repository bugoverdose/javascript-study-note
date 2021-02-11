/*
  import/export
  - 자바스크립트 자체 모듈 시스템 문법 [ES6]
  - Node.js의 모듈 시스템과는 다름

  특정 파일의 코드 가져오기.
  (1) export default routes       => import routes from "./routes";
  (2) export const localVariables => import { localVariables } from "./middleware";
  
  node_modules의 패키지 가져오기.
  (1) [npm i express]       => import express from "express";
  (2) [npm i expo-location] => import * as Location from "expo-location";
      [npm i joi]           => import * as Joi from 'joi'; // 그 자체로 export되지 않음.
*/
// (1) export default home => import home from "./movieController";
// (2) export const home => import { home } from "./movieController";

import express from "express";
import routes from "./routes";

// [routes.js]
const routes = {
  home: "/",
  login: "/login",
};

export default routes;

// ==================================================
import { localVariables } from "./middleware";

// [middleware.js]
export const localVariables = (req, res, next) => {
  res.locals.siteName = "WeTube Challenge";
  next();
};

// ==================================================
import React from "react";
import { Alert, Text } from "react-native";
import * as Location from "expo-location";
import Loading from "./Loading";

// ---------------------------------------
import { odd, even } from "./var";
// ./var : 사용할 모듈이 위치한 파일 디렉토리
// var 모듈의 객체를 가져와서 odd와 even이라는 함수를 odd, even이라는 변수에 저장.

function checkOddOrEven(num) {
  // 모듈로 사용할 함수 내용
}

export default checkOddOrEven;
// checkOddOrEven 함수를 다른 파일에서도 사용할 수 있도록 모듈 생성.
// export default ~가 최하단에 존재하는 파일은 import 가능한 모듈이 됨.

// ---------------------------------------------
/*
Node.js에서 ES6 모듈 시스템 사용하는 방법
1) 파일의 확장자를 .mjs로 지정.
2) package.json에 type: "module" 속성 지정 + js 확장자 그대로 사용 
*/
