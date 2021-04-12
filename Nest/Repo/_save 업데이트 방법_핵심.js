/*
방법1) Entity 자체를 수정하여 그대로 인자로 사용. 
  const currentUser = await this.usersRepo.findOne(userId); 
  currentUser.email = email;
  currentUser.password = password;
  await this.usersRepo.save(currentUser);

방법2) 배열 형식. 수정할 Entity를 id로 지정 => 수정할 데이터만 구체적으로 대입. 
  Repo.save([{ id: 1, name: "asd", nonExistingField: "asd"}]) 
  - 중요: id 필수. id를 지정하지 않을 경우, 새로 생성한다는 의미가 됨.
  - 인자로 Entity들의 배열을 받음. 
  - 각 Entity들은 중괄호 단위. id 필드로 업데이트할 대상 찾고, 수정할 데이터 지정. 
  - Entity, 즉 중괄호 내부에서 인자들의 순서는 의미 없음. 
    - 자동으로 id 필드에 해당하는 데이터 찾아서 업데이트. 
    - Entity상 존재하지 않는 { nonExistingField: "asd" }는 자동으로 무시됨. 에러X.
    - 입력되지 않은 필드들은 기존 값 그대로 유지. 수정되지 않음.
*/
@Injectable()
export class RestaurantService {
  // ~~
  async editRestaurant(
    owner: UserEntity,
    editRestaurantInput: EditRestaurantInputDto
  ): Promise<EditRestaurantOutputDto> {
    const restaurant = await this.restaurantRepo.findOne(
      editRestaurantInput.restaurantId
    );
    // ~~
    await this.restaurantRepo.save([
      {
        id: editRestaurantInput.restaurantId, // 수정할 대상의 id
        ...editRestaurantInput, // 입력한 필드들의 수정 값들 { name: name, ~: ~ } 등 펼치기.
        ...(category && { category }), // category 존재시 { category: category } 펼치기.
      }, // categoryInput 필드는 존재X => 자동으로 무시됨 + 중괄호 내부에서 인자들의 순서는 의미 없음. 자동으로 id에 해당하는 데이터 찾아서 업데이트.
    ]); // Repo.save: 인자로 저장/수정할 Entity들의 배열 입력.
    const A = await this.restaurantRepo.findOne(
      editRestaurantInput.restaurantId
    );
    console.log(A);
    return { ok: true };
  }
}
