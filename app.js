//for game and canvas
const HEIGHT = 700;
const WIDTH = 1200;

let gameBackground;
let ctxBackground;

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

//other
//let ground = 545 to HEIGHT - 545

//difficulty variables
let difficulty = "";


//create Balloon
class Balloon
{
    constructor(radius, shape, xPos, yPos, maxBombs)
    {
        this.radius = radius;
        this.shape = shape;
        this.xPos = xPos;
        this.yPos = yPos;
        this.maxBombs = maxBombs;
    }

    //movement function of Balloon player
    //need to change out width and height for the circle hitbox
    //need to change out window size
    move = e =>
    {
        switch (e.key)
        {
            case ("w"):
                //console.log(this.yPos);
                this.yPos -= 5;
                if (this.yPos - this.radius < 0)
                {
                this.yPos = this.radius;
                }
                //console.log(this.yPos);
                break;
            case ("s"):
                //console.log(this.yPos);
                this.yPos += 5;
                if (this.yPos + this.radius > game.height)
                {
                    this.yPos = game.height - this.radius;
                }
                //console.log(this.yPos);
                break;
            case ("a"):
                //console.log(this.xPos);
                this.xPos -= 5;
                if (this.xPos - this.radius < 0)
                {
                    this.xPos = this.radius;
                }
                //console.log(this.xPos);
                break;
            case ("d"):
                //console.log(this.xPos);
                this.xPos += 5;
                if (this.xPos + this.radius > game.width)
                {
                    this.xPos = game.width - this.radius;
                }
                //console.log(this.xPos);
                break;
            default:
                console.log("WASD ONLY");
        }
    }
    //let player = new Balloon(2020, "Tesla", "Model S", "red");

    render()
    {
        ctx.beginPath();
        ctx.fillStyle = "purple";
        ctx.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, 0);
        ctx.fill();
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
}

document.addEventListener("DOMContentLoaded", function() 
{
    console.log("DOM Loaded");

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

    ctx.fillStyle = "purple";
    ctx.fillRect(0, 545, WIDTH, HEIGHT - 545);
    //character refs
    //create Player
    //maxBombs depends on difficulty level
    player = new Balloon(20, "circle", 400, 100, 5);
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