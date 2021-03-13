/*
  <Route path="/category/:slug">
  - /category/american 
  - /category/~~~~~~~  : 어떤 값이든 변수에 해당하는 내용 존재시 해당 라우트 연결됨. 
   
  - /category  : 404
  - /category/ : 404
 
  ================================================================

  useParams : Route의 변수 부분에 입력된 값 접근 방법.
            : useParams에 제네릭 설정해줘야 params.slug에 직접 접근 가능. (TS) 

  const params = useParams(); 
  console.log(params);   // {slug: "chinese"}

  const location = useLocation();   
  console.log(location.pathname.split("/category/")[1]); // chinese
*/
<Link to={`/category/${category.slug}`} key={category.id}>
  <div>${category.name}</div>
</Link>;

// ==============================================================
const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={5} path="/category/:slug">
    <CategoryPage />
  </Route>,
];

export const LoggedInRouter = () => {
  // ~~
  return (
    <Router>
      <Header />
      <Switch>
        {data.loggedInUser.role === "Client" && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

// ==============================================================
// http://localhost:3000/category/chinese 접속한 경우.
import { useLocation, useParams } from "react-router";

interface ICategoryParams {
  slug: string; // params.slug에 직접 접근하기 위해 필요.
}

export const CategoryPage = () => {
  const location = useLocation();
  console.log(location.pathname.split("/category/")[1]); // chinese

  const params = useParams<ICategoryParams>();
  console.log(params); // {slug: "chinese"}

  return <h1>Category</h1>;
};
// ==============================================================
