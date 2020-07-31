# Bomb Dropper
You are flying in a hot air balloon and performing a strategic reconnaissance mission in which you need to avoid all the anti-aircraft weaponry. You must hit the bunkers in order to immobilize the enemies defenses and not doing so will result in a failed mission

# Code Explained...
### HTML
- In HTML, we designated many series of ```divs``` and nested ```divs```. This is done so that we can use the many different ```divs``` in the grid we manipulate in CSS.
- We were also able to attach our canvases on the HTML which is where the game interface is

###### The following are a few examples of divs that were used for different boxes in the grid
```HTML
<div id="controls">
    <h4>Controls:</h4>
    <p>"w" or "up" = up</p>
    <p>"s" or "down" = down</p>
    <p>"a" or "left" = left</p>
    <p>"d" or "right" = right</p>
    <p>"space" = drop bombs</p>
</div>
```
- Here we have a ```h4``` indicating the title of the grid box and a series of ```p``` elements that hold texts to be displayed

```HTML
<div id="health">
    Health 
    <img id="health-bar" src="pictures/health/full-health-bar.png">
</div>
```
- Here is another example where the ```img``` for the health bar is displayed on the grid

```HTML
<div id="start">
    <button id="start-button">START GAME</button>    
</div>
```
- This is an example of a button being displayed on the grid

###### The following are the three canvases that were used for the rendering of the game in the grid
```HTML
<main class="canvas">
    <canvas id="game-background"><!-- set scrolling background --></canvas>
    <canvas id="game"><!-- play game --></canvas>   
    <canvas id="tutorial"><!-- show tutorial image --></canvas>
</main>
```
- The ```game-background``` canvas, ```game``` canvas, and ```tutorial``` canvas are rendered on the grid

### CSS
- In CSS, we imported a gamey font for the game and organized and styled the grids, canvases, text, and images.

###### The following is the importing of the font and the use of the font
```CSS
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

body
{
    font-family: "VT323";
    ...
}
```
- The font from the font family VT323 was imported from google and applied to the entire body.



###### The following are a few examples of organizing and styling the grids
```CSS
.grid-container 
{
    display: grid;
    grid-template-columns: 20vw auto auto auto auto 10vw;
    grid-template-rows: auto auto auto auto auto auto;
    grid-gap: 10px;
    background-color: black;
    border: 10px solid black;
    width: 100%;
    height: 100%;
}
```
- Here the grid is set up to have 6 columns and 6 rows
- Some column and row dimensions are specified while others are automatically set
- Styling of the grid is done here also

```CSS
.canvas 
{
    grid-area: 2 / 2 / 6 / 6;
    position: relative;
    min-width: 659px;
    min-height: 425px;
}
```
- Here the grid area of the canvases are set to a specific set of grid boxes of the grid.

###### The following are a few examples of how different texts, images, and the game itself were styled in the grid
```CSS
canvas#game-background
{
    position: absolute;
    width: 100%;
    height: 100%;
}

canvas#game
{
    position: absolute;
    height: 100%;
    width: 100%;
}

canvas#tutorial
{
    position: absolute;
    height: 100%;
    width: 100%;
}
```
- Here the canvases which contain the game were set to have a position of absolute so they would overlap one another on the grid

```CSS
h1
{
    padding: 0;
    margin: 0;
}

h4
{
    margin-top: 0;
    margin-bottom: 15px;
}

p
{
    padding-top: 10px;
    font-size: 20px;
}
```
- Here the text was styled to have certain font sizes, different margins, and different padding

```CSS
#health
{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    grid-area: 6 / 2 / 7 / 4;
}

#health-bar
{
    width: 10vw;
    padding-left: 10px;
}
```
- Here the health bar is positioned and styled

```CSS
#start-button
{
    font-size: 35px;
    font-family: "VT323";
    padding: 0 5px 0 5px; 
    margin: 0 20px 0 20px;
    background-color: white;
    color: rgb(131, 218, 131);
}
```
- Here is the styling of the start button for the game


### Javascript
- A bunch of variables were declared at the beginning to ensure the global scope of all the variables that need to have a global scope
- Mainly used for the creation of the different objects in game, the logic behind movement of the objects, and win and losing conditions.

###### The following are a few examples of the creation of an image that is to be used for the object

```javascript
let balloonImage = document.createElement("img");
balloonImage.setAttribute("id", "balloon-img");
balloonImage.setAttribute("src", "pictures/balloon/8bit-balloon.png");
```
- This was used to create the image of the balloon

```javascript
let turretImage = document.createElement("img");
turretImage.setAttribute("id", "turret-img");
turretImage.setAttribute("src", "pictures/enemies/green-turret.png");
```
- This was used to create the image of the turret

###### The following is an example of an object constructor for the game
```javascript
function Bunker(x, y)//, rockets)
{
    this.x = x;
    this.y = y;
    this.alive = true;
}
```
- The bunker object uses this constructor

#### Functions
- Many functions wwere used in order to start the game, loop different movement, create objects, render objects, and determine hitboxes

###### The following are examples of functions used in order to create and render objects

```javascript
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
```
- This function was used to create the bullets that were to be shot by the turrets
- Here we used a 2 dimensional array which is an array that stores arrays that stores bullet objects

