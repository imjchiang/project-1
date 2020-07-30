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

//for player object creation
let player;
let balloonGround = 155;
let hitboxRadius = 34;
let xAlignment = hitboxRadius + 0.9;
let yAlignment = hitboxRadius + 1.4;

//for bunker object creation
let manyBunkers = [];
let numBunkers;
let bunkerRandomY = [];
let bunkerRandomX = [];
let bunkerXSize = 100;
let bunkerYSize = 50;
let bunkerRadius = 40;

//for gunner object creation
let manyGunners = [];
let numGunners;
let gunnerRandomY = [];
let gunnerRandomX = [];
let gunnerXSize = 34;
let gunnerYSize = 30;

//for gunner ammo object creation
let numGunnerAmmo = 10;
let gunnerAmmo = [];
let bulletXSize = 10;
let bulletYSize = 10;

//for player ammo object creation
let numBalloonAmmo;
let balloonAmmo = [];
let bombIndex = 0;
let bombSize = 15;
let bombRadius = 7;

//for background image scrolling
let backgroundImage = document.createElement("img");
backgroundImage.setAttribute("id", "background-img");
backgroundImage.setAttribute("src", "8bit-background.jpg");
let backgroundXPos = 0;
let scrollSpeed = -5;

//for balloon image
let balloonImage = document.createElement("img");
balloonImage.setAttribute("id", "balloon-img");
balloonImage.setAttribute("src", "8bit-balloon.png");

//for dead balloon image
let deadBalloonImage = document.createElement("img");
deadBalloonImage.setAttribute("id", "balloon-img");
deadBalloonImage.setAttribute("src", "8bit-balloon.png");

//for bunker image
let bunkerImage = document.createElement("img");
bunkerImage.setAttribute("id", "bunker-img");
bunkerImage.setAttribute("src", "bunker-on-hill.png");

//for dead bunker image
let deadBunkerImage = document.createElement("img");
bunkerImage.setAttribute("id", "bunker-img");
//bunkerImage.setAttribute("src", "bunker-on-hill.png");

//for turret image
let turretImage = document.createElement("img");
turretImage.setAttribute("id", "turret-img");
turretImage.setAttribute("src", "green-turret.png");

//for bomb image
let bombImage = document.createElement("img");
bombImage.setAttribute("id", "bomb-img");
bombImage.setAttribute("src", "balloon-bomb.png");

//for exploded bomb image
let explodedBombImage = document.createElement("img");
bombImage.setAttribute("id", "bomb-img");
//bombImage.setAttribute("src", "balloon-bomb.png");

//for bullet image
let bulletImage = document.createElement("img");
bulletImage.setAttribute("id", "bullet-img");
bulletImage.setAttribute("src", "bullet.png");

//for no bullet image
let noBulletImage = document.createElement("img");
noBulletImage.setAttribute("id", "bullet-img");
//noBulletImage.setAttribute("src", "bullet.png");

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
        this.deadY = 1;

        //are we still good?
        this.alive = true;
        this.hitGround = 0;     //hit ground 3 times = dead
        this.weAreHit = 0;

        //movement
        this.velX = 0;
        this.velY = 0;
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
            this.velY -= 1.5;
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
            this.velX += 1.5;
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
        if (this.alive)
        {
            ctx.drawImage(balloonImage, this.xPos, this.yPos, this.xSize, this.ySize);
        }
        else
        {
            ctx.drawImage(deadBalloonImage, this.xPos, this.yPos, this.xSize, this.ySize);
            keys = null;
        }
        
        //help with hitbox for balloon
        //insert painted hitboxes here if needed
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
function Ammo(x, y, angle, fired, speed)
{
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.fired = fired;
    this.speed = speed;
    this.exploded = false;
    this.countdown;

    //movement
    this.velX = 0;
    this.velY = 0;
    this.drag = 0.85;
}



