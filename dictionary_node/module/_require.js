/*
require 함수. 
- 함수도 객체이므로 require 함수는 객체로서의 attribute을 지님.

<require.cache 객체>
: require 함수로 불러온 파일의 정보가 저장되는 곳.
  => 다시 require할 때 새로 불러오지 않고 require.cache 객체의 정보가 재사용됨.
: property명은 각 파일의 경로(현재 코드가 실행된 파일 + require함수로 가져온 모듈 파일들)
  - 각 파일의 module 객체를 속성값으로 지님. 
cf) require.cache 속성을 제거하면 새로 require 가능. 하지만 권장되지 않음.

<require.cache 객체의 모듈별 속성들>
- exports: module.exports했던 부분
- loaded: 로딩 여부
- parent: 부모 모듈 관계
- children: 자식 모듈 관계

<require.main 객체>
: Node.js 실행시 첫 모듈 (require.cache에 담기는 첫번째 module 속성값)
- console.log(require.main === module); // true라면 현재 파일이 첫 모듈
- console.log(require.main.filename); // 첫 모듈의 이름 확인
*/
console.log("require가 최상단에 위치해야만 하는 것은 아니다.");

module.exports = "module.exports에 할당된 값은 여기에 위치";

require("./var");

// -------------------------

console.log("<require.cache>");
console.log(require.cache);
/*
[Object: null prototype] {
  '/home/bugod/javascript-study-note/dictionary_node/module/_require.js':
   Module {
     id: '.',
     exports: 'module.exports에 할당된 값은 여기에 위치',
     parent: null,
     filename:
      '/home/bugod/javascript-study-note/dictionary_node/module/_require.js',
     loaded: false,
     children: [ [Module] ],
     paths:
      [ '/home/bugod/javascript-study-note/dictionary_node/module/node_modules',
        '/home/bugod/javascript-study-note/dictionary_node/node_modules',
        '/home/bugod/javascript-study-note/node_modules',
        '/home/bugod/node_modules',
        '/home/node_modules',
        '/node_modules' ] },
  '/home/bugod/javascript-study-note/dictionary_node/module/var.js':
   Module {
     id:
      '/home/bugod/javascript-study-note/dictionary_node/module/var.js',
     exports: { odd: '홀수입니다', even: '짝수입니다' },
     parent:
      Module {
        id: '.',
        exports: 'module.exports에 할당된 값은 여기에 위치',
        parent: null,
        filename:
         '/home/bugod/javascript-study-note/dictionary_node/module/_require.js',
        loaded: false,
        children: [Array],
        paths: [Array] },
     filename:
      '/home/bugod/javascript-study-note/dictionary_node/module/var.js',
     loaded: true,
     children: [],
     paths:
      [ '/home/bugod/javascript-study-note/dictionary_node/module/node_modules',
        '/home/bugod/javascript-study-note/dictionary_node/node_modules',
        '/home/bugod/javascript-study-note/node_modules',
        '/home/bugod/node_modules',
        '/home/node_modules',
        '/node_modules' ] } }
*/
// -------------------------

console.log("<require.main>");
console.log(require.main === module); // true
// node _require.js 실행했기 때문에 true
// node var.js 실행했다면 false

console.log(require.main.filename);
// /home/bugod/javascript-study-note/dictionary_node/module/_require.js
// 첫 모듈의 이름
