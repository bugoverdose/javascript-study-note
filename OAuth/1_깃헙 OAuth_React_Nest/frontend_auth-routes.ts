const github_client_id = "c1e5dca14ce2eec5f4db";

export const authRoute = {
  githubLogin: `https://github.com/login/oauth/authorize?client_id=${github_client_id}&scope=read:user`, // callback UrL에 code값 받아오기.
  githubToken: "/auth/github/callback", // 콜백URL. code값으로 토큰 얻어오는 POST 요청 중. http://localhost:3000/auth/github/callback?code=~~~~
};
