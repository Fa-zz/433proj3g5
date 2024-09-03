//Player Boundary class is used to create boundaries that the player cannot cross
//The same class is used to create the battle trigger spots, using different logic
class playerBoundary {
    static width = 48;
    static height = 48;
    constructor({position}) {
        this.position = position;
        this.width = playerBoundary.width;
        this.height = playerBoundary.height;
    }

    drawBoundary() {
        context.fillStyle = 'red' //Change to transparent in actual game
        context.fillRect(this.position.x, this.position.y, playerBoundary.width, playerBoundary.height)
    }
}


//Sprite class used to create any visual element in the canvas
//Position = Starting position of the sprite on the canvas
//Velocity - placeholder as we might need it
//image - refers to the image object that is associated with the sprite you are creating (ie. the actual image used for that sprite)
//frames - How many frames a sprite has. Static images will have 1 frame and will this be treated the same as animated sprites
//sprites - Used primarily with animated sprites so that different images can be swapped out for animations
class Sprite {
    constructor ({ position, image , frames = { max: 1, rate: 20 }, sprites, animated = false, scale = 1}) { //Pass arguments as an object - Order of parameters don't matter when calling the constructor
        //Sprite object properties
        this.position = position; 
        this.image = image;
        this.frames = {...frames, value: 0, timeElapsed: 0}; 
        this.animated = animated;
        this.sprites = sprites;
        this.scale = scale;
        this.width = (this.image.width / this.frames.max) * this.scale; 
        this.height = this.image.height * this.scale;
        this.opacity = 1
        
    }

    drawSprite() {
        //We wanted to create an effect when a pokemon gets hit by changing it's opacity
        //saving and loading the context allows for effects using opacity, without chnaging the opacity for all the objects on the canvas
        //***NOTE: The globalAlpha property was found using chatGPT, but we used google and stackoverflow to look up how to use it ***
        context.save()
        context.globalAlpha = this.opacity
        context.drawImage ( //Make sure the player image is loaded after the background image
            this.image, //the second and third parameters of the drawImage function determine the "image slicer" position on the spritesheet. For now only the x value needs to change                     
            this.frames.value * (this.image.width/this.frames.max), //For a static image frames.value will always remain 0 so nothing will change, however for the player the value will change and create the animation
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.frames.max) * this.scale,
            this.image.height * this.scale,
        );
        context.restore()

        //This code allows us to control the framerate of any object in the sprite class as you can pass the number of frames as a parameter
        if (!this.animated) return //Cap the speed of the animation
        
        if (this.frames.max > 1) {
            this.frames.timeElapsed++;
        }
        
        if (this.frames.timeElapsed % this.frames.rate == 0) {
            if(this.frames.value < this.frames.max - 1) {
                this.frames.value++; //move horizontally over the spritesheet
            }
            else{
                this.frames.value = 0;
            }
        }
            
    }    
        
}

//The pokemon class inherits from the sprite class and adds attributes that pokemon would typically have
//Sql queries are used to get certain values when creating a new pokemon object
class Pokemon extends Sprite{
    constructor({
        dexNum, 
        level = { min: 1}, 
        name, 
        type1, 
        type2, 
        attack_stat, 
        defense, 
        sp_attack, 
        sp_defense, 
        speed, 
        isOpponent, 
        position, 
        image , 
        frames = { max: 1, rate: 20 }, 
        sprites, 
        animated = false,
        scale = 1,
        attacks,
        pokemonName,
        currentHealth,
        maxHealth
    }) {
    super({   //Inherit from Sprite(parent) class //**NOTE: This super() notation was found using chatgpt and then changed to work in our class */
        position, 
        image , 
        frames, 
        sprites, 
        animated,
        scale                      
    })
    {
        this.dexNum = dexNum;
        this.level = level;
        this.name = name; 
        this.type1 = type1;
        this.type2 = type2;
        this.attack_stat = attack_stat;
        this.defense = defense;
        this.sp_attack = sp_attack;
        this.sp_defense = sp_defense;
        this.speed = speed;
        this.currentHealth = currentHealth
        this.maxHealth = maxHealth
        this.isOpponent = isOpponent
        this.attacks = attacks
        this.name = pokemonName;
    } 


    }

    faint() {
        document.querySelector('#textBox').style.display = 'block'
        document.querySelector('#textBox').innerHTML = this.name + ' fainted!';

        gsap.to(this.position, {
            y: this.position.y + 20
        })

        gsap.to(this, {
            opacity: 0
        })

        
    }

    attack({attack, recipient, dynamicSprites}){
        document.querySelector('#textBox').style.display = 'block'
        document.querySelector('#textBox').innerHTML = this.name + ' used ' + attack.name;

        let healthBar = '#opponentHealthBar'
        recipient.currentHealth -= attack.damage
        
        
        if(this.isOpponent) {
            healthBar = '#playerHealthBar'
        }
        switch (attack.name) {
            case 'Ember' :
                const fireAnimationImage = new Image();
                fireAnimationImage.src = './Assets/Attacks/fireball.png'
                const fireAnimation = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireAnimationImage,
                    frames: {
                        max: 4,
                        rate: 10
                    },
                    animated: true
                })

                dynamicSprites.push(fireAnimation)

                gsap.to(fireAnimation.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        game_sounds.Hit_sound.play()
                        dynamicSprites.pop();
                        //Enemy health reduced(animation)
                        gsap.to(healthBar, {
                            width: recipient.currentHealth + '%'
                        })
                        //Animation when enemy gets hit
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.1 
                        })  

                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                })
                break;

            case 'Tackle':
                const timeLine = gsap.timeline()
                let moveDistance = 20;

                if (this.isOpponent) {
                    moveDistance = -20
                }
                const originalPos = this.position
                timeLine.to(this.position, {
                    x: this.position.x - moveDistance
                })
                .to(this.position, {
                    x: this.position.x + moveDistance * 2,
                    duration: 0.1,
                    onComplete: () => {
                        game_sounds.Hit_sound.play()
                        //Enemy health reduced(animation)
                        gsap.to(healthBar, {
                            width: recipient.currentHealth + '%'
                        })
                        //Animation when enemy gets hit
                        gsap.to(recipient.position, {
                            x: recipient.position.x + moveDistance/2,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.1 
                        }) 
                        
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                })
                .to(this.position, {
                    x: this.position.x
                  })
            break;
        }
    }
}