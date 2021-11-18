//display pattern
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
$(document).keypress(function() {
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSquence();
        started = true;
    }
})



//nextSquence
function nextSquence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    //animation of button
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    sounds(randomChosenColor);
}
//which button is pressed 
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    sounds(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSquence();
            }, 1000);}
    }
    else
    {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
    }
}

function startover() {
    level = 0;
    gamePattern = [];
    started = false;
}

function sounds(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(params) {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}