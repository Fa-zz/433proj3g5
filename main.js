console.log('main.js loaded')
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");


//Use a for loop to create a 2D array to mimic the shape of the map
//This will be used to render canvas objects that be used for collisions

const collisionMap = []
for (let i = 0; i < mapCol.length; i+=70) { //70 tiles will create a full row of the map. This value can be adjusted by setting it to the width of the map\
    collisionMap.push(mapCol.slice(i, 70 + i)) //slice(starting index, ending index) --> ending index = map width 
}


const boundaries = []
const offset = {//Iniital map position. Use offset to position other tiles correctly on top of map
    x: -735,
    y: -650
  }

//console.log(collisionMap)
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 7973) {//7973 is filled into each index where a boundary tile exists. This is done by Tiled when a json file is exported
            boundaries.push(new playerBoundary({
                position: {
                    x: j * playerBoundary.width + offset.x ,
                    y: i * playerBoundary.height + offset.y
                }//48 is the size of each tile. Takes into account the zoom level used when exporting the image
                    
            }));
        }
    });
}); 

console.log(boundaries)
  

//Code is similar for battle zones with slight changes, however it is still technically a collision
const battleZoneMap = []
for (let i = 0; i < battleZone.length; i+=70) { //70 tiles will create a full row of the map. This value can be adjusted by setting it to the width of the map\
    battleZoneMap.push(battleZone.slice(i, 70 + i)) //slice(starting index, ending index) --> ending index = map width 
}

console.log(battleZoneMap);

const gameBattleZones = []

battleZoneMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 7970) {//7970 is filled into each index where a boundary tile exists. This is done by Tiled when a json file is exported
            gameBattleZones.push(new playerBoundary({
                position: {
                    x: j * playerBoundary.width + offset.x ,
                    y: i * playerBoundary.height + offset.y
                }//48 is the size of each tile. Takes into account the zoom level used when exporting the image
            }));
        }
    });
}); 

console.log(gameBattleZones)
const mapImage = new Image();
mapImage.src = './Assets/Map/project3Map.png'; //Placeholder assets for now, easy to replace or add more

const playerDownImage = new Image();
playerDownImage.src = './Assets/Char_movement/playerDown.png'; //Player sprite placeholder

const playerUpImage = new Image();
playerUpImage.src = './Assets/Char_movement/playerUp.png'; //Player sprite placeholder

const playerLeftImage = new Image();
playerLeftImage.src = './Assets/Char_movement/playerLeft.png'; //Player sprite placeholder

const playerRightImage = new Image();
playerRightImage.src = './Assets/Char_movement/playerRight.png'; //Player sprite placeholder



          
//Create player
const player = new Sprite ({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2, //Starting position of player on screen ***Replace 192*68 with the actual dimensions of the sprite sheet once completed
        y:  canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: { //Set number of frames to 4 because sprite sheet has 4 frames - Change with actual art if needed
        max: 4,
        rate: 15
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage
    },
})


//Create background
const backgroundImage = new Sprite ({
    position: {
        x: offset.x, //Position will change when adding actual art, this works for the placeholder art
        y: offset.y
    },
    image: mapImage
})

var keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }

}
                                        //...boundaries copies everything in boundaries and puts it into moveableObjects
const moveableObjects = [backgroundImage, ...boundaries, ...gameBattleZones] //Movement acheived by translating the background. These objects in the array will be translated along with the background

function playerCollision({playerChar, collisionTile}) {
    return (
        playerChar.position.x + playerChar.width >= collisionTile.position.x && 
        playerChar.position.x <= collisionTile.position.x + collisionTile.width &&
        playerChar.position.y <= collisionTile.position.y + collisionTile.height &&
        playerChar.position.y + playerChar.height >= collisionTile.position.y
    );
}

//This function will trigger a battle if the player walks in the correcy area
function detectBattleZone (animationID)
{
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed)
        {
            for (let i = 0; i < gameBattleZones.length; i++){
                const tile = gameBattleZones[i];
                if (playerCollision({playerChar: player,collisionTile: tile}) && Math.random() < 0.1) { //Remove random for trainer battles

                    console.log("activate battle");
                    game_sounds.Lobby.pause()
                    game_sounds.Fight.play();
                    battle.initiated = true;
                    window.cancelAnimationFrame(animationID)
                    const battleTransition = document.getElementById('battleTransition');
                    battleTransition.style.display = 'show';
                    gsap.to('#battleTransition', {
                        opacity: 1,
                        repeat: 4,
                        yoyo: true,
                        duration: 0.3,
                        onComplete() {
                            gsap.to('#battleTransition', {
                                opacity: 0,
                                duration: 0.4
                            })
                            startBattle();
                        }
                    })
                    
                    break;
                };
            }
        }
}


