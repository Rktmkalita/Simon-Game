let userClickedPattern;
let gamePattern;
let randomChosenColour;
let started;
let level;
const buttonColour = ["red", "blue", "green", "yellow"];

function init() {
  userClickedPattern = [];
  gamePattern = [];
  started = false;
  level = 0;
}

$(document).keypress(function () {
  if (!started) {
    init();
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});

$(document).ready(function () {
  $(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log("user" + userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
  });
  $(`#${randomChosenColour}`).click(function () {
    animatePress(randomChosenColour);
    $(this).fadeOut(200);
    $(this).fadeIn(200);
    playSound(randomChosenColour);
    console.log("game" + gamePattern);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $(`body`).removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    init();
  }
}
