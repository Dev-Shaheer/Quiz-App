let timeleft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
  {
    id: "0",
    question: "HTML stands for _____ ?",
    options: [
      "HighText Machine Language",
      "HyperText and links Markup 		Language",
      "HyperText Markup Language",
      "None of these",
    ],
    correct: "HyperText Markup Language",
  },

  {
    id: "1",
    question:
      "Which of the following element is responsible for making the text bold in HTML?",
    options: ["pre", "a", "b", "br"],
    correct: "b",
  },

  {
    id: "2",
    question:
      "Which of the following tag is used for inserting the largest heading in HTML?",
    options: ["h3", "h1", "h5", "h6"],
    correct: "h1",
  },

  {
    id: "3",
    question:
      "Which of the following tag is used to insert a line-break in HTML?",
    options: ["br", "a", "pre", "b"],
    correct: "br",
  },

  {
    id: "4",
    question:
      "Which of the following attribute is used to provide a unique name to an element?",
    options: ["class", "id", "type", "None of the above"],
    correct: "id",
  },

  {
    id: "5",
    question:
      "The main computer that stores the files that can be sent to computers that are networked together is : ",
    options: ["Clip art", "Mother board", "Peripheral", "File server"],
    correct: "File server",
  },

  {
    id: "6",
    question: "How can you catch a computer virus?",
    options: [
      "Sending e-mail messages",
      "Using a laptop during the winter",
      "Opening e-mail attachments",
      "Shopping on-line",
    ],
    correct: "Opening e-mail attachments",
  },

  {
    id: "7",
    question: "Google (www.google.com) is a : ",
    options: [
      "Search Engine",
      "Number in Math",
      "Directory of images",
      "Chat service on the web",
    ],
    correct: "Search Engine",
  },

  {
    id: "8",
    question: "Which is not an Internet protocol?",
    options: ["HTTP", "FTP", "STP", "IP"],
    correct: "STP",
  },

  {
    id: "9",
    question: "Which of the following is not a valid domain name?",
    options: [
      "www.yahoo.com",
      "www.yahoo.co.uk",
      "www.com.yahoo",
      "www.yahoo.co.in",
    ],
    correct: "www.com.yahoo",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;
    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.innerHTML =
        " Your Score is " + scoreCount + " Out of " + questionCount;
    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + "Question";
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeleft.innerHTML = `${count}s`;

    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  quizCards[questionCount].classList.remove("hide");
};

function quizCreater() {
  quizArray.sort(() => Math.random() - 0.5);
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + "Question";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);

    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;

    quizContainer.appendChild(div);
  }
}

function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");

    options.forEach((element) => {
      if (element.innerText === quizArray[questionCount].correct) {
      }
    });
  }
  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreater();
  quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
