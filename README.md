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

###### The following are the two canvases that were used for the rendering of the game in the grid
```HTML
<main class="canvas">
    <canvas id="game-background"><!-- set scrolling background --></canvas>
    <canvas id="game"><!-- play game --></canvas>   
</main>
```
- The ```game-background``` canvas and the ```game``` canvas are rendered on the grid

### CSS
- 


### Be aware...
MVP needs to be done on Wednesday.