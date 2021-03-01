/*
  array.forEach(함수A);
   array 배열의 각 요소를 index=0부터 차례로 하나씩 꺼내어 그 값을 
   콜백함수 A의 첫번째 인자로 삼아 콜백함수 A를 실행시키는 함수.   
  - (비교) map 메서드

  forEach 메서드
   - array.forEach 메서드는 콜백함수의 this를 별도로 지정 가능.
   - 별도의 인자로 this를 넘기지 않았으면 콜백함수의 this는 전역함수. 

  주의: forEach 내부에서는 return 불가. 함수 실행 종료되지 않음.
*/

[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this, x);
});
// Window { ... } 1
// Window { ... } 2
// Window { ... } 3
// Window { ... } 4
// Window { ... } 5

// ===============================================================
items.forEach(async (item) => {
  const dish = await this.dishesRepo.findOne(item.dishId);
  if (!dish) {
    return { ok: false, error: "Could not find the dish to order." };
  } // 주문하려고 선택한 요리가 DB에 존재하지 않는 경우.
  await this.orderItemRepo.save(
    this.orderItemRepo.create({
      dish,
      options: item.options,
    }) // 주문이 들어온 각 요리(+옵션)에 대한 데이터를 DB에 저장.
  );
});
