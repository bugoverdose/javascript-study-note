export enum questionText {
  question1 = "The SL mechanism is very easy to use",
  question2 = "It doesn't seem difficult to use SL",
  question3 = "The SL is useful because I can use one password for various Websites",
  question4 = "With SL I need to remember only one password",
  question5 = "Security vulnerabilities inhibits me to use SL",
  question6 = "I 'm afraid SL is open to security threats",
  question7 = "I prefer not to use SL because of security threats ",
  question8 = "I'll use SL if I'll be familiar with it",
}

const questionNum = 7;

const currentQuestion: string = `question${questionNum}`; // 문자열
console.log(questionText[currentQuestion as keyof typeof questionText]);

// questionText[`question${questionNum}` as keyof typeof questionText]

// 위와 동일
console.log(questionText.question7);
console.log(questionText["question7"]);
