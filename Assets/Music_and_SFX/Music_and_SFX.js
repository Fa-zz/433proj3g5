// const game_sounds = {
//     Lobby: new Howl({
//         src: './Assets/Music_and_SFX/lobby.wav',
//         html5: true
//     }),
//     Fight: new Howl({
//         src: './Assets/Music_and_SFX/fight.wav',
//         html5: true
//     }),
//     Hurt_sound: new Howl({
//         src: './Assets/Music_and_SFX/hurt.mp3',
//         html5: true
//     }),
//     Hit_sound: new Howl({
//         src: './Assets/Music_and_SFX/hit.mp3',
//         html5: true
//     }),
//     Pokeball: new Howl({
//         src: './Assets/Music_and_SFX/pokeball.mp3',
//         html5: true
//     })
// }

const game_sounds = {
    Lobby: new Audio('./Assets/Music_and_SFX/lobby.wav'),
    Fight: new Audio('./Assets/Music_and_SFX/fight.wav'),
    Hurt_sound: new Audio('./Assets/Music_and_SFX/hurt.mp3'),
    Hit_sound: new Audio('./Assets/Music_and_SFX/hit.mp3'),
    Pokeball: new Audio('./Assets/Music_and_SFX/pokeball.mp3')
}

game_sounds.Lobby.volume = 0.4;
game_sounds.Fight.volume = 0.5;
game_sounds.Hurt_sound.volume = 0.4;
game_sounds.Hit_sound.volume = 0.6;  
game_sounds.Pokeball.volume = 0.3;  
