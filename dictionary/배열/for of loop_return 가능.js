/*
  비교: forEach 내부에서는 return 불가. 함수 실행 종료되지 않음.
  cf) for loop보다 더 sexy한 것 같음
*/
for (const item of items) {
  const dish = await this.dishesRepo.findOne(item.dishId);
  if (!dish) {
    return { ok: false, error: "Dish Not Found." };
  } // 주문하려고 선택한 요리가 DB에 존재하지 않는 경우.
  await this.orderItemRepo.save(
    this.orderItemRepo.create({
      dish,
      options: item.options,
    }) // 주문이 들어온 각 요리(+옵션)에 대한 데이터를 DB에 저장.
  );
}
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
