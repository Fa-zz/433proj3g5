const battleBackground = new Image()
battleBackground.src = './Assets/Background/battleBackground.png'; //Battle background

//All sprites for back facing pokemon
const bulbasaurImageBack = new Image();
bulbasaurImageBack.src = './Assets/Pokemon_sprites/1_back.png'; // Bulbasaur sprite

const ivysaurImageBack = new Image();
ivysaurImageBack.src = './Assets/Pokemon_sprites/2_back.png'; // Ivysaur sprite

const venusaurImageBack = new Image();
venusaurImageBack.src = './Assets/Pokemon_sprites/3_back.png'; // Venusaur sprite

const charmeleonImageBack = new Image();
charmeleonImageBack.src = './Assets/Pokemon_sprites/5_back.png'; // Charmeleon sprite

const charizardImageBack = new Image();
charizardImageBack.src = './Assets/Pokemon_sprites/6_back.png'; // Charizard sprite

const charmanderImageBack = new Image();
charmanderImageBack.src = './Assets/Pokemon_sprites/4_back.png'; // Charmander sprite

const squirtleImageBack = new Image();
squirtleImageBack.src = './Assets/Pokemon_sprites/7_back.png'; // Squirtle sprite

const caterpieImageBack = new Image();
caterpieImageBack.src = './Assets/Pokemon_sprites/10_back.png'; // Caterpie sprite

const weedleImageBack = new Image();
weedleImageBack.src = './Assets/Pokemon_sprites/13_back.png'; // Weedle sprite

const pidgeyImageBack = new Image();
pidgeyImageBack.src = './Assets/Pokemon_sprites/16_back.png'; // Pidgey sprite

const rattataImageBack = new Image();
rattataImageBack.src = './Assets/Pokemon_sprites/19_back.png'; // Rattata sprite

const ekansImageBack = new Image();
ekansImageBack.src = './Assets/Pokemon_sprites/23_back.png'; // Ekans sprite

const pikachuImageBack = new Image();
pikachuImageBack.src = './Assets/Pokemon_sprites/25_back.png'; // Pikachu sprite

const sandshrewImageBack = new Image();
sandshrewImageBack.src = './Assets/Pokemon_sprites/27_back.png'; // Sandshrew sprite

const nidoranImageBack = new Image();
nidoranImageBack.src = './Assets/Pokemon_sprites/29_back.png'; // Nidoran sprite

const clefairyImageBack = new Image();
clefairyImageBack.src = './Assets/Pokemon_sprites/35_back.png'; // Clefairy sprite


const jigglypuffImageBack = new Image();
jigglypuffImageBack.src = './Assets/Pokemon_sprites/39_back.png'; // Jigglypuff sprite

const zubatImageBack = new Image();
zubatImageBack.src = './Assets/Pokemon_sprites/41_back.png'; // Zubat sprite

const oddishImageBack = new Image();
oddishImageBack.src = './Assets/Pokemon_sprites/43_back.png'; // Oddish sprite

const parasImageBack = new Image();
parasImageBack.src = './Assets/Pokemon_sprites/46_back.png'; // Paras sprite

const diglettImageBack = new Image();
diglettImageBack.src = './Assets/Pokemon_sprites/50_back.png'; // Diglett sprite



//Battle setup
let numPlayerPokemon = 0;
let numEnemyPokemon = 0;
playerPokemon = [];
enemyPokemon = [];

while(playerPokemon.length > 0) {
    playerPokemon.pop()
}
while(enemyPokemon.length > 0) {
    enemyPokemon.pop()
}

function pickPokemon() {
    return Math.floor(Math.random() * 151) + 1;
}

// queryMonster obtains data from the DB using an Ajax call. We can get random or specific Pokemon, and specify whether the Pokemon is
// being added to the player or enemy's group of Pokemon.
// Arguments: bool isQueryRandom, int pokeDexNumber, bool addToPlayer, bool addToEnemy
// See below for examples of use
function queryMonster(pokeDexNumber, isQueryRandom, addToPlayer, addToEnemy) {
    if (isQueryRandom == true) {
        pokeDexNumber = pickPokemon();
    }
    return new Promise((resolve, reject) => {
        if (addToPlayer) {
            $.ajax({
                url: 'monsters.php?Number=' + pokeDexNumber.toString(),
                type: 'POST',
                data: { dexNum: pokeDexNumber },
                success: function (data) {
                    console.log(data.dexName + " was added to player party");
                    playerPokemon.push(data);
                },
                error: function (error) {
                    reject(error);
                }
            });    
        } else if (addToEnemy) {
            $.ajax({
                url: 'monsters.php?Number=' + pokeDexNumber.toString(),
                type: 'POST',
                data: { dexNum: pokeDexNumber },
                success: function (data) {
                    console.log(data.dexName + " was added to enemy party");
                    enemyPokemon.push(data);
                },
                error: function (error) {
                    reject(error);
                }
            });    
        }
    });
}

