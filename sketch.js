var bg, bgImg;
var carImg;
var obstacle1, obstacle2;
var restartImg;
// obstacle1 = RoadBarrier
// obstacle2 = RoadCone

var score = 0;

var gameState = "play";

function preload() {
  bgImg = loadImage("assets/Bg.png");
  carImg = loadImage("assets/Car.png");
  obstacle1 = loadImage("assets/RoadBarrier.png");
  obstacle2 = loadImage("assets/RoadCone.png");
  restartImg = loadImage("assets/restart.png");
  coinImg = loadImage("assets/coins.png");
}

function setup() {
  createCanvas(1000, 500);

  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage(bgImg);
  bg.scale = 2.6;

  car = createSprite(500, 400);
  car.addImage(carImg);
  car.scale = 0.2;


  restart = createSprite(width / 2, height / 2);
  restart.addImage(restartImg);
  restart.scale = 0.4;

  obstaclesGroup = createGroup();
  coinsGroup = createGroup();
}

function draw() {
  background("black");

  if (gameState == "play") {
    bg.velocityY = 3;

    restart.visible = false;

    if (bg.y > height) {
      bg.y = 250;
    }

    if (keyDown("left")) {
      car.velocityX = -5;
    }

    if (keyDown("right")) {
      car.velocityX = 5;
    }

    if (keyDown("up")) {
      car.velocityY = -3;
    }

    if (keyDown("down")) {
      car.velocityY = 3;
    }

    spawnCoins();
    spawnObstacles();

    if (coinsGroup.isTouching(car)) {
      for (var i = 0; i < coinsGroup.length; i++) {
        if (coinsGroup[i].isTouching(car)) {
          coinsGroup[i].destroy();
          score = score + 1
        }
      }
    }

    if (car.isTouching(obstaclesGroup)) {
      gameState = "end";

      restart.visible = true;
    }
  }

  if (gameState == "end") {
    car.velocityY = 0;
    car.velocityX = 0;

    bg.velocityY = 0;

    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityYEach(0);

    coinsGroup.setLifetimeEach(-1);
    coinsGroup.setVelocityYEach(0);

    if (mousePressedOver(restart)) {
      gameOver();
    }
  }

  drawSprites();

  textSize(27);
  fill("red");
  text("Coins Collected : " + score, 380, 480);
}

function gameOver() {
  gameState = "play";
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if (frameCount % 50 === 0) {
    obstacles = createSprite(Math.round(random(50, 900)), -50);

    n = Math.round(random(1, 2));

    if (n == 1) {
      obstacles.addImage(obstacle1);
      obstacles.scale = 0.6;
      // obstacles.debug = true
      obstacles.setCollider("rectangle" , 0,0, 250,160)
    } 
    
    else {
      obstacles.addImage(obstacle2);
      obstacles.scale = 0.4;
      // obstacles.debug = true
      obstacles.setCollider("rectangle" , 0,0, 250,190)
    }

    obstacles.velocityY = 3;

    obstacles.setLifetime = height / 3;
    // obstacles.lifetime = 400;
    obstaclesGroup.add(obstacles);
  }
}

function spawnCoins() {
  if (frameCount % 80 === 0) {
    coins = createSprite(Math.round(random(50, 900)), -50);

    coins.addImage(coinImg);
    coins.scale = 0.4;

    coins.velocityY = 3;
    coins.setCollider("circle" , 0,0, 100)

    // coins.debug = true

    coins.setLifetime = height / 3;
    // coins.lifetime = 400;
    coinsGroup.add(coins);
  }
}
