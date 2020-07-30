# Painted Hitboxes
- found in the render function of each object

## Balloon Hitbox Painted
```javascript
//main circle portion of hitbox
ctx.beginPath();
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.arc(this.xPos + xAlignment, this.yPos + yAlignment, hitboxRadius, 2 * Math.PI, 0);
ctx.closePath();
ctx.fill();

//triangle replacement circle 1 portion of hitbox
ctx.beginPath();
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.arc(this.xPos + xAlignment, this.yPos + yAlignment + 20, hitboxRadius * 0.70, 2 * Math.PI, 0);
ctx.closePath();
ctx.fill();

//triangle replacement circle 2 portion of hitbox
ctx.beginPath();
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.arc(this.xPos + xAlignment, this.yPos + yAlignment + 35, hitboxRadius * 0.47, 2 * Math.PI, 0);
ctx.closePath();
ctx.fill();

//triangle replacement circle 3 portion of hitbox
ctx.beginPath();
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.arc(this.xPos + xAlignment, this.yPos + yAlignment + 45, hitboxRadius * 0.35, 2 * Math.PI, 0);
ctx.closePath();
ctx.fill();

//triangle replacement circle 4 portion of hitbox
ctx.beginPath();
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.arc(this.xPos + xAlignment, this.yPos + yAlignment + 55, hitboxRadius * 0.22, 2 * Math.PI, 0);
ctx.closePath();
ctx.fill();

//triangle replacement circle 5 portion of hitbox
ctx.beginPath();
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.arc(this.xPos + xAlignment, this.yPos + yAlignment + 60, hitboxRadius * 0.17, 2 * Math.PI, 0);
ctx.closePath();
ctx.fill();

// //main triangle portion of hitbox
// ctx.beginPath();
// ctx.fillStyle = "rgba(0, 0, 0, 0)";
// ctx.moveTo(this.xPos, (this.yPos + (hitboxRadius * 1.2)));
// ctx.lineTo((this.xPos + xAlignment), (this.yPos + 100));
// ctx.lineTo((this.xPos + (xAlignment * 2)), (this.yPos + (hitboxRadius * 1.2)));
// ctx.closePath();
// ctx.fill();
// //secondary triangle portion of hitbox
// ctx.beginPath();
// ctx.fillStyle = "rgba(0, 0, 0, 0)";
// ctx.moveTo((this.xPos + (hitboxRadius * 0.48)), (this.yPos + (hitboxRadius * 2)));
// ctx.lineTo((this.xPos + (xAlignment * 1)), (this.yPos + 107));
// ctx.lineTo((this.xPos + (xAlignment * 1.53)), (this.yPos + (hitboxRadius * 2)));
// ctx.closePath();
// ctx.fill();

//upper bottom half circle
ctx.beginPath();
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.arc(this.xPos + xAlignment, this.yPos + 105, 8, 2 * Math.PI, 0);
ctx.closePath();
ctx.fill();
//lower bottom half circle
ctx.beginPath();
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.arc(this.xPos + xAlignment, this.yPos + 111, 9, 2 * Math.PI, 0);
ctx.closePath();
ctx.fill();
```

## Bunker Painted Hitbox
```javascript
ctx.beginPath();
ctx.fillStyle = "black";
ctx.arc(oneBunker.x + bunkerXSize / 2 + 4, oneBunker.y + bunkerYSize - 6, bunkerRadius, Math.PI, 0);
ctx.closePath();
ctx.fill();    
```

## Gunner Painted Hitbox
```javascript
ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 100)`;
ctx.fillRect(oneGunner.x, oneGunner.y, gunnerXSize, gunnerYSize);
r+=1.5;
g-=5;
b+=2
```

## Bomb Painted Hitbox
```javascript
ctx.beginPath();
ctx.fillStyle = "black";
ctx.arc(oneBomb.x + bombSize / 2, oneBomb.y + bombSize - 6, bombRadius, 2 * Math.PI, 0);
ctx.closePath();
ctx.fill();
```

## Bullet Painted Hitbox
```javascript
ctx.beginPath();
ctx.fillStyle = "rgba(15, 46, 35, 45)";
ctx.arc(eachBullet.x + bulletXSize / 2, eachBullet.y + bulletYSize / 2, bulletXSize / 2, 2 * Math.PI, 0);
ctx.closePath();
ctx.fill();
```