function drawBattleBackground() {
    context.drawImage(
        battleBackground,
        0, 0, battleBackground.width, battleBackground.height,
        0, 0, canvas.width, canvas.height
    );
}

const battleBackgroundSprite = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackground,
});

// Demonstrating getting random and specific pokemon
// The following code gets a specific Pokemon, Bulbasaur at pokeDexNum=1, and adds it to Player's group.
// queryMonster(pokeDexNum, isQueryRandom, addToPlayer, addToEnemy)
//Opponent pokemon
queryMonster(1, false , false, true);
queryMonster(5, false , false, true);
queryMonster(23, false , false, true);
queryMonster(27, false , false, true);
queryMonster(35, false , false, true);
queryMonster(50, false , false, true);
//Player pokemon
queryMonster(4, false, true, false);
queryMonster(7, false, true, false);
queryMonster(16, false, true, false);
queryMonster(19, false, true, false);
queryMonster(27, false, true, false);
queryMonster(39, false, true, false);
// This gets a random Pokemon, and adds it to Player's group.
//queryMonster(-1, true, true, false);
// This gets a random Pokemon, and adds it to Enemy's group.
//queryMonster(-1, true, false, true);
// We can add enemy pokemon during a battle, then delete them afterwards.

console.log(playerPokemon);
console.log(enemyPokemon)


//Fake pokemon - Try to replace these with pokemon from the database
let playerCurrentPokemon;
let opponentCurrentPokemon;

// let currentPlayerPokemon = playerPokemon[0];
// let currentOpponent = enemyPokemon[0];

//Used to render sprites during a battle. 
//Used mostly for attack animations
let dynamicSprites //Includes current pokemon out on the field

//Queue to keep track of attack sequence and events
let eventQueue;

//This function animates and keeps track of the pokemon's health during the battle
//Ensures that the health of the pokemon are accurate when switching pokemon
function updateHealthBar(healthBar, currentHealth, maxHealth) {
    if(currentHealth === maxHealth) {
        const healthPercentage = (currentHealth / maxHealth) * 100;
        gsap.to(healthBar, {
            width: healthPercentage + '%'
        });
    }
    else {
        const healthPercentage = (currentHealth / maxHealth) * 100;
        gsap.to(healthBar, {
            width: healthPercentage + '%'
        });
    }
    
}

//This function updates the name of the current players pokemon on the screen when a pokemon is swapped out
function updateName(currentPokemon) {
    document.querySelector('#playerPokemonName').innerHTML = currentPokemon.name;
}

