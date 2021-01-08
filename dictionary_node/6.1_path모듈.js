/*
path 모듈 : 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 Node.js 내장 모듈.
- 특히 운영체제별로 경로 구분자(\, /)가 다르기 때문에 필요.
- 그 외 편리한 property, method들 다양함.
- 핵심적인 모듈 중 하나. 매우 중요.

윈도우에서 POSIX 스타일 경로를 사용하는 경우,
path.posix.sep, path.posix.join()과 같이 사용

POSIX에서 윈도우 스타일 경로를 사용하는 경우,
path.win32.sep, path.win32.join()과 같이 사용

-----------------------------------------------------------------
path 모듈의 property, method들

oath.sep : 경로의 구분자. 출력값은 / or \
path.delimiter : 환경변수의 구분자. 출력값은 ; or :

--------------------------------------
path.dirname(경로) : 파일이 위치한 폴더 경로
: __dirname == path.dirname(__filename)

path.extname(경로) : 파일의 확장자(extention) (.js, .txt 등)

path.basename(경로) : 파일명 표시. (확장자 포함)
path.basename(경로, 확장자) : 확장자 제외한 파일명 표시 

--------------------------------------
path.parse(경로) : 파일경로를 root, dir, base, ext, name으로 분리
path.format(객체) : path.parse로 분리된 객체를 파일경로로 합침
path.normalize(경로) : /, \를 잘못 사용한 경우 정상적인 경로로 변환.

--------------------------------------
path.isAbsolute(경로) : 파일의 경로가 절대경로인지 상대경로인지를 판단
: true or false

path.relative(기준경로, 비교경로) 
: 첫번째 기준경로에서 두번째 비교경로로 가는 방법을 표현해줌.

--------------------------------------
path.join(경로, ..) : 여러 인수를 받아 하나의 경로로 합침. 상대경로.
path.resolve(경로, ..) : 하나의 경로로 합침. 절대 경로. 앞의 경로를 무시.
*/
const path = require("path");

console.log(path.sep); // '/'
console.log(path.delimiter); // ':'

// -----------------------------------
console.log(path.dirname(__filename));
console.log(__dirname);
// /home/bugod/javascript-study-note/dictionary_node (둘 다 동일 결과)

console.log(path.extname(__filename)); // .js

console.log(path.basename(__filename));
// 6_path모듈.js
console.log(path.basename(__filename, path.extname(__filename)));
// 6_path모듈

// -----------------------------------
console.log(path.parse(__filename));
/*
{
  root: '/',
  dir: '/home/bugod/javascript-study-note/dictionary_node',
  base: '6_path모듈.js',
  ext: '.js',
  name: '6_path모듈'
}
*/

console.log(
  path.format({
    dir: "/home/bugod/",
    name: "path",
    ext: ".js",
  })
);
// /home/bugod//path.js

console.log(
  path.normalize("////home/bugod/////javascript-study-note/////dictionary_node")
);
// /home/bugod/javascript-study-note/dictionary_node

// -----------------------------------
console.log(path.isAbsolute("C:\\")); // false
console.log(path.isAbsolute("/home")); // true

console.log(path.relative("//home/bugod//folder1//folder2//", "/home/Zero"));
// ../../../Zero

// -----------------------------------
console.log(path.join(__dirname, "..", "/users", ".", "/folder1"));
// /home/bugod/javascript-study-note/users/folder1
// 상대경로

console.log(path.resolve(__dirname, "..", "/users", ".", "/folder1"));
// /folder1
// 절대경로
