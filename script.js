let map = [
    "WWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WM  W     WI    W W W   B W",
    "W WPW WWW WWWWW W W WMWW  F",
    "W WWW MIW    PW W L W  WWWW",
    "W WMWWWWWLW WWW W W W  IW W",
    "W         W     W W W W W W",
    "WMWWW WWWWW WWWWW W W W W W",
    "W WP  WI  W W M   W W W W W",
    "W WWWWW W W W W WPW   W W W",
    "S     W W W W W W WWW W  PW",
    "WWWWW W W W W W W WPW WMW W",
    "W   M WPW W L W W W W W   W",
    "W WWWWWWW WWWWW W W W W W W",
    "W  M   PW       W   W    IW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWW",
];

let mapReset = [...map];


const main = document.querySelector('main')
let playerLine = 0
let playerColumn = 0

for (let i = 0; i < map.length; i++) {
    const divLine = document.createElement('div');
    divLine.style.display = 'flex';
    main.appendChild(divLine)
    for (let j = 0; j < map[i].length; j++) {
        const div = document.createElement('div');
        div.classList.add('square')
        divLine.appendChild(div);
        div.id = `div${i}-${j}`
        if (map[i][j] === 'W') {
            div.classList.add('wall')
        }
        if (map[i][j] === 'S') {
            const player = document.createElement('div')
            player.id = 'player'
            div.appendChild(player)
            playerLine = i;
            playerColumn = j;
        }
        if (map[i][j] === 'I') {
          div.classList.add('item')
      }
        if (map[i][j] === 'M') {
          div.classList.add('monster')
      }
      if (map[i][j] === 'L') {
        div.classList.add('lord')
    }
        if (map[i][j] === 'P') {
          div.classList.add('potion')
      }
        if (map[i][j] === 'B') {
          div.appendChild(document.getElementById('boss'))
          // div.classList.add('boss')
        }
    }
}

const movePlayer = {
  'ArrowDown' : () => {
    if (map[playerLine+1][playerColumn] !== 'W'){
      playerLine += 1
      player.classList = 'slideBottom'
    }
  },
  's' : () => {
    if (map[playerLine+1][playerColumn] !== 'W'){
      playerLine += 1
      player.classList = 'slideBottom'
    }
  },
  'ArrowUp' : () => {
    if (map[playerLine-1][playerColumn] !== 'W'){
      playerLine -= 1
      player.classList = 'slideTop'
    }
  },
  'w' : () => {
    if (map[playerLine-1][playerColumn] !== 'W'){
      playerLine -= 1
      player.classList = 'slideTop'
    }
  },
  'ArrowLeft' : () => {
    const nextPosition = map[playerLine][playerColumn-1];
    if (nextPosition === undefined || nextPosition === 'W') {return}
    playerColumn -= 1
    player.classList = 'slideLeft'
  },
  'a' : () => {
    const nextPosition = map[playerLine][playerColumn-1];
    if (nextPosition === undefined || nextPosition === 'W') {return}
    playerColumn -= 1
    player.classList = 'slideLeft'
  },
  'ArrowRight' : () => {
    const nextPosition = map[playerLine][playerColumn+1];
    if (nextPosition === undefined || nextPosition === 'W') {return}
    playerColumn += 1
    player.classList = "slideRight"
  },
  'd' : () => {
    const nextPosition = map[playerLine][playerColumn+1];
    if (nextPosition === undefined || nextPosition === 'W') {return}
    playerColumn += 1
    player.classList = "slideRight"
  }
}

function appendPlayer() {
  const currentDiv = document.getElementById(`div${playerLine}-${playerColumn}`)
  currentDiv.appendChild(document.getElementById('player'))  
}

const modalBg = document.querySelector('#modalBgWin')
const modalBgLose = document.getElementById('modalBgLose')
const modal = document.querySelector('#modalWin')

function updateStatus() {
  const playerHealth = document.getElementById('healthbar')
  const playerLevelUp = document.getElementById('level')
   
  playerHealth.style.width = health + '%'
  playerLevelUp.innerText = 'Level ' + level
}

