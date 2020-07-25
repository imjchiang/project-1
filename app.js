let game;
let ctx;
let player;


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
        ctx.clearRect(0, 0, game.width, game.height);
        ctx.fillStyle = "purple";
        ctx.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, 0);
        ctx.fill();
    }
}

//create Bunker
function Bunker(x, y, rockets)
{
    this.x = x;
    this.y = y;
    this.rockets = rockets;     //not essential
    this.render = function()
    {

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

//add gravity

//global movement (not balloon)

//run game 
const playGame = () =>
{
    console.log("looping yeeet");
    //clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    //ctx.fillStyle = "rgba(0, 0, 0, 0)";
    //ctx.fillRect(0, 0, game.width, game.height);

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
    
    //CANVAS CONFIGS
    game.setAttribute("height", 700);
    game.setAttribute("width", 1200);
    ctx = game.getContext("2d");

    //character refs
    //create Player
    //maxBombs depends on difficulty level
    player = new Balloon(20, "circle", 400, 100, 5);
    //create array of gunners
        //create array of ammo for gunners
    //create array of bunkers
        //if time allows for it, create array of ammo (rockets) that comes out of bunker occasionally


    //listen for keydown event
    document.addEventListener("keydown", player.move);

    //RUN GAME
    let runGame = setInterval(playGame, 60);
})