//This function will reset needed variables and fields like healthbars and pokemon health after every battle
function battleSetup() {
    document.querySelector('#battleScreenUI').style.display = 'block';
    document.querySelector('#textBox').style.display = 'none';
    document.querySelector('#opponentHealthBar').style.width = '100%';
    document.querySelector('#playerHealthBar').style.width = '100%';
    document.querySelector('#attackButtons').replaceChildren();
    
    const playerTeam = createPokemonObjects(playerPokemon);
    const opponentTeam = createPokemonObjects(enemyPokemon);
    

    playerTeam.forEach((pokemon) => {
        pokemon.position = {
            x: 250,
            y: 400
        }
        pokemon.isOpponent = false;
        console.log(pokemon.currentHealth)
        console.log(pokemon.maxHealth)
        //pokemon.image = pokemon.Number + '_back.png'; //Change the sprite to to back facing for player
    })

    opponentTeam.forEach((pokemon) => {
        pokemon.position = {
            x: 750,
            y: 150
        }
        pokemon.isOpponent = true;
    })

    opponentCurrentPokemon = opponentTeam[0];

    playerCurrentPokemon = playerTeam[0]

    createPokemonMenu(playerTeam);

    dynamicSprites = [opponentCurrentPokemon, playerCurrentPokemon] 
    console.log(playerCurrentPokemon.attacks)
    
   
    battleLogic(playerCurrentPokemon)
    //Show the menu for switching pokemon
    document.querySelector('#pokemonSwitch').addEventListener('click', () => {
        showMenu();
    });

    //Hide the menu 
    document.querySelector('#back').addEventListener('click', () => {
        hideMenu();
    });

    document.querySelectorAll('#pokemonButtons button').forEach((button) => {
        button.addEventListener('click', (eventObject) => {
            const selection = eventObject.currentTarget.innerHTML;
            console.log(selection);
            console.log(playerTeam[1].name)
            if(selection == playerTeam[0].name)
            {
                playerCurrentPokemon = playerTeam[0];
                playerCurrentPokemon.position = {
                    x: 250,
                    y: 400
                }
                dynamicSprites[1] = playerCurrentPokemon;
                updateName(playerCurrentPokemon)
                updateHealthBar('#playerHealthBar', playerCurrentPokemon.currentHealth, playerCurrentPokemon.maxHealth);
                battleLogic(playerCurrentPokemon);
                console.log(playerCurrentPokemon)
            }
            else if(selection == playerTeam[1].name)
            {
                playerCurrentPokemon = playerTeam[1];
                playerCurrentPokemon.position = {
                    x: 250,
                    y: 400
                }
                dynamicSprites[1] = playerCurrentPokemon;
                updateName(playerCurrentPokemon)
                updateHealthBar('#playerHealthBar', playerCurrentPokemon.currentHealth, playerCurrentPokemon.maxHealth);
                battleLogic(playerCurrentPokemon);
                console.log(playerCurrentPokemon)
            }
            else if(selection == playerTeam[2].name)
            {
                playerCurrentPokemon = playerTeam[2];
                playerCurrentPokemon.position = {
                    x: 250,
                    y: 400
                }
                dynamicSprites[1] = playerCurrentPokemon;
                updateName(playerCurrentPokemon)
                updateHealthBar('#playerHealthBar', playerCurrentPokemon.currentHealth, playerCurrentPokemon.maxHealth);
                battleLogic(playerCurrentPokemon);
                console.log(playerCurrentPokemon)
            }
            else if(selection == playerTeam[3].name)
            {
                playerCurrentPokemon = playerTeam[3];
                playerCurrentPokemon.position = {
                    x: 250,
                    y: 400
                }
                dynamicSprites[1] = playerCurrentPokemon;
                updateName(playerCurrentPokemon)
                updateHealthBar('#playerHealthBar', playerCurrentPokemon.currentHealth, playerCurrentPokemon.maxHealth);
                battleLogic(playerCurrentPokemon);
                console.log(playerCurrentPokemon)
            }
            else if(selection == playerTeam[4].name)
            {
                playerCurrentPokemon = playerTeam[4];
                playerCurrentPokemon.position = {
                    x: 250,
                    y: 400
                }
                dynamicSprites[1] = playerCurrentPokemon;
                updateName(playerCurrentPokemon)
                updateHealthBar('#playerHealthBar', playerCurrentPokemon.currentHealth, playerCurrentPokemon.maxHealth);
                battleLogic(playerCurrentPokemon);

                console.log(playerCurrentPokemon)
            }
            else if(selection == playerTeam[5].name)
            {
                playerCurrentPokemon = playerTeam[5];
                playerCurrentPokemon.position = {
                    x: 250,
                    y: 400
                }
                dynamicSprites[1] = playerCurrentPokemon;
                updateName(playerCurrentPokemon)
                updateHealthBar('#playerHealthBar', playerCurrentPokemon.currentHealth, playerCurrentPokemon.maxHealth);
                battleLogic(playerCurrentPokemon);
                console.log(playerCurrentPokemon)
            }
        })
    })


}



let battleAnimationID;

function battleAnimation () {
    battleAnimationID = window.requestAnimationFrame(battleAnimation);
   
    drawBattleBackground();


    dynamicSprites.forEach((newSprite) => {
        newSprite.drawSprite()
    })
}

function startBattle() {
    battleSetup();
    battleAnimation();
}


document.querySelector('#textBox').addEventListener('click', (eventObject) => {
    if (eventQueue.length > 0) {
        eventQueue[0] ();
        eventQueue.shift();
    }
    else  {
        eventObject.currentTarget.style.display = 'none'
    }
})

//This function takes the data retrieved from the database and converts it into an array of pokemon objects that can be used with our code

