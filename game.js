var buttonColors = ["blue", "red", "green", "yellow"];
var gamePattern = [];
var userClikedPattern = [];
var level = 0;
var started = 0;
var index = -1;

function nextSquence() {
  level += 1;
  $("h1").text("Level " + level);
  var randomChosenNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomChosenNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(250)
    .fadeIn(250);
  playSound(randomChosenColor);
}

$(".btn").click((evt) => {
  var userChosenColor = evt.target.id;
  userClikedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAns(++index);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(() => {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(() => {
  if (!started) {
    nextSquence();
    started = 1;
  }
});

function checkAns(currentIndex) {
  if (userClikedPattern[currentIndex] == gamePattern[currentIndex]) {
    if (userClikedPattern.length == gamePattern.length) {
      userClikedPattern = [];
      index = -1;
      setTimeout(() => {
        nextSquence();
      }, 500);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userClikedPattern = [];
    level = 0;
    started = 0;
    index = -1;
  }
}
