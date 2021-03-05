/*
  코드 중복 최소화 방법 2가지
  1) encapsulation를 통해 새로운 클래스 자체 제작.
     - [tailwind.css] @apply로 복수의 tailwind 클래스로 구성된 클래스 생성.
     - tailwind:build 작업 필요하므로 npm run start 재실행
  2) 별도의 react component를 만들어서 재활용. (styled-components)
*/
// [tailwind.css]
@tailwind base;
@tailwind components;

.input {
  @apply bg-gray-100 focus:ring-2 focus:ring-opacity-50 focus:ring-gray-700 focus:outline-none shadow-md py-3 px-5 rounded-lg;
}

.btn {
  @apply bg-gray-800 hover:opacity-90 focus:outline-none text-white text-xl rounded-lg;
}

@tailwind utilities;

// ============================================================
// input & btn 활용 가능해짐.
import React from "react";

export const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 px-5">
      <div className="bg-white w-full max-w-lg pt-6 pb-8 rounded-lg text-center">
        <h3 className="font-semibold text-3xl text-gray-800">Log In</h3>
        <form className="flex flex-col mt-5 px-5">
          <input
            className="input mb-3"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button className="btn py-3 px-5 mt-5">Log In</button>
        </form>
      </div>
    </div>
  );
};
// ============================================================