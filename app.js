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
let balloonGround = 155;

let manyBunkers = [];
let numBunkers;
let bunkerRandomY = [];
let bunkerRandomX = [];

let manyGunners = [];
let numGunners;
let gunnerRandomY = [];
let gunnerRandomX = [];

//for background image scrolling
let backgroundImage = document.createElement("img");
backgroundImage.setAttribute("id", "background-img");
backgroundImage.setAttribute("src", "8bit-background.jpg");
let backgroundXPos = 0;
let scrollSpeed = -5;
//let iteration = 0;

//for balloon image
let balloonImage = document.createElement("img");
balloonImage.setAttribute("id", "balloon-img");
balloonImage.setAttribute("src", "8bit-balloon-2.png");

//for bunker image
let bunkerImage = document.createElement("img");
bunkerImage.setAttribute("id", "bunker-img");
bunkerImage.setAttribute("src", "bunker-on-hill.png");

//store key press events
let keys = [];

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
        if (this.yPos > HEIGHT - balloonGround - 120)
        {
            this.yPos = HEIGHT - balloonGround - 120;
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
function Gunner(x, y)//, angle, maxBullets, bulletFrequency)
{
    this.x = x;
    this.y = y;
    // this.angle = angle;
    // this.maxBullets = maxBullets;
    // this.bulletFrequency = bulletFrequency;
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
        scrollSpeed = -10;
    }
    //if difficulty is hard
    if (difficulty === "hard")
    {
        //create 7 bunkers
        numbunkers = 7;
        //create 50 gunners
        numGunners = 50;
        //change background speed to -15
        scrollSpeed = -15;
    }
    //if difficulty is death
    if (difficulty === "death")
    {
        //create 10 bunkers
        numbunkers = 10;
        //create 90 gunners
        numGunners = 90;
        //change background speed to -25
        scrollSpeed = -25;
    }
}

//move the background and objects
function loopElements()
{
    //iteration++;
    //background scrolling
    {
        //draw current background image
        ctxBackground.drawImage(backgroundImage, backgroundXPos, 0, WIDTH, HEIGHT);
        //draw queued background image
        ctxBackground.drawImage(backgroundImage, backgroundXPos + WIDTH, 0, WIDTH, HEIGHT);
        
        //update backgroundImage scroll point
        backgroundXPos += scrollSpeed;
        
        //reset background image to initial state after complete scrolling of image 1
        if (- backgroundXPos === game.width)
        {
            backgroundXPos = 0;
        }   
    }

    //bunker movement
    {
        //for each bunker
        manyBunkers.forEach(oneBunker =>
        {
            //move it at scroll speed
            oneBunker.x += scrollSpeed;
        });
    }

    //gunner movement
    {
        //for each bunker
        manyGunners.forEach(oneGunner =>
        {
            //move it at scroll speed
            oneGunner.x += scrollSpeed;
        });
    }
}

//loop backgound image
function startLoop()
{
    //console.log(iteration);
    //run background image animation and move objects
    requestAnimationFrame(loopElements);
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
    
    //render alive bunkers
    renderBunkers();
    //render gunners
    renderGunners();

    //check collision with bomb
    
    //render the player
    player.render();
    player.move();
}

//create the bunkers
function createBunkers()
{
    for (let i = 0; i < numBunkers; i++)
    {
        bunkerRandomY[i] = (HEIGHT - Math.floor(Math.random() * (HEIGHT - 585)) - 60);
    }

    for (let i = 1; i < numBunkers + 1; i++)
    {
        bunkerRandomX[i - 1] = (1.5 * WIDTH * i) + Math.floor(Math.random() * (WIDTH / 4)) - Math.floor(Math.random() * (WIDTH / 2));
    }

    //check the number of bunkers set according to difficulty
    switch (numBunkers)
    {
        //if 10 bunkers, start here and go all the way down
        case (10):
            let bunker10 = new Bunker(bunkerRandomX[9], bunkerRandomY[9]);
            let bunker9 = new Bunker(bunkerRandomX[8], bunkerRandomY[8]);
            let bunker8 = new Bunker(bunkerRandomX[7], bunkerRandomY[7]);
            manyBunkers.push(bunker10, bunker9, bunker8);
        //if 7 bunkers, start here and go all the way down
        case (7):
            let bunker7 = new Bunker(bunkerRandomX[6], bunkerRandomY[6]);
            let bunker6 = new Bunker(bunkerRandomX[5], bunkerRandomY[5]);
            manyBunkers.push(bunker7, bunker6);
        //if 5 bunkers, start here and go all the way down
        case (5):
            let bunker5 = new Bunker(bunkerRandomX[4], bunkerRandomY[4]);
            let bunker4 = new Bunker(bunkerRandomX[3], bunkerRandomY[3]);
            manyBunkers.push(bunker5, bunker4);
        //if 3 bunkers, start here and go all the way down
        case (3):
            let bunker3 = new Bunker(bunkerRandomX[2], bunkerRandomY[2]);
            let bunker2 = new Bunker(bunkerRandomX[1], bunkerRandomY[1]);
            let bunker1 = new Bunker(bunkerRandomX[0], bunkerRandomY[0]);
            manyBunkers.push(bunker3, bunker2, bunker1);
            break;
        //if invalid number of bunkers
        default:
            console.log("ERROR: INVALID NUMBER OF BUNKERS");
            console.log(numBunkers);
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
            ctx.drawImage(bunkerImage, oneBunker.x, oneBunker.y, 100, 50);
            
            //bunker as half circle
            //hitbox for bunker??
            /*
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(oneBunker.x, oneBunker.y, 40, Math.PI, 0);
            ctx.closePath();
            ctx.fill();    
            */
        }
    });
}

