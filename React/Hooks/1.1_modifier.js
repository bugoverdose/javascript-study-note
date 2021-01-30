/*
  state를 변경시키는 modifier에 함수 전달 가능.
  + 함수의 인자에는 현재 state 값 접근 가능. (prev)

  const [tweetList, setTweetList] = useState([]);
  dbTweets.forEach((document) => {
    setTweetList((prev) => [document.data(), ...prev]);
  });
*/
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweetList, setTweetList] = useState([]);
  const getTweetList = async () => {
    const dbTweets = await dbService.collection("tweets").get();
    dbTweets.forEach((document) => {
      const tweetObject = {
        ...document.data(),
        id: document.id,
      };
      setTweetList((prev) => [tweetObject, ...prev]); // 현재 tweetList 배열에 각 객체 데이터 하나씩 추가.
      // setTweetList((prev) => [document.data(), ...prev])에서 각 데이터에 id 추가 작업.
    });
  };
  useEffect(() => {
    getTweetList();
  }, []);
  const onChange = (event) => {
    setTweet(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({ tweet, createdAt: Date.now() });
    setTweet("");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={100}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweetList.map((tweet) => (
          <div key={tweet.id}>
            <h3>{tweet.tweet}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