```javascript
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
                if (!player.alive || winCondition)
                {
                    if (eachBullet.x >=0 && eachBullet.y >= 0 && eachBullet.x <= WIDTH && eachBullet.y <= HEIGHT && eachBullet.countdown <= 0)
                    {
                        ctx.drawImage(bulletImage, eachBullet.x, eachBullet.y, bulletXSize, bulletYSize);
                        eachBullet.fired = true;
                    }
                    else
                    {
                        eachBullet.x = -50;
                        eachBullet.y = -50;
                        ctx.drawImage(noBulletImage, eachBullet.x, eachBullet.y, bulletXSize, bulletYSize);
                        eachBullet.fired = false;
                    }
                }
                else if (eachBullet.exploded)
                {
                    player.weAreHit++;
                    if (player.weAreHit >= 3)
                    {
                        winCondition = false;
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
```
- This is the bullet rendering function in which it checks for several conditions before it decides whether or not it should render the bullet image and where it should render it.
- There are also checks to make sure that the bullet is on the game screen. If it isn't then it is not rendered so that we can save time and make the code more efficient to run.

###### The following are the functions used in order to loop the movement of the background and different objects
```javascript
function startLoop()
{
    //run background image animation and move objects in a loop
    requestAnimationFrame(loopElements);
}

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
                    if (!player.alive)
                    {
                        eachBullet.x += tempScroll - scrollSpeed;
                        eachBullet.y += tempScroll - scrollSpeed;
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
            scrollSpeed *= 0.98;
        }
    }
}
```

###### The following contains the logic on how player movement was done
```javascript
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
```
- These event listeners help determine whether or not a key was pressed.
- The pressed keys were stored in an array so that multiple key presses could be determined at the same time.

```javascript
move()
{
    if (keys !== null)
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
    }

    //decceleration based on drag coefficient
    this.velX *= this.drag;
    this.velY *= this.drag;

    //position change based on velocity change
    this.xPos += this.velX;
    this.yPos += this.velY;

    if (winCondition === undefined || winCondition === true)
    {
        //in bounds x axis
        if (this.xPos > WIDTH - 70)
        {
            this.xPos = WIDTH - 70;
        }
        else if (this.xPos < 0)
        {
            this.xPos = 0;
        }
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
```
- This is the move function of the player in which it accounts for the key presses and the movements they are associated with
- Changes in position were determined by the variance in the changes of velocity which were determined through the key presses
- A drag coeffcient was added in order to make it look like there is inertia
- Boundaries were checked in order to make sure that the player stayed within the game canvas

###### The following function was used to determine whether or not the game was over
```javascript
function gameOver()
{
    if (!player.alive)
    {
        document.getElementById("health-bar").setAttribute("src", "pictures/health/no-health-bar.png");

        ctx.font = "150px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("YOU LOSE", WIDTH / 2, HEIGHT / 2);

        ctx.strokeStyle = "black"
        ctx.lineWidth = 5;
        ctx.strokeTextAlign = "center"
        ctx.strokeText("YOU LOSE", WIDTH / 2, HEIGHT / 2);
    }
    let totalBunkersDead = 0;
    manyBunkers.forEach(oneBunker =>
    {
        if (!oneBunker.alive)
        {
            totalBunkersDead++;
        }
        if (totalBunkersDead === numBunkers)
        {
            ctx.font = "150px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("YOU WIN!!!", WIDTH / 2, HEIGHT / 2);

            ctx.strokeStyle = "black"
            ctx.lineWidth = 5;
            ctx.strokeTextAlign = "center"
            ctx.strokeText("YOU WIN!!!", WIDTH / 2, HEIGHT / 2);

            winCondition = true;
        }
    });
}
```
- This function took into account the different conditions that need to be met in order for the game to be over and sends those conditions to the different rendering functions to stop certain rendering of objects and movement of objects

#### Buttons
- A restart and start button were created to restart and start the game.

###### The following are examples and snippets of how the restart and start were triggered and what they do.

```javascript
document.getElementById("restart-button").addEventListener("click", function()
{
    clearInterval(runGame);

    ctxTutorial.drawImage(tutorialImage, 0, 0, WIDTH, HEIGHT);
    ctxTutorial.font = "150px Arial";
    ctxTutorial.fillStyle = "yellow";
    ctxTutorial.textAlign = "center";
    ctxTutorial.fillText("PRESS START", WIDTH / 2, HEIGHT / 2);

    //for player object creation
    balloonGround = 155;
    hitboxRadius = 34;
    xAlignment = hitboxRadius + 0.9;
    yAlignment = hitboxRadius + 1.4;

    //for bunker object creation
    manyBunkers = [];
    bunkerRandomY = [];
    bunkerRandomX = [];

    ...

    player = new Balloon(150, 100, 70, 120);
    //create bombs for player
    numBalloonAmmo = 10;
    createBombs();
    bombsLeft = numBalloonAmmo;

    numBunkers = 5;
    liveBunkers = numBunkers;

    numGunners = 90;
    //create bunkers
    createBunkers();
    //create gunners
    createGunners();

    //create array of ammo for gunners
    createBullets();
});
```
- This is the restart function
- It stops the game that being run, if there is one at all
- It resets all the variables that were called throughout the program so they can start from their original state (these are all global scope variables)
- It calls the different initialization functions in order to restart the set up for the game

```javascript
document.getElementById("start-button").addEventListener("click", function()
    {
        ctxTutorial.clearRect(0, 0, WIDTH, HEIGHT);
        if (runGame === undefined || runGame === null)
        {
            runGame = setInterval(playGame, 45);
        }
        else
        {
            clearInterval(runGame);
            runGame = setInterval(playGame, 45);
        }
    });
```
- This is the code for the start button
- Here the start button is used to run the game
- It checks for previously run games and cancels the intervals being used to run them if necessary.

###### The following is an example of hitbox detection used in this game
```javascript
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
```
- Manny different circles that overlapped were used for hitboxes that would be close to the actual shape.
- This uses the distance formula in order to ensure that the bullets (circular) are not overlapping with the ballon (an object composed of many circular hitboxes)


### Be aware...
MVP needs to be done on Wednesday.