//create the gunners
function createGunners()
{
    for (let i = 0; i < numGunners; i++)
    {
        gunnerRandomY[i] = (HEIGHT - Math.floor(Math.random() * (HEIGHT - 585)) - 60);
    }

    for (let i = 1; i < numGunners + 1; i++)
    {
        gunnerRandomX[i - 1] = (1.5 * WIDTH * i) + Math.floor(Math.random() * (WIDTH / 4)) - Math.floor(Math.random() * (WIDTH / 2));
    }

    //check the number of gunners set according to difficulty
    switch (numGunners)
    {
        //if 10 gunners, start here and go all the way down
        case (90):
            let gunner90 = new Gunner(gunnerRandomX[89], gunnerRandomY[89]);
            let gunner89 = new Gunner(gunnerRandomX[88], gunnerRandomY[88]);
            let gunner88 = new Gunner(gunnerRandomX[87], gunnerRandomY[87]);
            let gunner87 = new Gunner(gunnerRandomX[86], gunnerRandomY[86]);
            let gunner86 = new Gunner(gunnerRandomX[85], gunnerRandomY[85]);
            let gunner85 = new Gunner(gunnerRandomX[84], gunnerRandomY[84]);
            let gunner84 = new Gunner(gunnerRandomX[83], gunnerRandomY[83]);
            let gunner83 = new Gunner(gunnerRandomX[82], gunnerRandomY[82]);
            let gunner82 = new Gunner(gunnerRandomX[81], gunnerRandomY[81]);
            let gunner81 = new Gunner(gunnerRandomX[80], gunnerRandomY[80]);
            let gunner80 = new Gunner(gunnerRandomX[79], gunnerRandomY[79]);
            let gunner79 = new Gunner(gunnerRandomX[78], gunnerRandomY[78]);
            let gunner78 = new Gunner(gunnerRandomX[77], gunnerRandomY[77]);
            let gunner77 = new Gunner(gunnerRandomX[76], gunnerRandomY[76]);
            let gunner76 = new Gunner(gunnerRandomX[75], gunnerRandomY[75]);
            let gunner75 = new Gunner(gunnerRandomX[74], gunnerRandomY[74]);
            let gunner74 = new Gunner(gunnerRandomX[73], gunnerRandomY[73]);
            let gunner73 = new Gunner(gunnerRandomX[72], gunnerRandomY[72]);
            let gunner72 = new Gunner(gunnerRandomX[71], gunnerRandomY[71]);
            let gunner71 = new Gunner(gunnerRandomX[70], gunnerRandomY[70]);
            let gunner70 = new Gunner(gunnerRandomX[69], gunnerRandomY[69]);
            let gunner69 = new Gunner(gunnerRandomX[68], gunnerRandomY[68]);
            let gunner68 = new Gunner(gunnerRandomX[67], gunnerRandomY[67]);
            let gunner67 = new Gunner(gunnerRandomX[66], gunnerRandomY[66]);
            let gunner66 = new Gunner(gunnerRandomX[65], gunnerRandomY[65]);
            let gunner65 = new Gunner(gunnerRandomX[64], gunnerRandomY[64]);
            let gunner64 = new Gunner(gunnerRandomX[63], gunnerRandomY[63]);
            let gunner63 = new Gunner(gunnerRandomX[62], gunnerRandomY[62]);
            let gunner62 = new Gunner(gunnerRandomX[61], gunnerRandomY[61]);
            let gunner61 = new Gunner(gunnerRandomX[60], gunnerRandomY[60]);
            let gunner60 = new Gunner(gunnerRandomX[59], gunnerRandomY[59]);
            let gunner59 = new Gunner(gunnerRandomX[58], gunnerRandomY[58]);
            let gunner58 = new Gunner(gunnerRandomX[57], gunnerRandomY[57]);
            let gunner57 = new Gunner(gunnerRandomX[56], gunnerRandomY[56]);
            let gunner56 = new Gunner(gunnerRandomX[55], gunnerRandomY[55]);
            let gunner55 = new Gunner(gunnerRandomX[54], gunnerRandomY[54]);
            let gunner54 = new Gunner(gunnerRandomX[53], gunnerRandomY[53]);
            let gunner53 = new Gunner(gunnerRandomX[52], gunnerRandomY[52]);
            let gunner52 = new Gunner(gunnerRandomX[51], gunnerRandomY[51]);
            let gunner51 = new Gunner(gunnerRandomX[50], gunnerRandomY[50]);
            manyGunners.push(gunner90, gunner89, gunner88, gunner87, gunner86, 
                            gunner85, gunner84, gunner83, gunner82, gunner81, 
                            gunner80, gunner79, gunner78, gunner77, gunner76, 
                            gunner75, gunner74, gunner73, gunner72, gunner71, 
                            gunner70, gunner69, gunner68, gunner67, gunner66, 
                            gunner65, gunner64, gunner63, gunner62, gunner61, 
                            gunner60, gunner59, gunner58, gunner57, gunner56, 
                            gunner55, gunner54, gunner53, gunner52, gunner51);
        case (50):
            let gunner50 = new Gunner(gunnerRandomX[49], gunnerRandomY[49]);
            let gunner49 = new Gunner(gunnerRandomX[48], gunnerRandomY[48]);
            let gunner48 = new Gunner(gunnerRandomX[47], gunnerRandomY[47]);
            let gunner47 = new Gunner(gunnerRandomX[46], gunnerRandomY[46]);
            let gunner46 = new Gunner(gunnerRandomX[45], gunnerRandomY[45]);
            let gunner45 = new Gunner(gunnerRandomX[44], gunnerRandomY[44]);
            let gunner44 = new Gunner(gunnerRandomX[43], gunnerRandomY[43]);
            let gunner43 = new Gunner(gunnerRandomX[42], gunnerRandomY[42]);
            let gunner42 = new Gunner(gunnerRandomX[41], gunnerRandomY[41]);
            let gunner41 = new Gunner(gunnerRandomX[40], gunnerRandomY[40]);
            let gunner40 = new Gunner(gunnerRandomX[39], gunnerRandomY[39]);
            let gunner39 = new Gunner(gunnerRandomX[38], gunnerRandomY[38]);
            let gunner38 = new Gunner(gunnerRandomX[37], gunnerRandomY[37]);
            let gunner37 = new Gunner(gunnerRandomX[36], gunnerRandomY[36]);
            let gunner36 = new Gunner(gunnerRandomX[35], gunnerRandomY[35]);
            let gunner35 = new Gunner(gunnerRandomX[34], gunnerRandomY[34]);
            let gunner34 = new Gunner(gunnerRandomX[33], gunnerRandomY[33]);
            let gunner33 = new Gunner(gunnerRandomX[32], gunnerRandomY[32]);
            let gunner32 = new Gunner(gunnerRandomX[31], gunnerRandomY[31]);
            let gunner31 = new Gunner(gunnerRandomX[30], gunnerRandomY[30]);
            manyGunners.push(gunner50, gunner49, gunner48, gunner47, gunner46, 
                            gunner45, gunner44, gunner43, gunner42, gunner41, 
                            gunner40, gunner39, gunner38, gunner37, gunner36, 
                            gunner35, gunner34, gunner33, gunner32, gunner31);
        //if 5 gunners, start here and go all the way down
        case (30):
            let gunner30 = new Gunner(gunnerRandomX[29], gunnerRandomY[29]);
            let gunner29 = new Gunner(gunnerRandomX[28], gunnerRandomY[28]);
            let gunner28 = new Gunner(gunnerRandomX[27], gunnerRandomY[27]);
            let gunner27 = new Gunner(gunnerRandomX[26], gunnerRandomY[26]);
            let gunner26 = new Gunner(gunnerRandomX[25], gunnerRandomY[25]);    
            let gunner25 = new Gunner(gunnerRandomX[24], gunnerRandomY[24]);
            let gunner24 = new Gunner(gunnerRandomX[23], gunnerRandomY[23]);
            let gunner23 = new Gunner(gunnerRandomX[22], gunnerRandomY[22]);
            let gunner22 = new Gunner(gunnerRandomX[21], gunnerRandomY[21]);
            let gunner21 = new Gunner(gunnerRandomX[20], gunnerRandomY[20]);
            let gunner20 = new Gunner(gunnerRandomX[19], gunnerRandomY[19]);
            let gunner19 = new Gunner(gunnerRandomX[18], gunnerRandomY[18]);
            let gunner18 = new Gunner(gunnerRandomX[17], gunnerRandomY[17]);
            let gunner17 = new Gunner(gunnerRandomX[16], gunnerRandomY[16]);
            let gunner16 = new Gunner(gunnerRandomX[15], gunnerRandomY[15]);
            manyGunners.push(gunner30, gunner29, gunner28, gunner27, gunner26, 
                            gunner25, gunner24, gunner23, gunner22, gunner21, 
                            gunner20, gunner19, gunner18, gunner17, gunner16);
        //if 3 gunners, start here and go all the way down
        case (15):
            let gunner15 = new Gunner(gunnerRandomX[14], gunnerRandomY[14]);
            let gunner14 = new Gunner(gunnerRandomX[13], gunnerRandomY[13]);
            let gunner13 = new Gunner(gunnerRandomX[12], gunnerRandomY[12]);
            let gunner12 = new Gunner(gunnerRandomX[11], gunnerRandomY[11]);
            let gunner11 = new Gunner(gunnerRandomX[10], gunnerRandomY[10]);
            let gunner10 = new Gunner(gunnerRandomX[9], gunnerRandomY[9]);
            let gunner9 = new Gunner(gunnerRandomX[8], gunnerRandomY[8]);
            let gunner8 = new Gunner(gunnerRandomX[7], gunnerRandomY[7]);
            let gunner7 = new Gunner(gunnerRandomX[6], gunnerRandomY[6]);
            let gunner6 = new Gunner(gunnerRandomX[5], gunnerRandomY[5]);
            let gunner5 = new Gunner(gunnerRandomX[4], gunnerRandomY[4]);
            let gunner4 = new Gunner(gunnerRandomX[3], gunnerRandomY[3]);
            let gunner3 = new Gunner(gunnerRandomX[2], gunnerRandomY[2]);
            let gunner2 = new Gunner(gunnerRandomX[1], gunnerRandomY[1]);
            let gunner1 = new Gunner(gunnerRandomX[0], gunnerRandomY[0]);
            manyGunners.push(gunner15, gunner14, gunner13, gunner12, gunner11, 
                            gunner10, gunner9, gunner8, gunner7, gunner6, 
                            gunner5, gunner4, gunner3, gunner2, gunner1);
            break;
        //if invalid number of gunners
        default:
            console.log("ERROR: INVALID NUMBER OF GUNNERS");
            console.log(numGunners);
            break;
    }
}

//render gunners
function renderGunners()
{
    //for each bunker
    manyGunners.forEach(oneGunner =>
    {
        //draw the gunner
        //ctx.drawImage(gunnerImage, oneGunner.x, oneGunner.y, 100, 50);
        
        //gunner as half circle
        ctx.beginPath();
        ctx.fillStyle = "brown";
        ctx.arc(oneGunner.x, oneGunner.y, 17, Math.PI, 0);
        ctx.closePath();
        ctx.fill();    
        
    });
}


//SET UP AND RUN GAME ------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() 
{
    console.log("DOM Loaded");

    document.addEventListener("keydown", function (e) 
    {
        keys[e.keyCode] = true;
    });
    document.addEventListener("keyup", function (e) 
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
    //difficulty = "medium";
    //checkGameConditions();

    numBunkers = 10;
    numGunners = 90;
    //create bunkers
    createBunkers();
    //create gunners
    createGunners();

    //if time allows for it, create rockets (ammo) that comes out of bunker occasionally


    //listen for keydown event
    //document.addEventListener("keydown", player.move);

    //RUN GAME
    let runGame = setInterval(playGame, 10);    //change number for better fps, need to account for speed of game though (45)
})