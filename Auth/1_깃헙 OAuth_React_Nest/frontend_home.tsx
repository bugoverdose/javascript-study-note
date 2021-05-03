import { Helmet } from "react-helmet-async";
import { authRoute } from "../routes/auth-routes";

export const Home = () => {
  return (
    <main className="w-full h-screen pt-40 pb-28 bg-gray-800 text-white">
      <Helmet>
        <title>Home | Podcast</title>
      </Helmet>
      <a href={authRoute.githubLogin}>Github</a>
    </main>
  );
};