const battle = {
    initiated: false
}

//Function to render objects onto the screen
function animationLoop() {
    const animationID = window.requestAnimationFrame(animationLoop);
    backgroundImage.drawSprite();
    // boundaries.forEach((tile) => {
    //     tile.drawBoundary();
        
    // });
    // gameBattleZones.forEach((tile) => {
    //     tile.drawBoundary();
        
    // });
    player.drawSprite();
    
    let moving = true;//Variable will control whether a player is moving when a collision is detected
    player.animated = false; //Moving property reset as animation loop is called again

    if(battle.initiated) return;

    detectBattleZone(animationID);

    if(battleZoneMap.initiated) return //Exit main loop if a battle is activated

    
    if (keys.w.pressed) {
        for (let i = 0; i < boundaries.length; i++){
            const tile = boundaries[i];
            if (playerCollision({playerChar: player,collisionTile: {...tile, position: {x: tile.position.x, y: tile.position.y + 3}}})) {
                console.log("coliding");
                moving = false;
                break;
            };
        }
        if(moving){
            moveableObjects.forEach((object) => {
                object.position.y += 3;
            })
        }
        
        player.animated = true;
        player.image = player.sprites.up;
        

    }
    else if (keys.a.pressed) {
        for (let i = 0; i < boundaries.length; i++){
            const tile = boundaries[i];
            if (playerCollision({playerChar: player,collisionTile: {...tile, position: {x: tile.position.x + 3, y: tile.position.y}}})) {
                console.log("coliding");
                moving = false;
                break;
            };
        }

        if(moving) {
            moveableObjects.forEach((object) => {
                object.position.x += 3;
            })
        }



        player.animated = true;
        player.image = player.sprites.left;
        
        

    }
    else if (keys.s.pressed) {
        for (let i = 0; i < boundaries.length; i++){
            const tile = boundaries[i];
            if (playerCollision({playerChar: player,collisionTile: {...tile, position: {x: tile.position.x, y: tile.position.y - 3}}})) {
                console.log("coliding");
                moving = false;
                break;
            };
        }
        if(moving){
            moveableObjects.forEach((object) => {
                object.position.y -= 3;
            })
        }

        player.animated = true;
        player.image = player.sprites.down;
       

    }
    else if (keys.d.pressed) {
        for (let i = 0; i < boundaries.length; i++){
            const tile = boundaries[i];
            if (playerCollision({playerChar: player,collisionTile: {...tile, position: {x: tile.position.x - 3, y: tile.position.y}}})) {
                console.log("coliding");
                moving = false;
                break;
            };
        }
        if(moving){
            moveableObjects.forEach((object) => {
                object.position.x -= 3;
            })
        }
        player.animated = true;
        player.image = player.sprites.right;
       

    }

    
}


//This function is important. Canvas wouldn't load correctly because images weren't loaded before drawImage was called. This prevents that from happening. 
//This is messy. I will clean it up later, but it works for now
mapImage.onload = () => {
    playerDownImage.onload = () => {
        playerUpImage.onload = () => {
            playerLeftImage.onload = () => {
                playerRightImage.onload = () => {
                    animationLoop();
                    
                }
            }
        }        
    };
};


window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            
            keys.w.pressed = true;
            break;
        case 'a':
           
            keys.a.pressed = true;
            break;
        case 's':
            
            keys.s.pressed = true;
            break;
        case 'd':
            
            keys.d.pressed = true;
            break;
    }
        
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            
            keys.w.pressed = false;
            break;
        case 'a':
            
            keys.a.pressed = false;
            break;
        case 's':
            
            keys.s.pressed = false;
            break;
        case 'd':
           
            keys.d.pressed = false
    }
        
})

let clicked = false

addEventListener('click', () => {
    if(!clicked) {
        game_sounds.Lobby.play();
        clicked = true;
    }
    
})