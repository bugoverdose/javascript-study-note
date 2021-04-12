/*
  다대다 관계면서 양쪽 모두에서 접근하고 싶은 경우 (== 양쪽 모두에 관계ID 설정하고 싶은 경우)
  - 양쪽 모두에 @ManyToMany 설정 + 관계ID를 담을 칼럼 선택.
  - 중요: JoinTable만 한쪽에 설정
  
  https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations#bi-directional-relations
*/
export class User extends CoreEntity {
  @Field((type) => [Podcast]) // GraphQL
  @ManyToMany((type) => Podcast, (podcast) => podcast.subscribers) // TypeOrm - 양방향에서 접근하려면 양쪽에 설정 + 담길 컬럼 지정.
  @JoinTable() // TypeOrm - 무조건 한쪽에만 설정.
  subscriptions: Podcast[];
}

// ===================================================================
export class Podcast extends CoreEntity {
  @Field((type) => [User]) // GraphQL
  @ManyToMany((type) => User, (listener) => listener.subscriptions) // TypeOrm - 양방향에서 접근하려면 양쪽에 설정 + 담길 컬럼 지정.
  subscribers: User[];
}

// ===================================================================