function resetGame() {
  map = [...mapReset];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const currentPositionDiv = document.getElementById(`div${i}-${j}`)
      const currentPositionMap = map[i][j]
      if (currentPositionMap === 'M') {currentPositionDiv.className = 'square monster'}
      if (currentPositionMap === 'I') {currentPositionDiv.className = 'square item'}
      if (currentPositionMap === 'P') {currentPositionDiv.className = 'square potion'}
      if (currentPositionMap === 'L') {currentPositionDiv.className = 'square lord'}
    }
  }
  document.getElementById('boss').style.display = 'initial'
  health = 100;
  level = 1;
  evolveStage = 1;
  const startingPosition = document.getElementById('div9-0');
  startingPosition.appendChild(player)
  playerLine = 9;
  playerColumn = 0;
  checkEvolve()
}

// SOUND VARIABLES
const winSound = document.getElementById("soundWin"); 
const loseSound = document.getElementById("soundLose"); 
const soundDefault = document.getElementById('soundDefault')
const itemSound = document.getElementById("soundItem"); 
const potionSound = document.getElementById('soundPotion');
const creatureDeadSound = document.getElementById("soundCreatureDead"); 
const lordDeadSound = document.getElementById('soundLordDead')
const bossSound = document.getElementById("soundBoss"); 
const levelUpSound = document.getElementById("soundLevelUp"); 
const beepSound = $("#soundBeep")[0];

winSound.volume = 0.2;
loseSound.volume = 0.2;
soundDefault.volume = 0.2;
itemSound.volume = 0.2;
potionSound.volume = 0.2;
creatureDeadSound.volume = 0.2;
lordDeadSound.volume = 0.2
bossSound.volume = 0.5;
levelUpSound.volume = 0.2;
beepSound.volume = 0.2

// SOUND VARIABLES


function checkWin() {
  if (map[playerLine][playerColumn] === 'F') {
    modal.classList.add('is-active')
    winSound.play();
    resetGame()
  }
  updateStatus()
}

function checkDeath() {
  if (health <= 0) {
    document.querySelector('#modalLose').classList.add('is-active')
    loseSound.play();
    resetGame()
  } 
  updateStatus()
}

function showPlayerInfo() {
  const playerName = document.getElementById('nickname')
  const playerClass = document.getElementById('class')
  const playerLevel = document.getElementById('level')
  playerName.innerText = username
  playerClass.innerText = chosenClass
  playerLevel.innerText = 'Level ' + level 
}

const startGame = document.getElementById('startGame')
startGame.addEventListener('click', () => {
  chosenClass = document.querySelector('option:checked').value
  username = document.querySelector('#username').value
  document.getElementById('login').classList.remove('is-active')
  showPlayerInfo()

  const player = document.getElementById('player')
  if (chosenClass === 'Rogue') {
  player.style.backgroundImage = 'url(./assets/rogue1.png)'
  }
  if (chosenClass === 'Mage') {
  player.style.backgroundImage = 'url(./assets/mage1.png)'
  }
  soundDefault.loop = true;
  soundDefault.play();
})

modalBg.addEventListener('click', () => {
  modal.classList.remove('is-active')
  document.querySelector('#modalWin').classList.remove('is-active')
  resetGame()
})

modalBgLose.addEventListener('click', () => {
  modal.classList.remove('is-active')
  document.querySelector('#modalLose').classList.remove('is-active')
  resetGame()
})

let chosenClass = 'Warrior'
let username = 'Player'
let health = 100
let level = 1

function checkItem() {
  if (map[playerLine][playerColumn] === 'I') {
    document.getElementById(`div${playerLine}-${playerColumn}`).classList.remove('item')
    level += 10
    map[playerLine] = map[playerLine].replace(/I/,'i')
    itemSound.play();
  }
  if (map[playerLine][playerColumn] === 'P') {
    document.getElementById(`div${playerLine}-${playerColumn}`).classList.remove('potion')
    health += 20
    map[playerLine] = map[playerLine].replace(/P/,'p')
    potionSound.play();
  }
  if (map[playerLine][playerColumn] === 'M') {
    document.getElementById(`div${playerLine}-${playerColumn}`).classList.remove('monster')
    health -= 20
    level += 7
    map[playerLine] = map[playerLine].replace(/M/,'m')
    creatureDeadSound.play();
  }
  if (map[playerLine][playerColumn] === 'L') {
    document.getElementById(`div${playerLine}-${playerColumn}`).classList.remove('lord')
    health -= 50
    level += 13
    map[playerLine] = map[playerLine].replace(/L/,'l')
    lordDeadSound.play();
  }
  if (map[playerLine][playerColumn] === 'B') {
    document.getElementById('boss').style.display = 'none'
    health -= 80;
    level += 50;
    map[playerLine] = map[playerLine].replace(/B/,'b')
    bossSound.play();
  }
  if (health < 0) {health = 0}
  if (health > 100) {health = 100} 

  updateStatus()
}