//FUNCTIONS ----------------------------------------------------------------------------------------------------------
//need to add button click listener
function checkGameConditions()
{
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
        //for each array of bullets
        for (let i = 0; i < gunnerAmmo.length; i++)
        {
            //for each bullet
            gunnerAmmo[i].forEach(eachBullet =>
            {
                if (eachBullet !== undefined)
                {
                    //move it at scroll speed
                    eachBullet.x += scrollSpeed;
                    if (eachBullet.x <= WIDTH * 2.5)
                    {
                        eachBullet.countdown--;
                    }
                    if (eachBullet.fired)
                    {
                        eachBullet.x += scrollSpeed;
                        eachBullet.y += scrollSpeed;
                    }
                }
            });
        }
        //for each bomb
        balloonAmmo.forEach(oneAmmo =>
        {
            //if bomb has been fired
            if (oneAmmo.fired)
            {
                //move it at scroll speed
                oneAmmo.x += scrollSpeed;
            }
        })
    }

    //player movement only when dead
    {
        if (!player.alive)
        {
            player.xPos += scrollSpeed;
            player.yPos += player.deadY * 1.75;
            player.deadY++;
            if (player.yPos > HEIGHT - balloonGround - 120)
            {
                player.yPos = HEIGHT - balloonGround - 120;
            }
            //scrollSpeed *= 0.98;
        }
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
    
    //check collision with bomb
    bombHit();

    //render alive bunkers
    renderBunkers();
    //render gunners
    renderGunners();
    
    //render bullets
    renderBullets();

    //render the player and move player
    player.render();
    player.move();

    //check collision with bullet
    bulletHit();

    //render bombs and move them
    renderBombs();
    moveBombs();
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
        bunkerRandomX[i - 1] = (1.5 * WIDTH * i) + Math.floor(Math.random() * (WIDTH / 4)) - Math.floor(Math.random() * (WIDTH / 2)) + WIDTH * 1.5;
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
            
            //help determine hitbox for bunker
            //insert painted hitboxes here if needed
        }
        else
        {
            //move bunker object away
            oneBunker.x -= WIDTH * 2;
            let deadBunker = oneBunker.x + WIDTH * 2;
            //show destroyed bunker image
            ctx.drawImage(deadBunkerImage, deadBunker, oneBunker.y, bunkerXSize, bunkerYSize);
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
        gunnerRandomX[i] = (0.2 * WIDTH * (i + 1)) + Math.floor(Math.random() * (WIDTH / 4)) - Math.floor(Math.random() * (WIDTH / 2)) + WIDTH * 1.5;
        
        //cycle through all the bunkers to check if each gunner has same position
        for (let b = 0; b < numBunkers; b++)
        {
            //if there is no gunner in the array we are accessing
            if (bunkerRandomX[b] === null || bunkerRandomY[b] === null || bunkerRandomX[b] === undefined || bunkerRandomY[b] === undefined)
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
                //console.log("i: " + i + "; bunker: " + b + "; collision: reassign position for " + i);
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
                    //console.log("i: " + i + "; g: " + g + "; collision: reassign position for " + i);
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
        //insert painted hitboxes here if needed
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
                let bomb = new Ammo(player.xPos + (player.xSize / 2 - 15), player.yPos + (player.ySize - 25), 270, false, 1);
                balloonAmmo.push(bomb);
            }
        case (8):
            for (let i = 7; i > 6; i--)
            {
                let bomb = new Ammo(player.xPos + (player.xSize / 2 - 15), player.yPos + (player.ySize - 25), 270, false, 1);
                balloonAmmo.push(bomb);
            }
        case (7):
            for (let i = 6; i > 4; i--)
            {
                let bomb = new Ammo(player.xPos + (player.xSize / 2 - 15), player.yPos + (player.ySize - 25), 270, false, 1);
                balloonAmmo.push(bomb);
            }
        case (5):
            for (let i = 4; i >= 0; i--)
            {
                let bomb = new Ammo(player.xPos + (player.xSize / 2 - 15), player.yPos + (player.ySize - 25), 270, false, 1);
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
    balloonAmmo.forEach(oneBomb =>
    {
        //if bomb has exploded
        if (oneBomb.exploded)
        {
            ctx.drawImage(explodedBombImage, oneBomb.x, oneBomb.y, bombSize, bombSize);  
        }
        //if bomb has been fired
        else if (oneBomb.fired)
        {
            //draw the bomb
            ctx.drawImage(bombImage, oneBomb.x, oneBomb.y, bombSize, bombSize);
            
            //help determine hitbox for bombs
            //insert painted hitboxes here if needed
        }
    });
}

//move bombs according to gravity
function moveBombs()
{
    //for each bomb
    balloonAmmo.forEach(oneBomb =>
    {
        //if bomb has been fired
        if (oneBomb.fired)
        {
            //move bomb down according to gravity
            oneBomb.y += 0.98 * oneBomb.speed;
            oneBomb.speed++;
            //console.log(bombIndex);
        }
        //if bomb hasn't been fired
        else
        {
            //move bomb up with balloon when "w" or "arrow up" pressed
            if (keys[38] || keys[87])
            {
                oneBomb.velY -= 1.5;
            }
            //move bomb up with balloon when "s" or "arrow down" pressed
            if (keys[40] || keys[83])
            {
                oneBomb.velY += 3;
            }
            //move bomb up with balloon when "a" or "arrow left" pressed
            if (keys[37] || keys[65])
            {
                oneBomb.velX -= 2;
            }
            //move bomb up with balloon when "d" or "arrow right" pressed
            if (keys[39] || keys[68])
            {
                oneBomb.velX += 1.5;
            }

            //decceleration based on drag coefficient
            oneBomb.velX *= oneBomb.drag;
            oneBomb.velY *= oneBomb.drag;

            //position change based on velocity change
            oneBomb.x += oneBomb.velX;
            oneBomb.y += oneBomb.velY;

            player.yPos + (player.ySize - 25)

            //in bounds x axis
            if (oneBomb.x > WIDTH - player.xSize / 2 - 15)
            {
                oneBomb.x = WIDTH - player.xSize / 2 - 15;
            }
            else if (oneBomb.x < (player.xSize / 2 - 15))
            {
                oneBomb.x = player.xSize / 2 - 15;
            }

            //in bounds y axis
            if (oneBomb.y > HEIGHT - balloonGround - player.ySize + 95)
            {
                oneBomb.y = HEIGHT - balloonGround - player.ySize + 95;
            }
            else if (oneBomb.y < (player.ySize - 25))
            {
                oneBomb.y = (player.ySize - 25);
            }
        }
    })
}

//sets bomb fired to true
function bombFired()
{
    let oneBomb = balloonAmmo[bombIndex];
    if (oneBomb !== undefined && oneBomb !== null)
    {
        oneBomb.fired = true;
        bombIndex++;
    }
    else
    {
        console.log("You are out of bombs!!");
    }
}

function bombHit()
{
    //for each bomb
    balloonAmmo.forEach(oneBomb =>
    {
        //for each bunker
        manyBunkers.forEach(oneBunker =>
        {
            //difference in x between bunker circle and bomb circle
            let dx = (oneBunker.x + bunkerXSize / 2 + 4) - (oneBomb.x + bombSize / 2 + 4);
            //difference in y between bunker circle and bomb circle
            let dy = (oneBunker.y + bunkerYSize - 6) - (oneBomb.y + bombSize - 6);
            //distance between two objects
            let distance = Math.sqrt((dx * dx) + (dy * dy));

            if (distance <= bunkerRadius + bombRadius)
            {
                console.log("EXPLOSION");
                //bomb explosion
                //bunker explosion
                //bomb image gone
                oneBomb.exploded = true;
                //bunker alive false
                oneBunker.alive = false;
            }
        });
    });
}

function createBullets()
{
    for (let g = 0; g < numGunners; g++)
    {
        let eachGunner = [];
        for (let i = 0; i < numGunnerAmmo; i++)
        {
            let bullet = new Ammo(manyGunners[g].x, manyGunners[g].y, 135, false, 1);
            bullet.countdown = i * (Math.floor(Math.random() * 10) + 65);
            eachGunner.push(bullet);
            //console.log("gunner: " + g + "has " + i + " bullet");
        }
        gunnerAmmo.push(eachGunner);
    }
}

function renderBullets()
{
    //for each bullet
    for (let i = 0; i < gunnerAmmo.length; i++)
    {
        for (let j = gunnerAmmo[i].length - 1; j >= 0; j--)
        {
            let eachBullet = gunnerAmmo[i][j];
            if (eachBullet.x >= 0 || eachBullet.y >= 0)
            {
                if (eachBullet.exploded)
                {
                    player.weAreHit++;
                    if (player.weAreHit >= 3)
                    {
                        player.alive = false;
                        console.log("WE ARE DEAD");
                    }
                    eachBullet.x = -20;
                    eachBullet.y = -20;
                    ctx.drawImage(noBulletImage, eachBullet.x, eachBullet.y, bulletXSize, bulletYSize);
                }
                else if (eachBullet.x <= WIDTH * 2 && eachBullet.countdown <= 0)
                {
                    ctx.drawImage(bulletImage, eachBullet.x, eachBullet.y, bulletXSize, bulletYSize);
                    
                    //bullet hitbox helper
                    //insert painted hitboxes here if needed
                    
                    eachBullet.fired = true;
                    //console.log("Firing string of bullets: " + i + "bullet: " + j);
                }
            }
        }
    }
}

function bulletHit()
{
    for (let i = 0; i < gunnerAmmo.length; i++)
    {
        gunnerAmmo[i].forEach(eachBullet =>
        {
            //main circle portion of hitbox
            //difference in x between main balloon circle and bullet circle
            let dx = (player.xPos + xAlignment) - (eachBullet.x + bulletXSize / 2);
            //difference in y between main balloon circle and bullet circle
            let dy = (player.yPos + yAlignment) - (eachBullet.y + bulletYSize / 2);
            //distance between main balloon circle and bullet
            let distance = Math.sqrt((dx * dx) + (dy * dy));
            //if collision
            if (distance < hitboxRadius + bulletXSize / 2)
            {
                console.log("BULLET HIT!");
                eachBullet.exploded = true;
            }


            //triangle replacement circle 1 portion of hitbox
            //difference in x between triangle replacement balloon circle 1 and bullet circle
            let dx1 = (player.xPos + xAlignment) - (eachBullet.x + bulletXSize / 2);
            //difference in y between triangle replacement balloon circle 1 and bullet circle
            let dy1 = (player.yPos + yAlignment + 20) - (eachBullet.y + bulletYSize / 2);
            //distance between triangle replacement balloon circle 1 and bullet
            let distance1 = Math.sqrt((dx1 * dx1) + (dy1 * dy1));
            //if collision
            if (distance1 < hitboxRadius * 0.70 + bulletXSize / 2)
            {
                console.log("TRIANGLE REPLACEMENT 1 BULLET HIT!");
                eachBullet.exploded = true;
            }

            //triangle replacement circle 2 portion of hitbox
            //difference in x between triangle replacement balloon circle 1 and bullet circle
            let dx2 = (player.xPos + xAlignment) - (eachBullet.x + bulletXSize / 2);
            //difference in y between triangle replacement balloon circle 1 and bullet circle
            let dy2 = (player.yPos + yAlignment + 35) - (eachBullet.y + bulletYSize / 2);
            //distance between triangle replacement balloon circle 1 and bullet
            let distance2 = Math.sqrt((dx2 * dx2) + (dy2 * dy2));
            //if collision
            if (distance2 < hitboxRadius * 0.47 + bulletXSize / 2)
            {
                console.log("TRIANGLE REPLACEMENT 2 BULLET HIT!");
                eachBullet.exploded = true;
            }
            
            //triangle replacement circle 3 portion of hitbox
            //difference in x between triangle replacement balloon circle 1 and bullet circle
            let dx3 = (player.xPos + xAlignment) - (eachBullet.x + bulletXSize / 2);
            //difference in y between triangle replacement balloon circle 1 and bullet circle
            let dy3 = (player.yPos + yAlignment + 45) - (eachBullet.y + bulletYSize / 2);
            //distance between triangle replacement balloon circle 1 and bullet
            let distance3 = Math.sqrt((dx3 * dx3) + (dy3 * dy3));
            //if collision
            if (distance3 < hitboxRadius * 0.35 + bulletXSize / 2)
            {
                console.log("TRIANGLE REPLACEMENT 3 BULLET HIT!");
                eachBullet.exploded = true;
            }

            //triangle replacement circle 4 portion of hitbox
            //difference in x between triangle replacement balloon circle 1 and bullet circle
            let dx4 = (player.xPos + xAlignment) - (eachBullet.x + bulletXSize / 2);
            //difference in y between triangle replacement balloon circle 1 and bullet circle
            let dy4 = (player.yPos + yAlignment + 55) - (eachBullet.y + bulletYSize / 2);
            //distance between triangle replacement balloon circle 1 and bullet
            let distance4 = Math.sqrt((dx4 * dx4) + (dy4 * dy4));
            //if collision
            if (distance4 < hitboxRadius * 0.22 + bulletXSize / 2)
            {
                console.log("TRIANGLE REPLACEMENT 4 BULLET HIT!");
                eachBullet.exploded = true;
            }

            //triangle replacement circle 5 portion of hitbox
            //difference in x between triangle replacement balloon circle 1 and bullet circle
            let dx5 = (player.xPos + xAlignment) - (eachBullet.x + bulletXSize / 2);
            //difference in y between triangle replacement balloon circle 1 and bullet circle
            let dy5 = (player.yPos + yAlignment + 60) - (eachBullet.y + bulletYSize / 2);
            //distance between triangle replacement balloon circle 1 and bullet
            let distance5 = Math.sqrt((dx5 * dx5) + (dy5 * dy5));
            //if collision
            if (distance5 < hitboxRadius * 0.17 + bulletXSize / 2)
            {
                console.log("TRIANGLE REPLACEMENT 5 BULLET HIT!");
                eachBullet.exploded = true;
            }

            
            //upper bottom circle portion of hitbox
            //difference in x between upper bottom balloon circle and bullet circle
            let dx6 = (player.xPos + xAlignment) - (eachBullet.x + bulletXSize / 2);
            //difference in y between upper bottom balloon circle and bullet circle
            let dy6 = (player.yPos + 105) - (eachBullet.y + bulletYSize / 2);
            //distance between upper bottom balloon circle and bullet
            let distance6 = Math.sqrt((dx6 * dx6) + (dy6 * dy6));
            //if collision
            if (distance6 < 8 + bulletXSize / 2)
            {
                console.log("UPPER BOTTOM BULLET HIT!");
                eachBullet.exploded = true;
            }

            //lower bottom circle portion of hitbox
            //difference in x between lower bottom balloon circle and bullet circle
            let dx7 = (player.xPos + xAlignment) - (eachBullet.x + bulletXSize / 2);
            //difference in y between lower bottom balloon circle and bullet circle
            let dy7 = (player.yPos + 111) - (eachBullet.y + bulletYSize / 2);
            //distance between lower bottom balloon circle and bullet
            let distance7 = Math.sqrt((dx7 * dx7) + (dy7 * dy7));
            //if collision
            if (distance7 < 9 + bulletXSize / 2)
            {
                console.log("LOWER BOTTOM BULLET HIT!");
                eachBullet.exploded = true;
            }
        });
    }
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
        if (e.keyCode === 32)
        {
            bombFired();
        }
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
    
    //button click listener?
    //difficulty = "medium";
    //checkGameConditions();

    numBunkers = 10;
    numGunners = 90;
    //create bunkers
    createBunkers();
    //create gunners
    createGunners();

    //create array of ammo for gunners
    createBullets();

    //if time allows for it, create rockets (ammo) that comes out of bunker occasionally


    //listen for keydown event
    //document.addEventListener("keydown", player.move);

    //RUN GAME
    let runGame = setInterval(playGame, 45);    //change number for better fps, need to account for speed of game though (45)
})


