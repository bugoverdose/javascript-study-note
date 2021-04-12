/*
  GraphQL Query 등에서 input으로 enum member 타입의 변수를 사용하는 경우
  
  방법1) 백엔드에서 enum type을 로직 내에서 활용하되 input & output에는 string, number 등만 사용하기.
  방법2) keyof typeof ENUM으로 타입 지정하여 프론트에서 그대로 사용.
  
  - https://joshua1988.github.io/ts/guide/enums.html#%EC%BB%B4%ED%8C%8C%EC%9D%BC-%EC%8B%9C%EC%A0%90%EC%97%90%EC%84%9C%EC%9D%98-%EC%9D%B4%EB%84%98-%ED%8A%B9%EC%A7%95
*/
const onSubmit = (anyTypeVar: keyof typeof PodcastCategory) => {
  return PodcastCategory[anyTypeVar];
};

// =====================================================================
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

type LogLevelStrings = keyof typeof LogLevel; // 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is: ", key);
    console.log("Log level value is: ", num);
    console.log("Log level message is: ", message);
  }
}
printImportant("ERROR", "This is a message");

// =====================================================================
