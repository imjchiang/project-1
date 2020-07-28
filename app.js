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
let bunkerXSize = 100;
let bunkerYSize = 50;

let manyGunners = [];
let numGunners;
let gunnerRandomY = [];
let gunnerRandomX = [];
let gunnerXSize = 34;
let gunnerYSize = 30;

let numGunnerAmmo;
let gunnerAmmo = [];

let numBalloonAmmo;
let balloonAmmo = [];

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

//for turret image
let turretImage = document.createElement("img");
turretImage.setAttribute("id", "turret-img");
turretImage.setAttribute("src", "green-turret.png");

//for bomb image
let bombImage = document.createElement("img");
bombImage.setAttribute("id", "bomb-img");
bombImage.setAttribute("src", "balloon-bomb.png");

//store key press events
let keys = [];

//difficulty variables
let difficulty = "";



//CLASS AND OBJECT CREATION ------------------------------------------------------------------------------------------
//create Balloon
class Balloon
{
    constructor(xPos, yPos, xSize, ySize)
    {
        //positioning and size
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSize = xSize;
        this.ySize = ySize;

        //are we still good?
        this.alive = true;
        this.hitGround = 0;     //hit ground 3 times = dead

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
function Ammo(x, y, angle, fired)
{
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.fired = fired;
    //this.speed = speed;
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

    //ammo movement
    {
        gunnerAmmo.forEach(oneAmmo =>
        {
            //move it at scroll speed
            oneAmmo.x += scrollSpeed;
        })
        balloonAmmo.forEach(oneAmmo =>
        {
            //move it at scroll speed
            oneAmmo.x += scrollSpeed;
        })
    }
}

//loop backgound image
function startLoop()
{
    //console.log(iteration);
    //run background image animation and move objects
    requestAnimationFrame(loopElements);
}

//run game 
function playGame()
{
    console.log("looping yeeet");
    //clear the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    //run loop for background and moving objects
    startLoop();
    
    //render alive bunkers
    renderBunkers();
    //render gunners
    renderGunners();
    //check collision with bomb
    
    //render the player
    player.render();
    player.move();

    renderBombs();
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
            ctx.drawImage(bunkerImage, oneBunker.x, oneBunker.y, bunkerXSize, bunkerYSize);
            
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
    //create placeholder x values for gunners
    for (let i = 0; i < numGunners; i++)
    {
        gunnerRandomY[i] = 0;
    }
    //create placeholder y values for gunners
    for (let i = 1; i < numGunners + 1; i++)
    {
        gunnerRandomX[i - 1] = 0;
    }

    let invalidGunner = true;
    let i = 0;
    //check the gunner for no overlap
    while (invalidGunner || i < numGunners)
    {
        //assign random position for gunner
        gunnerRandomY[i] = (HEIGHT - Math.floor(Math.random() * (HEIGHT - 600)) - 40);
        gunnerRandomX[i] = (0.2 * WIDTH * (i + 1)) + Math.floor(Math.random() * (WIDTH / 4)) - Math.floor(Math.random() * (WIDTH / 2));
        
        //cycle through all the bunkers to check if each gunner has same position
        for (let b = 0; b < numBunkers; b++)
        {
            //if there is no gunner in the array we are accessing
            if (bunkerRandomX[b] === null || bunkerRandomY[b] === null)
            {
                //return the error statement
                console.log("ERROR: NULL BUNKER DATA");
            }

            //if gunner position collides with bunker position
            if ((gunnerRandomX[i] >= bunkerRandomX[b] && gunnerRandomX[i] <= bunkerRandomX[b] + bunkerXSize + 5) && (gunnerRandomY[i] >= bunkerRandomY[b] && gunnerRandomY[i] <= bunkerRandomY[b] + bunkerYSize + 5) || 
                (gunnerRandomX[i] + gunnerXSize + 5 >= bunkerRandomX[b] && gunnerRandomX[i] + gunnerXSize + 5 <= bunkerRandomX[b] + bunkerXSize + 5) && (gunnerRandomY[i] + gunnerYSize + 5 >= bunkerRandomY[b] && gunnerRandomY[i] + gunnerYSize + 5 <= bunkerRandomY[b] + bunkerYSize + 5) || 
                (gunnerRandomX[i] + gunnerXSize + 5 >= bunkerRandomX[b] && gunnerRandomX[i] + gunnerXSize + 5 <= bunkerRandomX[b] + bunkerXSize + 5) && (gunnerRandomY[i] >= bunkerRandomY[b] && gunnerRandomY[i] <= bunkerRandomY[b] + bunkerYSize + 5) || 
                (gunnerRandomX[i] >= bunkerRandomX[b] && gunnerRandomX[i] <= bunkerRandomX[b] + bunkerXSize + 5) && (gunnerRandomY[i] + gunnerYSize + 5 >= bunkerRandomY[b] && gunnerRandomY[i] + gunnerYSize + 5 <= bunkerRandomY[b] + bunkerYSize + 5))
            {
                //print gunner and bunker collision
                console.log("i: " + i + "; bunker: " + b + "; collision: reassign position for " + i);
                //invalid gunner
                invalidGunner = true;
                //exit for loop
                break;
            }
            //no gunner and bunker collision
            else
            {
                //valid gunner
                invalidGunner = false;
            }
        }

        //cycle through all other gunners to check if gunners have same position
        for (let g = 0; g < numGunners; g++)
        {
            //if invalid gunner set from cycling bunkers
            if (invalidGunner)
            {
                //break out to restart while loop and reassign position for same gunner
                break;
            }

            //if there is no gunner in the array we are accessing
            if (gunnerRandomX[g] === null || gunnerRandomY[g] === null)
            {
                //return the error statement
                console.log("ERROR: NULL GUNNER DATA");
            }

            //if we are not comoparing the gunner with itself
            if (i !== g)
            {
                //if gunner positions collide
                if ((gunnerRandomX[i] >= gunnerRandomX[g] && gunnerRandomX[i] <= gunnerRandomX[g] + gunnerXSize + 5) && (gunnerRandomY[i] >= gunnerRandomY[g] && gunnerRandomY[i] <= gunnerRandomY[g] + gunnerYSize + 5) || 
                    (gunnerRandomX[i] + gunnerXSize + 5 >= gunnerRandomX[g] && gunnerRandomX[i] + gunnerXSize + 5 <= gunnerRandomX[g] + gunnerXSize + 5) && (gunnerRandomY[i] + gunnerYSize + 5 >= gunnerRandomY[g] && gunnerRandomY[i] + gunnerYSize + 5 <= gunnerRandomY[g] + gunnerYSize + 5) || 
                    (gunnerRandomX[i] + gunnerXSize + 5 >= gunnerRandomX[g] && gunnerRandomX[i] + gunnerXSize + 5 <= gunnerRandomX[g] + gunnerXSize + 5) && (gunnerRandomY[i] >= gunnerRandomY[g] && gunnerRandomY[i] <= gunnerRandomY[g] + gunnerYSize + 5) || 
                    (gunnerRandomX[i] >= gunnerRandomX[g] && gunnerRandomX[i] <= gunnerRandomX[g] + gunnerXSize + 5) && (gunnerRandomY[i] + gunnerYSize + 5 >= gunnerRandomY[g] && gunnerRandomY[i] + gunnerYSize + 5 <= gunnerRandomY[g] + gunnerYSize + 5))
                {
                    //print gunner collision
                    console.log("i: " + i + "; g: " + g + "; collision: reassign position for " + i);
                    //invalid gunner
                    invalidGunner = true;
                    //exit for loop
                    break;
                }
                //if valid gunner
                else
                {
                    invalidGunner = false;
                }
            }
        //if gunner is valid after comparing with bunkers and other gunners
        }
        if (!invalidGunner)
        {
            //progress to next gunner position assignment in while loop
            i++;
        }
    }

    //check the number of gunners set according to difficulty
    switch (numGunners)
    {
        //if 90 gunners, start here and go all the way down
        case (90):
            for (let i = 89; i > 49; i--)
            {
                let newGunner = new Gunner(gunnerRandomX[i], gunnerRandomY[i]);
                manyGunners.push(newGunner);
            }
        //if 50 gunners, start here and go all the way down
        case (50):
            for (let i = 49; i > 29; i--)
            {
                let newGunner = new Gunner(gunnerRandomX[i], gunnerRandomY[i]);
                manyGunners.push(newGunner);
            }
        //if 30 gunners, start here and go all the way down
        case (30):
            for (let i = 29; i > 14; i--)
            {
                let newGunner = new Gunner(gunnerRandomX[i], gunnerRandomY[i]);
                manyGunners.push(newGunner);
            }
        //if 15 gunners, start here and go all the way down
        case (15):
            for (let i = 14; i >= 0; i--)
            {
                let newGunner = new Gunner(gunnerRandomX[i], gunnerRandomY[i]);
                manyGunners.push(newGunner);
            }
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
    // let r = 50;
    // let g = 250;
    // let b = 50;
    //for each bunker
    manyGunners.forEach(oneGunner =>
    {
        //draw the gunner
        ctx.drawImage(turretImage, oneGunner.x, oneGunner.y, gunnerXSize, gunnerYSize);

        //gunner as a rectangle
        /*
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 100)`;
        ctx.fillRect(oneGunner.x, oneGunner.y, gunnerXSize, gunnerYSize);
        r+=1.5;
        g-=5;
        b+=2
        */
    });
}

//create the bombs for the balloon
function createBombs()
{
    switch (numBalloonAmmo)
    {
        case (10):
            for (let i = 9; i > 7; i--)
            {
                let bomb = new Ammo(player.xPos, player.yPos, 270, false);
                balloonAmmo.push(bomb);
            }
        case (8):
            for (let i = 7; i > 6; i--)
            {
                let bomb = new Ammo(player.xPos, player.yPos, 270, false);
                balloonAmmo.push(bomb);
            }
        case (7):
            for (let i = 6; i > 4; i--)
            {
                let bomb = new Ammo(player.xPos, player.yPos, 270, false);
                balloonAmmo.push(bomb);
            }
        case (5):
            for (let i = 4; i >= 0; i--)
            {
                let bomb = new Ammo(player.xPos, player.yPos, 270, false);
                balloonAmmo.push(bomb);
            }
            break;
        default:
            console.log("ERROR: INVALID NUMBER OF BOMBS");
            console.log(numBalloonAmmo);
            break;
    }
}

//render bombs for balloon
function renderBombs()
{
    //for each bomb
    balloonAmmo.forEach(oneAmmo =>
    {
        //draw the gunner
        ctx.drawImage(bombImage, oneAmmo.x, oneAmmo.y, 15, 15);

        //gunner as a rectangle
        /*
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 100)`;
        ctx.fillRect(oneGunner.x, oneGunner.y, gunnerXSize, gunnerYSize);
        r+=1.5;
        g-=5;
        b+=2
        */
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
    player = new Balloon(150, 100, 70, 120);
    //create bombs for player
    numBalloonAmmo = 10;
    createBombs();


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
    let runGame = setInterval(playGame, 45);    //change number for better fps, need to account for speed of game though (45)
})