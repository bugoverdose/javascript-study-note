const email = getByPlaceholderText("Email");
// 1) placeholder="Email"인 태그의 존재 여부 확인
// 2) email에 해당 html element 선택하여 대입.

const email = getByPlaceholderText(/email/i);
// case-insensitive. reg exp. 대소문자 무관.
// placeholder="Email", placeholder="eMaiL" 등 전부 인정.
