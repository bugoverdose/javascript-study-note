// 가독성 높은 버전
const data = await fetch(finalUrl, {
  method: "POST", // npm i node-fetch
  headers: { Accept: "application/json" },
});
const json = await data.json();

// 단축
const jsonData = await (
  await fetch(finalUrl, {
    method: "POST", // npm i node-fetch
    headers: { Accept: "application/json" },
  })
).json();
