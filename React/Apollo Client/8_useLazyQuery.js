/*
  useQuery : 즉시 query 요청. 혹은 캐쉬에서 데이터 찾기.

  Lazy Query : 즉시 실행되지 않음. 따로 query 요청 필요.
  : 조건에 따라 query 요청하기 위해 활용 가능. 에러 예방 효과.
  ex) 검색어 없이 /search 라우트에 접근한 경우 query 요청하지 않도록 등

  const [initQuery, {loading, error, data, called }] = useLazyQuery<~,~>(gql문)
  - initQuery({variables:{ ~ }}) 형식으로 query 실행.
  - useMutation과 유사한 사용방식. Query Tuple을 반환. 제네릭으로 output, input 대입.
  - called : 해당 lazy query의 실행 여부. boolean.
*/
const [initSearchQuery, { loading, error, data, called }] = useLazyQuery<
  SearchRestaurant,
  SearchRestaurantVariables
>(SEARCH_RESTAURANT);

initSearchQuery({
  variables: {
    input: {
      page: 1,
      query: searchTerm,
    },
  },
}); // 해당 query 실행.

// ===================================================================
const SEARCH_RESTAURANT = gql`
  query SearchRestaurant($input: SearchRestaurantInputDto!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      searchResult {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [initSearchQuery, { loading, error, data, called }] = useLazyQuery<
    SearchRestaurant,
    SearchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const searchTerm = location.search.split("?term=")[1];
    if (!searchTerm) {
      return history.replace("/"); // 접근했던 라우트에 뒤로가기로 재접근 불가. history API에 redirect된 라우트만 저장.
    }
    initSearchQuery({
      variables: {
        input: {
          page: 1,
          query: searchTerm,
        }, // searchTerm가 존재하는 경우, 해당 query 실행.
      },
    });
  }, [location.search, history, initSearchQuery]);
  console.log(loading, error, data, called);
  return (
    <div>
      <Helmet>
        <title>Search | Uber Eats</title>
      </Helmet>
      <h1>Search</h1>
    </div>
  );
};

// ===================================================================