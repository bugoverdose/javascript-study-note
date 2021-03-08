/*
  Media Queries
  1) 우선 모바일 기준으로 전부 작성. 
  2) sm: / lg: / xl: 등 각 스크린사이즈 설정에 따라 세부 크기 설정 별도 지정.

  mt-10 lg:mt-28
  - 디폴트 값은 10 적용.              작은 화면은 margin 조금만 적용. 스마트폰.
  - 스크린사이즈가 lg일 때는 28 적용. 큰 화면은 margin 더 많이 적용. 데스크톱.

  w-full max-w-screen-lg mx-auto
  - 기본적으로 width: 100%
  - 스크린사이즈가 lg를 넘어가면 좌우로 margin 적용되면서 공백 생김..

  =========================================================================

  넓이, 두께, 길이 등은 padding을 최우선으로 설정.
  - padding은 전부 rem 기준. 즉 자동으로 body 태그를 기준으로 반응형 디자인 제공.

  1rem : root em. font size of the <body> element.    // F12 > Elements > Computed > font-size 검색.
  <=> 1em: 해당 태그의 폰트 사이즈. font size of the given element.
*/
import React from "react";

export const Header = () => (
  <header className="bg-red-500 py-4">
    <div className="w-full max-w-screen-lg mx-auto bg-blue-300">Header</div>
  </header>
);
