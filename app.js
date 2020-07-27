//GLOBAL VARIABLE DECLARATIONS ---------------------------------------------------------------------------------------
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
let backgroundXPos = 0;
let scrollBackgroundSpeed = -5;
//let iteration = 0;

//for balloon image
let balloonImage = document.createElement("img");
balloonImage.setAttribute("id", "balloon-img");
balloonImage.setAttribute("src", "8bit-balloon-2.png");

//store key press events
let keys = [];

//other
let ground = 155;

//difficulty variables
let difficulty = "";



//CLASS AND OBJECT CREATION ------------------------------------------------------------------------------------------
//create Balloon
class Balloon
{
    constructor(xPos, yPos, xSize, ySize, maxBombs)
    {
        //positioning and size
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSize = xSize;
        this.ySize = ySize;

        //are we still good?
        this.alive = true;
        this.hitGround = 0;     //hit ground 3 times = dead

        //ammunition
        this.maxBombs = maxBombs;

        //movement
        this.velX = 0;
        this.velY = 0;
        this.velocity = 120;
        this.drag = 0.85;
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
            this.velY--;
        }
        //if "s" or "arrow down" pressed
        if (keys[40] || keys[83])
        {
            this.velY += 3;
        }
        //if "a" or "arrow left" pressed
        if (keys[37] || keys[65])
        {
            this.velX -= 2;
        }
        //if "d" or "arrow right" pressed
        if (keys[39] || keys[68])
        {
            this.velX++;
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
        if (this.yPos > HEIGHT - ground - 120)
        {
            this.yPos = HEIGHT - ground - 120;
            this.hitGround++;
        }
        else if (this.yPos < 0)
        {
            this.yPos = 0;
        }
    }

    //render balloon object
    //render hitboxes
    render()
    {
        ctx.drawImage(balloonImage, this.xPos, this.yPos, this.xSize, this.ySize);
        
        //hitbox for balloon
        //hitbox variables
        let hitboxRadius = 34;
        let xAlignment = hitboxRadius + 0.9;
        let yAlignment = hitboxRadius + 1.4;
        //circle portion of hitbox
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.arc(this.xPos + xAlignment, this.yPos + yAlignment, hitboxRadius, 2 * Math.PI, 0);
        ctx.closePath();
        ctx.fill();
        //main triangle portion of hitbox
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.moveTo(this.xPos, (this.yPos + (hitboxRadius * 1.2)));
        ctx.lineTo((this.xPos + xAlignment), (this.yPos + 100));
        ctx.lineTo((this.xPos + (xAlignment * 2)), (this.yPos + (hitboxRadius * 1.2)));
        ctx.closePath();
        ctx.fill();
        //secondary triangle portion of hitbox
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.moveTo((this.xPos + (hitboxRadius * 0.48)), (this.yPos + (hitboxRadius * 2)));
        ctx.lineTo((this.xPos + (xAlignment * 1)), (this.yPos + 107));
        ctx.lineTo((this.xPos + (xAlignment * 1.53)), (this.yPos + (hitboxRadius * 2)));
        ctx.closePath();
        ctx.fill();
        //upper bottom half circle
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.arc(this.xPos + xAlignment, this.yPos + 105, 8, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
        //lower bottom half circle
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.arc(this.xPos + xAlignment, this.yPos + 111, 9, 2 * Math.PI, 0);
        ctx.closePath();
        ctx.fill();
    }
}

//create Bunker
function Bunker(x, y)//, rockets)
{
    this.x = x;
    this.y = y;
    this.alive = true;
    //this.rockets = rockets;     //not essential
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



//FUNCTIONS ----------------------------------------------------------------------------------------------------------
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
    //iteration++;
    //draw current background image
    ctxBackground.drawImage(backgroundImage, backgroundXPos, 0, WIDTH, HEIGHT);
    //draw queued background image
    ctxBackground.drawImage(backgroundImage, backgroundXPos + WIDTH, 0, WIDTH, HEIGHT);
    
    //update backgroundImage scroll point
    backgroundXPos += scrollBackgroundSpeed;
    
    //reset background image to initial state after complete scrolling of image 1
    if (- backgroundXPos === game.width)
    {
        backgroundXPos = 0;
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
function playGame()
{
    console.log("looping yeeet");
    //clear the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    //run background image loop
    startLoop();
    
    //check if the bunker is alive
    //if alive, render
    renderBunkers();
    //check collision with bomb
    
    //render the player
    player.render();
    player.move();
}

//create the bunkers
function createBunkers()
{
    //check the number of bunkers set according to difficulty
    switch (numBunkers)
    {
        //if 10 bunkers, start here and go all the way down
        case (10):
            let bunker10 = new Bunker(1000, 600);
            let bunker9 = new Bunker(900, 600);
            let bunker8 = new Bunker(800, 600);
            manyBunkers.push(bunker10, bunker9, bunker8);
        //if 7 bunkers, start here and go all the way down
        case (7):
            let bunker7 = new Bunker(700, 600);
            let bunker6 = new Bunker(600, 600);
            manyBunkers.push(bunker7, bunker6);
        //if 5 bunkers, start here and go all the way down
        case (5):
            let bunker5 = new Bunker(500, 600);
            let bunker4 = new Bunker(400, 600);
            manyBunkers.push(bunker5, bunker4);
        //if 3 bunkers, start here and go all the way down
        case (3):
            let bunker3 = new Bunker(300, 600);
            let bunker2 = new Bunker(200, 600);
            let bunker1 = new Bunker(100, 600);
            manyBunkers.push(bunker3, bunker2, bunker1);
            break;
        //if invalid number of bunkers
        default:
            console.log("ERROR: INVALID NUMBER OF BUNKERS");
            break;
    }
}

//render bunkers if alive
function renderBunkers()
{
    //for each bunker
    manyBunkers.forEach(oneBunker =>
    {
        //if bunker is alive
        if (oneBunker.alive)
        {
            //draw the bunker
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(oneBunker.x, oneBunker.y, 10, Math.PI, 0);
            ctx.closePath();
            ctx.fill();    
        }
    });
}


//SET UP AND RUN GAME ------------------------------------------------------------------------------------------------
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
    player = new Balloon(150, 100, 70, 120, 5);
    //create array of gunners
        //create array of ammo for gunners
    
    //button click listener?
    checkGameConditions();

    numBunkers = 10;
    //create bunkers
    createBunkers();

    //if time allows for it, create rockets (ammo) that comes out of bunker occasionally


    //listen for keydown event
    //document.addEventListener("keydown", player.move);

    //RUN GAME
    let runGame = setInterval(playGame, 60);    //change number for better fps, need to account for speed of game though
})