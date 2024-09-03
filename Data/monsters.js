const bulbasaurImage = new Image();
bulbasaurImage.src = './Assets/Pokemon_sprites/1_front.png'; // Bulbasaur sprite

const ivysaurImage = new Image();
ivysaurImage.src = './Assets/Pokemon_sprites/2_front.png'; // Ivysaur sprite

const venusaurImage = new Image();
venusaurImage.src = './Assets/Pokemon_sprites/3_front.png'; // Venusaur sprite

const charmeleonImage = new Image();
charmeleonImage.src = './Assets/Pokemon_sprites/5_front.png'; // Charmeleon sprite

const charizardImage = new Image();
charizardImage.src = './Assets/Pokemon_sprites/6_front.png'; // Charizard sprite

const charmanderImage = new Image();
charmanderImage.src = './Assets/Pokemon_sprites/4_front.png'; // Charmander sprite

const squirtleImage = new Image();
squirtleImage.src = './Assets/Pokemon_sprites/7_front.png'; // Squirtle sprite

const caterpieImage = new Image();
caterpieImage.src = './Assets/Pokemon_sprites/10_front.png'; // Caterpie sprite

const weedleImage = new Image();
weedleImage.src = './Assets/Pokemon_sprites/13_front.png'; // Weedle sprite

const pidgeyImage = new Image();
pidgeyImage.src = './Assets/Pokemon_sprites/16_front.png'; // Pidgey sprite

const rattataImage = new Image();
rattataImage.src = './Assets/Pokemon_sprites/19_front.png'; // Rattata sprite

const spearowImage = new Image(); // Missing in the list you provided, so skipping this assignment.

const ekansImage = new Image();
ekansImage.src = './Assets/Pokemon_sprites/23_front.png'; // Ekans sprite

const pikachuImage = new Image();
pikachuImage.src = './Assets/Pokemon_sprites/25_front.png'; // Pikachu sprite

const sandshrewImage = new Image();
sandshrewImage.src = './Assets/Pokemon_sprites/27_front.png'; // Sandshrew sprite

const nidoranImage = new Image();
nidoranImage.src = './Assets/Pokemon_sprites/29_front.png'; // Nidoran sprite

const clefairyImage = new Image();
clefairyImage.src = './Assets/Pokemon_sprites/35_front.png'; // Clefairy sprite

const jigglypuffImage = new Image();
jigglypuffImage.src = './Assets/Pokemon_sprites/39_front.png'; // Jigglypuff sprite

const zubatImage = new Image();
zubatImage.src = './Assets/Pokemon_sprites/41_front.png'; // Zubat sprite

const oddishImage = new Image();
oddishImage.src = './Assets/Pokemon_sprites/43_front.png'; // Oddish sprite

const parasImage = new Image();
parasImage.src = './Assets/Pokemon_sprites/46_front.png'; // Paras sprite


const diglettImage = new Image();
diglettImage.src = './Assets/Pokemon_sprites/50_front.png'; // Diglett sprite


const monsters = {
    Charmander: {
        image: charmanderImage,
        frames: {
            max: 55,
            rate: 15
        },
        animated: true,
        scale: 1,
        pokemonName: 'Charmander',
        attacks: [attacks.Tackle, attacks.Ember, attacks.Tackle, attacks.Ember]
    },
    Bulbasaur: {
        image: bulbasaurImage,
        frames: {
            max: 51,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Bulbasaur',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Ivysaur: {
        image: ivysaurImage,
        frames: {
            max: 56,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Ivysaur',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Venusaur: {
        image: venusaurImage,
        frames: {
            max: 100,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Venusaur',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Charmeleon: {
        image: charmeleonImage,
        frames: {
            max: 46,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Charmeleon',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Charizard: {
        image: charizardImage,
        frames: {
            max: 72,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Charizard',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Squirtle: {
        image: squirtleImage,
        frames: {
            max: 30,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Squirtle',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Caterpie: {
        image: caterpieImage,
        frames: {
            max: 45,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Caterpie',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Weedle: {
        image: weedleImage,
        frames: {
            max: 65,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Weedle',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Pidgey: {
        image: pidgeyImage,
        frames: {
            max: 25,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Pidgey',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Rattata: {
        image: rattataImage,
        frames: {
            max: 54,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Rattata',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Spearow: {
        image: spearowImage,
        frames: {
            max: 51,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Spearow',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Ekans: {
        image: ekansImage,
        frames: {
            max: 38,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Ekans',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Pikachu: {
        image: pikachuImage,
        frames: {
            max: 58,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Pikachu',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Sandshrew: {
        image: sandshrewImage,
        frames: {
            max: 61,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Sandshrew',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Nidoran: {
        image: nidoranImage,
        frames: {
            max: 72,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Nidoran',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Clefairy: {
        image: clefairyImage,
        frames: {
            max: 69,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Clefairy',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Jigglypuff: {
        image: jigglypuffImage,
        frames: {
            max: 61,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Jigglypuff',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Zubat: {
        image: zubatImage,
        frames: {
            max: 55,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Zubat',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Oddish: {
        image: oddishImage,
        frames: {
            max: 56,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Oddish',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Paras: {
        image: parasImage,
        frames: {
            max: 49,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Paras',
        attacks: [attacks.Tackle, attacks.Ember]
    },
    Diglett: {
        image: diglettImage,
        frames: {
            max: 78,
            rate: 30
        },
        animated: true,
        scale: 0.75,
        pokemonName: 'Diglett',
        attacks: [attacks.Tackle, attacks.Ember]
    }
};