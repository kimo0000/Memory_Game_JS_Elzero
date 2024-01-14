const userName = document.querySelector(".name_user span"),
  popupStart = document.querySelector(".start_game"),
  btnStart = popupStart.querySelector(".btn_start"),
  contentBlock = document.querySelector(".content_game"),
  cards = contentBlock.querySelectorAll(".content_game .card"),
  timerEl = document.querySelector(".timer span"),
  backTryEl = document.querySelector(".back_try span"),
  wrongTry = document.querySelector(".wrong_try span"),
  startGame = document.querySelector("#game_start"),
  success = document.querySelector("#success"),
  fail = document.querySelector("#fail");

console.log(startGame, success, fail);

let tryFail = 0;
let timer = 20;
let timeClear = null;

btnStart.addEventListener("click", () => {
  cards.forEach((card) => card.classList.remove("match"));
  timeClear = setInterval(() => {
    if (timer > 0) {
      timer--;
      timerEl.innerText = timer;
    }
    console.log(timer);
    if (timer === 0) {
      clearInterval(timeClear);
      popupStart.style.display = "grid";
      timer = 20;
      timerEl.innerText = timer;
      tryFail = 0;
      wrongTry.innerText = tryFail < 10 ? `0${tryFail}` : `${tryFail}`;
    }
  }, 1000);

  let user = prompt("What Is Your Name ?");
  if (user === null || user == "") {
    userName.innerText = "Unknow.";
  } else {
    userName.innerText = user;
  }

  popupStart.style.display = "none";
  backTryEl.innerText = localStorage.getItem("back_try") || "00";
  startGame.play();
});

cards.forEach((card) => {
  let random = Math.floor(Math.random() * cards.length);
  card.style.order = random;

  card.addEventListener("click", (e) => initGame(card));
});

function initGame(target) {
  target.classList.add("fliped");

  const blockFliped = [...cards].filter((card) =>
    card.classList.contains("fliped")
  );

  if (blockFliped.length === 2) {
    stopBlock();
    checkBlock(blockFliped[0], blockFliped[1]);
  }
}

function stopBlock() {
  contentBlock.classList.add("is_selected");
  setTimeout(() => {
    contentBlock.classList.remove("is_selected");
  }, 1000);
}

function checkBlock(blockOne, blockTwo) {
  //  console.log(blockOne.id, blockTwo.id);
  if (blockOne.id == blockTwo.id) {
    blockOne.classList.remove("fliped");
    blockTwo.classList.remove("fliped");
    blockOne.classList.add("match");
    blockTwo.classList.add("match");
    success.play();
  } else {
    fail.play();
    setTimeout(() => {
      blockOne.classList.remove("fliped");
      blockTwo.classList.remove("fliped");
    }, 1000);

    tryFail++;
    wrongTry.innerText = tryFail < 10 ? `0${tryFail}` : `${tryFail}`;
    localStorage.setItem("back_try", tryFail);
  }
}
