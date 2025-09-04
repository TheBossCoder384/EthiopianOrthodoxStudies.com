/* ---------------- Short Questions ---------------- */
let shortQuestions = [
  { id: "wudase-mon", prompt: "ውዳሴ ማርያም (ሰኞ)", answer: "እንደ ወደ ሰማይ ማርያም" },
  { id: "wudase-tue", prompt: "ውዳሴ ማርያም (ማክሰኞ)", answer: "ማኅደረ ጸሎት ማርያም" },
  { id: "wudase-wed", prompt: "ውዳሴ ማርያም (ረቡዕ)", answer: "አርዓሰ ሰማይ ማርያም" },
  { id: "wudase-thu", prompt: "ውዳሴ ማርያም (ሐሙስ)", answer: "እመ ንጉሥ ማርያም" },
  { id: "wudase-fri", prompt: "ውዳሴ ማርያም (ዓርብ)", answer: "አንቲ ቤተ መንግሥት ማርያም" },
  { id: "wudase-sat", prompt: "ውዳሴ ማርያም (ቅዳሜ)", answer: "ሙሴ በተክል አንቺን አመሰገነ" },
  { id: "wudase-sun", prompt: "ውዳሴ ማርያም (እሑድ)", answer: "ቅድስት እመ አምላክ ማርያም" },
  { id: "kidase-serat", prompt: "ሰርአት ቅዳሴ", answer: "ሰላም ለኪ እመቤታችን" },
  { id: "kidase-egzi", prompt: "ቅዳሴ እግዚእ", answer: "ቅዱስ ቅዱስ ቅዱስ" },
  { id: "kidase-full", prompt: "ሙሉ ቅዳሴ", answer: "አሜን አሜን አሜን" }
];

/* ---------------- Full Questions (placeholders, editable later) ---------------- */
let fullQuestions = [
  { id: "wudase-mon-full", prompt: "ውዳሴ ማርያም (ሰኞ ሙሉ)", answer: "እንደ ወደ ሰማይ ማርያም ..." }
  // add more as needed
];

let currentQuestions = [];
let answered = 0;

function loadQuestions(questions) {
  currentQuestions = questions;
  answered = 0;
  updateProgress();
  displayQuestions();
}

function displayQuestions() {
  let quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";
  currentQuestions.forEach(q => {
    let div = document.createElement("div");
    div.innerHTML = `
      <h3>${q.prompt}</h3>
      <input type="text" id="${q.id}" placeholder="መልስ ጻፍ">
      <button onclick="checkAnswer('${q.id}')">Check</button>
      <button onclick="editAnswer('${q.id}')">✏️ Edit</button>
      <p id="result-${q.id}"></p>
    `;
    quizDiv.appendChild(div);
  });
}

function checkAnswer(id) {
  let q = currentQuestions.find(q => q.id === id);
  let userInput = document.getElementById(id).value.trim();
  let result = document.getElementById(`result-${id}`);
  if (userInput === q.answer) {
    result.textContent = "✅ Correct!";
    answered++;
  } else {
    result.textContent = "❌ Try again or edit";
  }
  updateProgress();
}

function editAnswer(id) {
  let q = currentQuestions.find(q => q.id === id);
  let newAnswer = prompt("Edit the correct answer:", q.answer);
  if (newAnswer) {
    q.answer = newAnswer;
    alert("Answer updated!");
  }
}

function updateProgress() {
  let progress = (answered / currentQuestions.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

/* ---------------- Test Mode ---------------- */
let timer, timeLimit = 60, currentIndex = 0, correctAnswers = 0, testQuestions = [];

function startTestMode() {
  document.getElementById("timer-settings").style.display = "block";
  let selected = document.getElementById("time-select").value;
  timeLimit = parseInt(selected);

  testQuestions = [...shortQuestions].sort(() => Math.random() - 0.5);
  currentIndex = 0;
  correctAnswers = 0;
  showNextQuestion();
}

function showNextQuestion() {
  if (currentIndex >= testQuestions.length) {
    endTest();
    return;
  }
  let q = testQuestions[currentIndex];
  document.getElementById("quiz").innerHTML = `
    <h3>${q.prompt}</h3>
    <input type="text" id="answer-input" placeholder="መልስ ጻፍ">
    <button onclick="submitTestAnswer('${q.id}')">Submit</button>
    <p id="timer">⏱ ${timeLimit}</p>
  `;
  startTimer();
}

function startTimer() {
  let timeLeft = timeLimit;
  clearInterval(timer);
  timer = setInterval(() => {
    document.getElementById("timer").textContent = `⏱ ${timeLeft}`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      currentIndex++;
      showNextQuestion();
    }
  }, 1000);
}

function submitTestAnswer(id) {
  let q = testQuestions[currentIndex];
  let userInput = document.getElementById("answer-input").value.trim();
  clearInterval(timer);
  if (userInput === q.answer) correctAnswers++;
  currentIndex++;
  showNextQuestion();
}

function endTest() {
  document.getElementById("quiz").innerHTML = `
    <h2>✅ Test Completed</h2>
    <p>You got ${correctAnswers} / ${testQuestions.length} correct.</p>
    <div class="progress">
      <div class="progress-bar" style="width:${(correctAnswers/testQuestions.length)*100}%"></div>
    </div>
  `;
}