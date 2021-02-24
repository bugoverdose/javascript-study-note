/*
  스키마에 동일명의 InputType과 ObjectType이 생성되면 에러 발생.
  해결방법: @InputType('UserInputType', { isAbstract: true }) 
  
  엔티티들 사이에 1대다 관계 등 설정시, @InputType에 별도의 타입명 부여 필요.
  - DB를 위한 Entity(@ObjectType)와 @InputType을 위한 Entity는 서로 별개. => 타입명 중복되면 안됨.
  - 에러: Schema must contain uniquely named types but contains multiple types named "UserEntity"

  - TypeORM : @ObjectType. CoreEntity를 상속받아 'UserEntity' 생성
  - GraphQL : @InputType. 'UserInputType'이라는 명칭으로 별개의 타입 생성.
*/
@InputType('RestaurantInputType', { isAbstract: true })  
@ObjectType() 
@Entity() 
export class RestaurantEntity extends CoreEntity {~~~}
 
@InputType('CategoryInputType', { isAbstract: true })  
@ObjectType()  
@Entity() 
export class CategoryEntity extends CoreEntity {~~~}

@InputType('UserInputType', { isAbstract: true }) 
@ObjectType() 
@Entity()
export class UserEntity extends CoreEntity {~~~}

// ==> UserEntity는 ObjectType으로 생성됨 + RestaurantEntity와 연결됨
// ==> UserInputType는 InputType으로 생성됨 + RestaurantInputType와 연결됨. 

// ================================================================
// http://localhost:3000/graphql > SCHEMA
// TypeORM에서 DB에서 정보를 가져오는 ObjectType
type UserEntity {
  id: Float!
  createdAt: DateTime!
  updatedAt: DateTime! // CoreEntity에서 상속받은 필드들 (마찬가지로 ObjectType)
  email: String!
  password: String!
  role: UserRole!
  emailVerified: Boolean!
  restaurants: [RestaurantEntity!]!
}

// GraphQL에서 사용되는 InputType
input UserInputType {
  email: String!
  password: String!
  role: UserRole!
  emailVerified: Boolean!
  restaurants: [RestaurantInputType!]!
}
// ================================================================