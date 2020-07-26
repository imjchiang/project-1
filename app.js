//GLOBAL VARIABLE DECLARATIONS ------------------------------------------------
//canvas settings
const HEIGHT = 700;
const WIDTH = 1200;

//background canvas
let gameBackground;
let ctxBackground;

//objects canvas
let game;
let ctx;

//for object creation
let player;
let manyBunkers = [];
let numBunkers;
let manyGunners = [];
let numGunners;

//for background image scrolling
let backgroundImage = document.createElement("img");
backgroundImage.setAttribute("id", "background-img");
backgroundImage.setAttribute("src", "8bit-background.jpg");
let backgroundWidth = 0;
let scrollBackgroundSpeed = -5;
let iteration = 0;

//for balloon image
let balloonImage = document.createElement("img");
balloonImage.setAttribute("id", "balloon-img");
balloonImage.setAttribute("src", "8bit-balloon.png");

//store key press events
let keys = [];

//other
//let ground = 545 to HEIGHT - 545

//difficulty variables
let difficulty = "";



//CLASS AND OBJECT CREATION ---------------------------------------------------
//create Balloon
class Balloon
{
    constructor(xPos, yPos, xSize, ySize, maxBombs)
    {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSize = xSize;
        this.ySize = ySize;
        this.maxBombs = maxBombs;
        this.velX = 0;
        this.velY = 0;
        this.velocity = 120;
        this.drag = 0.8;
    }

    //movement function of Balloon player
    //check key pressed and key released
    //add in velocity factor
    //add in acceleration factor (decceleration)
    //velocity change differs based on direction (down and back faster)
    move()
    {
        //if "w" or "arrow up" pressed
        if (keys[38] || keys[87])
        {
            if (this.velY > - this.velocity)
            {
                this.velY--;
            }
        }
        //if "s" or "arrow down" pressed
        if (keys[40] || keys[83])
        {
            if (this.velY < this.velocity)
            {
                this.velY += 3;
            }
        }
        //if "a" or "arrow left" pressed
        if (keys[37] || keys[65])
        {
            if (this.velX > - this.velocity)
            {
                this.velX -= 2;
            }
        }
        //if "d" or "arrow right" pressed
        if (keys[39] || keys[68])
        {
            if (this.velX < this.velocity)
            {
                this.velX++;
            }
        }

        //decceleration based on drag coefficient
        this.velX *= this.drag;
        this.velY *= this.drag;

        //position change based on velocity change
        this.xPos += this.velX;
        this.yPos += this.velY;

        //in bounds x axis
        if (this.xPos > WIDTH - 70)
        {
            this.xPos = WIDTH - 70;
        }
        else if (this.xPos < 0)
        {
            this.xPos = 0;
        }

        //in bounds y axis
        if (this.yPos > HEIGHT - 110)
        {
            this.yPos = HEIGHT - 110;
        }
        else if (this.yPos < 0)
        {
            this.yPos = 0;
        }
    }

    render()
    {
        ctx.drawImage(balloonImage, this.xPos, this.yPos, this.xSize, this.ySize);
        
        //hitbox for balloon
        // ctx.beginPath();
        // ctx.fillStyle = "purple";
        // ctx.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, 0);
        // ctx.fill();
        
    }
}

//create Bunker
function Bunker(x, y, alive)//, rockets)
{
    this.x = x;
    this.y = y;
    this.alive = alive;
    //this.rockets = rockets;     //not essential
    this.render = function()
    {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x, this.y, 10, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
    }
}

//create Gunners
function Gunner(x, y, angle, maxBullets, bulletFrequency)
{
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.maxBullets = maxBullets;
    this.bulletFrequency = bulletFrequency;
    this.render = function()
    {

    }
}

//give Ammo to different objects
function Ammo(x, y, angle, speed, gravity, shape)
{
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.gravity = gravity;
    this.shape = shape;
    this.render = function()
    {
        if (shape === "circle")
        {

        }
        else if (shape === "rect")
        {

        }
    }
}



//FUNCTIONS -------------------------------------------------------------------
//need to add button click listener
function checkGameConditions()
{
    //MAYBE SWITCH STATEMENT?
    //if difficulty is easy 
    // switch ()
    // {
    //     case ()
    // }
    if (difficulty === "easy")
    {
        //create 3 bunkers
        numbunkers = 3;
        //create 15 gunners
        numGunners = 15;
        //don't change background speed
    }
    //if difficulty is medium
    if (difficulty === "medium")
    {
        //create 5 bunkers
        numbunkers = 5;
        //create 30 gunners
        numGunners = 30;
        //change background speed to -10
        scrollBackgroundSpeed = -10;
    }
    //if difficulty is hard
    if (difficulty === "hard")
    {
        //create 7 bunkers
        numbunkers = 7;
        //create 50 gunners
        numGunners = 50;
        //change background speed to -15
        scrollBackgroundSpeed = -15;
    }
    //if difficulty is death
    if (difficulty === "death")
    {
        //create 10 bunkers
        numbunkers = 10;
        //create 90 gunners
        numGunners = 90;
        //change background speed to -25
        scrollBackgroundSpeed = -25;
    }
}

function loopBackground()
{
    iteration++;
    //draw current background image
    ctxBackground.drawImage(backgroundImage, backgroundWidth, 0, WIDTH, HEIGHT);
    //draw queued background image
    ctxBackground.drawImage(backgroundImage, backgroundWidth + WIDTH, 0, WIDTH, HEIGHT);

    //update backgroundImage scroll point
    backgroundWidth += scrollBackgroundSpeed;

    //reset background image to initial state after complete scrolling of image 1
    if (- backgroundWidth === game.width)
    {
        backgroundWidth = 0;
    }   
}

function startLoop()
{
    //console.log(iteration);
    //run background image animation
    requestAnimationFrame(loopBackground);
}
//add gravity

//global movement (not balloon)

//run game 
const playGame = () =>
{
    console.log("looping yeeet");
    //clear the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    //run background image loop
    startLoop();

    //check if the bunker is alive
        //if alive, render
        //check collision with bomb
    
    //render the player
    player.render();
    player.move();
}



//SET UP AND RUN GAME ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() 
{
    console.log("DOM Loaded");

    document.body.addEventListener("keydown", function (e) 
    {
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function (e) 
    {
        keys[e.keyCode] = false;
    });

    //DOM REFERECES
    game = document.getElementById("game");
    gameBackground = document.getElementById("game-background");

    //BACKGROUND CANVAS CONFIGS
    gameBackground.setAttribute("width", WIDTH);
    gameBackground.setAttribute("height", HEIGHT);
    ctxBackground = gameBackground.getContext("2d");

    //CANVAS CONFIGS
    game.setAttribute("width", WIDTH);
    game.setAttribute("height", HEIGHT);
    ctx = game.getContext("2d");

    //character refs
    //create Player
    //maxBombs depends on difficulty level
    player = new Balloon(150, 100, 70, 110, 5);
    //create array of gunners
        //create array of ammo for gunners
    
    //button click listener?
    checkGameConditions();

    //create bunkers
    for (let i = 1; i <= numBunkers; i++)
    {
        //let bunker = new Bunker()
        manyBunkers.push
    }
    
    //if time allows for it, create rockets (ammo) that comes out of bunker occasionally


    //listen for keydown event
    document.addEventListener("keydown", player.move);

    //RUN GAME
    let runGame = setInterval(playGame, 60);
})