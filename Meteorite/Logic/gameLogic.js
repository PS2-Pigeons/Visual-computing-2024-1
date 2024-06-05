import { Ship } from './ship.js';
import { MeteoriteSystem } from './meteoriteSystem.js';
const { Engine, World, Events } = Matter;

let engine, world;
let ship;
let meteorites;
let gameState = 0; // 0: Game not started, 1: In-game, 2: Game over
let score = 0;
let lives = 3;

let meteoriteAmount = 2;
let isPaused = false;

let hitFeedback = 0;
let changeFeedback =0;
let changeMsg;
let changeInfo;

function setup() {
    var myCanvas = createCanvas(600, 600);
    frameRate(60);
    angleMode(DEGREES);
    // TESTING
    // Comment the following line to test in vscode with p5canvas extension
    // Uncomment to deploy in HTML or use Live server
    myCanvas.parent("canvasContainer");

    engine = Engine.create(); // Collision handling engine
    world = engine.world; // Reference to the world associated with the engine
    engine.gravity.y = 0; // Remove gravity from the world

    meteorites = new MeteoriteSystem(world, 0.5, 40, 3);
    meteorites.spawnMeteorites(meteoriteAmount, 40);

    Events.on(engine, 'collisionStart', function(event) {
        event.pairs.forEach(function(pair) {
            // Always pass the reference to itself first to the onCollision method of any body
            pair.bodyA.owner.onCollision(pair.bodyA, pair.bodyB);
            pair.bodyB.owner.onCollision(pair.bodyB, pair.bodyA);
            if(meteorites.meteorites.length == 0){

                const encouragementMessages = [
                    "Great job!",
                    "OK",
                    "Good work!",
                    "Amazing!",
                    "Well done!"
                ];
                
                // Generate a random index to select a message from the array
                const randomIndex = Math.floor(Math.random() * encouragementMessages.length);
                
                // Retrieve the randomly selected message
                changeMsg = encouragementMessages[randomIndex];
                

                const randomNumber = Math.random();
                // Check the range of the random number to determine the outcome
                if (randomNumber < .3) {
                    meteoriteAmount++;
                    changeInfo = '+ 1 Meteor';
                } else if (randomNumber < .5) {
                    meteorites.speedMultiplier += 0.1;
                    changeInfo = '+ Meteor Speed';
                } else if (randomNumber < .7){
                    meteorites.startingSize += 5;
                    meteorites.meteoriteMaxHp++;
                    changeInfo = '+ Meteor Health';
                }else if (randomNumber < .9){
                    lives++;
                    changeInfo = '+ 1 live!';
                }else{
                    ship.attackCooldown -= 50;
                    changeInfo = '- ATK Cooldown!';
                }

                changeFeedback = 60 * 2;
                meteorites.spawnMeteorites(meteoriteAmount, meteorites.startingSize);
            }
        });
    });
}

function draw() {
    background(0);
    meteorites.render();
    if (gameState === 0) {
        meteorites.update();
        Engine.update(engine);
        displayStartScreen();
    } else if (gameState === 1) {
        ship.render();
        if (!isPaused) {
            meteorites.update();
            Engine.update(engine);
            ship.update();

            if (hitFeedback > 0) {
                displayHitFeedback();
                hitFeedback -= 1;
            }

            if (changeFeedback > 0) {
                displayChangeFeedback();
                changeFeedback -= 1;
            }


        }else{
            displayPauseMenu();
        }
        displayHUD();
        
    } else if (gameState === 2) {
        displayGameOver();
    }
}

function displayStartScreen() {
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("METEORITE.JS", width / 2, height / 2 - 10);
    textSize(16);
    text("Press any key to start", width / 2, height / 2 + 10);
    pop();
}

function displayGameOver() {
    // Display game over screen with score and lives
    // Also include option to restart the game
    push();
      fill(255, 0, 0);
      rectMode(CENTER);
      rect(width / 2, height / 2, 300, 100);
      textAlign(CENTER, CENTER);
      fill(255);
      textSize(24);
      text("Game Over", width / 2, height / 2 - 15);
      textSize(16);
      text(`Max score: ${score}`, width / 2, height / 2 + 10);
      text("Press any key to try again", width / 2, height / 2 + 30);
    pop();
}

function displayHUD() {
    push();
      fill(255);
      textSize(16);
      textAlign(RIGHT, TOP);
      text(`Score: ${score}`, width - 10, 10);
      text(`Lives: ${lives}`, width - 10, 30);
    pop();
}

function displayPauseMenu() {
    // Display pause menu
    push();
      fill(255);
      rectMode(CENTER);
      rect(width / 2, height / 2, 200, 100);
      textAlign(CENTER, CENTER);
      textSize(24);
      fill(0);
      text("PAUSED!", width / 2, height / 2 - 10);
      textSize(16);
      text("Press ESC to resume", width / 2, height / 2 + 20);
    pop();
}

function displayHitFeedback() {
    // Display hit feedback effect
    push();
      strokeWeight(10);
      stroke(255, 0, 0);
      noFill();
      rect(0, 0, width, height);
    pop();
}

function displayChangeFeedback(){
    push();
        fill('pink');
        rectMode(CENTER);
        rect(width / 2, height / 2, 200, 100);
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(0);
        text(changeMsg, width / 2, height / 2 - 10);
        textSize(16);
        text(changeInfo, width / 2, height / 2 + 20);
    pop();
}

function keyPressed() {
    if (gameState === 0 || gameState === 2 && hitFeedback == 0) {
        resetGame(); // Start or restart the game on any key press
    } else if (keyCode === ESCAPE) {
        isPaused = !isPaused; // Toggle pause state on ESC key press
    }
}

function resetGame() {
    gameState = 1;
    score = 0;
    lives = 3;
    meteoriteAmount = 2;
    isPaused = false;
    World.clear(world);
    ship = new Ship(world, 3, 250);

    ship.onShipHit = function(){
      lives--;
      hitFeedback = 60; // Display hit feedback for 1 second (60 frames)
      if (lives <= 0) {
        gameState = 2; // Game over if no lives left
        lives = 0;
        hitFeedback = 0;
      }; 
    };

    meteorites = new MeteoriteSystem(world, 0.5, 40, 3);
    meteorites.scoreUpdate = function(meteoriteHp) {score += 10 * meteoriteHp};
    meteorites.spawnMeteorites(meteoriteAmount, 40);
}

// Set up the canvas and main functions
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
