const typingText = document.querySelector(".typing-test p");
const input = document.querySelector(".input-field");

const time = document.querySelector(".time span");
const mistake = document.querySelector(".mistake span");
const wpn = document.querySelector(".wpn span");
const cpn = document.querySelector(".cpn span");
const btn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function loadParagraph() {
  const paragraphs = [
   "The quick brown fox jumps over the lazy dog near the river bank just before dusk.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Typing speed can be improved with daily practice and focus on accuracy before speed.",
  "In the middle of every difficulty lies opportunity. Keep typing and stay consistent.",
  "A journey of a thousand miles begins with a single step. So does learning to type fast.",
  "Learning to touch type is not only useful, it's also a valuable modern-day skill.",
  "Consistency is the key to mastery in any skill — including fast and accurate typing.",
  "Artificial intelligence is shaping the future, and typing remains a core digital skill.",
  "Reading regularly enhances vocabulary and also indirectly helps with typing fluency.",
  "Practice does not make perfect. Only perfect practice makes perfect.",
  "Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.",
  "Digital literacy is no longer optional — it is essential in today’s modern world.",
  "Each morning we are born again. What we do today is what matters most.",
  "Typing efficiently saves time and boosts productivity in almost every profession.",
  "Every expert was once a beginner. Don’t rush the process of becoming great.",
  "Good communication starts with clarity, whether spoken, typed, or written.",
  "The internet connects people, ideas, and opportunities across the entire globe.",
  "Multitasking may seem productive, but it often reduces focus and effectiveness.",
  "Discipline is choosing between what you want now and what you want most.",
  "Small consistent improvements every day lead to long-term achievements.",
  "Many typing mistakes are caused by looking at the keyboard instead of the screen.",
  "True mastery in typing means you no longer have to think about the keys at all.",
  "Learning happens best when you enjoy the process and stay curious.",
  "A focused mind and relaxed fingers are the best combination for speed typing.",
  "With regular training, typing can become as natural as speaking or walking."
  ];

  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";

  paragraphs[randomIndex].split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    typingText.appendChild(span);
  });

  typingText.querySelector("span").classList.add("active");
  document.addEventListener("keydown", () => input.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(0);

  if (charIndex < characters.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    let currentChar = characters[charIndex];

    if (typedChar === currentChar.innerText) {
      currentChar.classList.add("correct");
    } else {
      currentChar.classList.add("incorrect");
      mistakes++;
    }

    currentChar.classList.remove("active");
    charIndex++;

    if (charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    }else{
      finishTest();
    }

    mistake.innerText = mistakes;
    cpn.innerText = charIndex - mistakes;
    input.value = "";
  } else {
    clearInterval(timer);
    alert("Test finished!");
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    let wpmCalc = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpn.innerText = wpmCalc < 0 || !wpmCalc ? 0 : wpmCalc;
  } else {
    clearInterval(timer);
  }
}

function reset() {
  clearInterval(timer);
  loadParagraph();
  input.value = "";
  timeLeft = maxTime;
  charIndex = 0;
  mistakes = 0;
  isTyping = false;
  time.innerText = timeLeft;
  mistake.innerText = 0;
  wpn.innerText = 0;
  cpn.innerText = 0;
}

function finishTest() {
  clearInterval(timer);
  isTyping = false;
  input.blur(); 
  alert("Typing test completed!");
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
loadParagraph();