let evolveStage = 1;

function checkEvolve() {
  if (level < 40) {
    if (chosenClass === 'Warrior') {
      player.style.backgroundImage = 'url(./assets/warrior1.png)'
    }
    if (chosenClass === 'Rogue') {
      player.style.backgroundImage = 'url(./assets/rogue1.png)'
    }
    if (chosenClass === 'Mage') {
      player.style.backgroundImage = 'url(./assets/mage1.png)'
    }
    evolveStage = 1;
  }
  if (level >= 40 && level < 100 && evolveStage === 1) {
    if (chosenClass === 'Warrior') {
      player.style.backgroundImage = 'url(./assets/warrior2.png)'
    }
    if (chosenClass === 'Rogue') {
      player.style.backgroundImage = 'url(./assets/rogue2.png)'
    }
    if (chosenClass === 'Mage') {
      player.style.backgroundImage = 'url(./assets/mage2.png)'
    }
    health = 100
    evolveStage = 2;
    levelUpSound.play();
  }
  if (level >= 100 && evolveStage === 2) {
    if (chosenClass === 'Warrior') {
      player.style.backgroundImage = 'url(./assets/warrior3.png)'
    }
    if (chosenClass === 'Rogue') {
      player.style.backgroundImage = 'url(./assets/rogue3.png)'
    }
    if (chosenClass === 'Mage') {
      player.style.backgroundImage = 'url(./assets/mage3.png)'
    }
    health = 100
    evolveStage = 3
    levelUpSound.play();
  }
  updateStatus()
}

document.addEventListener('keydown', (event) => {
  if (map[playerLine][playerColumn] !== 'F' && map[playerLine][playerColumn] !== undefined) {
    movePlayer[event.key]()
  }
  appendPlayer()
  checkWin()
  checkItem()
  checkDeath()
  checkEvolve()
});


function start() {
  setInterval(() => {
    document.getElementById('main').classList.toggle('activated')
  }, 2000)
}

window.addEventListener('load',start)

document.getElementById('logout').addEventListener('click', () => {
  document.getElementById('login').classList.add('is-active')
  const startingPosition = document.getElementById('div9-0');
  startingPosition.appendChild(player)
  playerLine = 9;
  playerColumn = 0;
  resetGame()
  appendPlayer()
  checkEvolve()
  document.getElementById('username').value = ''
  document.getElementById('password').value = ''
})

document.getElementById('help').addEventListener('click', () => {
  document.getElementById('modalHelp').classList.add('is-active')
})

document.getElementById('modalBgHelp').addEventListener('click', () => {
  document.getElementById('modalHelp').classList.remove('is-active')

})

document.getElementById('sound').addEventListener('click', () => {
  if (soundDefault.volume > 0) {
    itemSound.volume = 0
    potionSound.volume = 0
    soundDefault.volume = 0
    winSound.volume = 0
    loseSound.volume = 0
    creatureDeadSound.volume = 0  
    lordDeadSound.volume = 0
    bossSound.volume = 0 
    levelUpSound.volume = 0
    beepSound.volume = 0
    document.getElementById('sound').innerText = 'Sound:Off' 
    return
  }
  soundDefault.volume = 0.2
  winSound.volume = 0.2
  loseSound.volume = 0.2
  itemSound.volume = 0.2
  potionSound.volume = 0.2
  creatureDeadSound.volume = 0.2  
  lordDeadSound.volume = 0.2
  bossSound.volume = 0.4 
  levelUpSound.volume = 0.2 
  beepSound.volume = 0.2
  document.getElementById('sound').innerText = 'Sound:On' 
})

// const beepSound = document.getElementById('soundItem');
// document.getElementById('help').onmouseenter(function() {
//   beepSound.play();
// });

// function playBeep() {
//   console.log('a')
//   // potionSound.play()
// }

// $('#sound').mouseenter(playBeep)


$(".userInfo.logout h2, #startGame").mouseenter(function() {
  beepSound.play();
});



// TRANSITION FOR MONSTERS, ITEMS AND RESET

// SECRET PASSAGES (DOORS, ITEMS)
// TRAPS AROUND THE MAP