function createPokemonObjects(pokemonDataArray) {
    let pokemonObjects = [];
    pokemonDataArray.forEach(pokemonData => {
        
        // Check if the monster exists in your monsters.js data
        if (monsters.hasOwnProperty(pokemonData.Name)) {
            const monsterData = monsters[pokemonData.Name];
            let pokemon = new Pokemon({
                dexNum: pokemonData.Number,
                level: pokemonData.Level,
                name: pokemonData.Name,
                type1: pokemonData.Type1,
                type2: pokemonData.Type2,
                attack_stat: pokemonData.Attack,
                defense: pokemonData.Defense,
                sp_attack: pokemonData.Sp_Attack,
                sp_defense: pokemonData.Sp_Defense,
                speed: pokemonData.Speed,
                currentHealth: pokemonData.HP,
                maxHealth: pokemonData.HP,
                isOpponent: pokemonData.isOpponent,
                position: {
                    x: 0,
                    y: 0
                },   
                image: monsterData.image,
                frames: monsterData.frames,
                animated: monsterData.animated,
                scale: monsterData.scale,
                attacks: monsterData.attacks,
                pokemonName: monsterData.pokemonName
            });
            pokemonObjects.push(pokemon);
        } else {
            console.error(`Monster data not found for ${pokemonData.Name}`);
        }
    });
    return pokemonObjects;
}

function createPokemonMenu(playerTeam) {
    const pokemonButtonsContainer = document.querySelector('#pokemonButtons');

    // Clear existing buttons
    pokemonButtonsContainer.innerHTML = '';
    
    playerTeam.forEach((pokemon) => {
        const button = document.createElement('button');
        button.innerHTML = pokemon.name;
        button.style.padding = '10px';
        button.style.margin = '5px';
        button.style.border = '2px solid black';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = 'white';
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#ddd';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = 'white';
        });
        pokemonButtonsContainer.appendChild(button);
    })
    
}


function createAttackMenu(playerCurrentPokemon) {
    const attackButtonsContainer = document.querySelector('#attackButtons');

    // Clear existing buttons
    attackButtonsContainer.innerHTML = '';

    // Create new buttons for each attack
    playerCurrentPokemon.attacks.forEach((attack) => {
        const button = document.createElement('button');
        button.innerHTML = attack.name;
        button.style.padding = '10px';
        button.style.margin = '5px';
        button.style.border = '2px solid black';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = 'white';
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#ddd';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = 'white';
        });
        attackButtonsContainer.appendChild(button);
    });

    eventQueue = []; // Reset event queue if needed
}

function battleLogic (playerCurrentPokemon) {

    createAttackMenu(playerCurrentPokemon)
    //Button event listeners
    document.querySelectorAll('#attackButtons button').forEach((button) => {
        button.addEventListener('click', (eventObject) => {
            const currentAttack = attacks[eventObject.currentTarget.innerHTML];
            playerCurrentPokemon.attack({ 
                attack: currentAttack, 
                recipient: opponentCurrentPokemon,
                dynamicSprites
            });
    
            if(opponentCurrentPokemon.currentHealth <= 0){
                eventQueue.push(() => {
                    opponentCurrentPokemon.faint();
                });
                eventQueue.push(() => {
                    gsap.to('#battleTransition', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationID);
                            animationLoop();
                            document.querySelector('#battleScreenUI').style.display = 'none';
                            gsap.to('#battleTransition', {
                                opacity: 0
                            });
                            game_sounds.Fight.pause()
                            game_sounds.Lobby.play()
                            battle.initiated = false;
                        }
                    });
                });
    
                return;
            }
            //Random attacks chosen for opponent
            const opponentAttack = opponentCurrentPokemon.attacks[Math.floor(Math.random() * opponentCurrentPokemon.attacks.length)];

            eventQueue.push(() => {
                opponentCurrentPokemon.attack({ 
                    attack: opponentAttack, 
                    recipient: playerCurrentPokemon,
                    dynamicSprites
                })

                if(playerCurrentPokemon.currentHealth <= 0){
                    eventQueue.push(() => {
                        playerCurrentPokemon.faint();
                    })
                    eventQueue.push(() => {
                        gsap.to('#battleTransition', {
                            opacity: 1,
                            onComplete: () => {
                                cancelAnimationFrame(battleAnimationID);
                                animationLoop();
                                document.querySelector('#battleScreenUI').style.display = 'none';
                                gsap.to('#battleTransition', {
                                    opacity: 0
                                })
                                game_sounds.Fight.pause()
                                game_sounds.Lobby.play()
                                battle.initiated = false
                                
                            }
                        })
                    })
    
                    return
                }
            })
            button.addEventListener('mouseenter', (eventObject) => {
                const currentAttack = attacks[eventObject.currentTarget.innerHTML];
                document.querySelector('#attackType').innerHTML = currentAttack.type
                document.querySelector('#attackType').style.color = currentAttack.color
        
                console.log('go')
            })  
        })

    })
}

function showMenu() {
    const options = document.querySelector('#choosePokemon')
    options.style.display = 'block'
}

function hideMenu() {
    const options = document.querySelector('#choosePokemon')
    options.style.display = 'none'
}
