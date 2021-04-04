let map = [
    "WWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WM  W     WI    W W W   B W",
    "W WPW WWW WWWWW W W WMWW  F",
    "W WWW MIW    PW W L W  WWWW",
    "W WMWWWWWLW WWW W W W  IW W",
    "W         W     W W W W W W",
    "WMWWW WWWWW WWWWW W W W W W",
    "W WP  W   W W M   W W W W W",
    "W WWWWW W W W W WPW   W W W",
    "S     W W W W W W WWW W  PW",
    "WWWWW W W W W W W WPW WMW W",
    "W   M W W W L W W W W W   W",
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
  'ArrowUp' : () => {
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
  'ArrowRight' : () => {
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

function checkWin() {
  if (map[playerLine][playerColumn] === 'F') {
    modal.classList.add('is-active')
    const winSound = document.getElementById("soundWin"); 
    winSound.volume = 0.3;
    winSound.play();
    resetGame()
  }
  updateStatus()
}

function checkDeath() {
  if (health <= 0) {
    document.querySelector('#modalLose').classList.add('is-active')
    const loseSound = document.getElementById("soundLose"); 
    loseSound.volume = 0.3;
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
  const soundDefault = document.getElementById('soundDefault')
  soundDefault.volume = 0.2;
  soundDefault.loop = true;
  soundDefault.play();
})

modalBg.addEventListener('click', () => {
  modal.classList.remove('is-active')
  document.querySelector('#modalWin').classList.remove('is-active')
  // const startingPosition = document.getElementById('div9-0');
  // startingPosition.appendChild(player)
  // playerLine = 9;
  // playerColumn = 0;
  resetGame()
})

modalBgLose.addEventListener('click', () => {
  modal.classList.remove('is-active')
  document.querySelector('#modalLose').classList.remove('is-active')
  // const startingPosition = document.getElementById('div9-0');
  // startingPosition.appendChild(player)
  // playerLine = 9;
  // playerColumn = 0;
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
    const itemSound = document.getElementById("soundItem"); 
    itemSound.volume = 0.3;
    itemSound.play();
  }
  if (map[playerLine][playerColumn] === 'P') {
    document.getElementById(`div${playerLine}-${playerColumn}`).classList.remove('potion')
    health += 15
    map[playerLine] = map[playerLine].replace(/P/,'p')
    const itemSound = document.getElementById("soundItem"); 
    itemSound.volume = 0.3;
    itemSound.play();
  }
  if (map[playerLine][playerColumn] === 'M') {
    document.getElementById(`div${playerLine}-${playerColumn}`).classList.remove('monster')
    health -= 15
    level += 7
    map[playerLine] = map[playerLine].replace(/M/,'m')
    const creatureDeadSound = document.getElementById("soundCreatureDead"); 
    creatureDeadSound.volume = 0.2;
    creatureDeadSound.play();
  }
  if (map[playerLine][playerColumn] === 'L') {
    document.getElementById(`div${playerLine}-${playerColumn}`).classList.remove('lord')
    health -= 50
    level += 13
    map[playerLine] = map[playerLine].replace(/L/,'l')
    const creatureDeadSound = document.getElementById("soundCreatureDead"); 
    creatureDeadSound.volume = 0.2;
    creatureDeadSound.play();
  }
  if (map[playerLine][playerColumn] === 'B') {
    document.getElementById('boss').style.display = 'none'
    health -= 80;
    level += 50;
    map[playerLine] = map[playerLine].replace(/B/,'b')
    const bossSound = document.getElementById("soundBoss"); 
    bossSound.volume = 0.5;
    bossSound.play();
  }
  if (health < 0) {health = 0}
  if (health > 100) {health = 100} 

  updateStatus()
}

let evolveStage = 1;

function checkEvolve() {
  const levelUpSound = document.getElementById("soundLevelUp"); 
  levelUpSound.volume = 0.3;
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
  if (map[playerLine][playerColumn] !== 'F') movePlayer[event.key]()
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
  // document.getElementById('soundDefault').pause()
})

document.getElementById('help').addEventListener('click', () => {
  document.getElementById('modalHelp').classList.add('is-active')
})

document.getElementById('modalBgHelp').addEventListener('click', () => {
  document.getElementById('modalHelp').classList.remove('is-active')

})

// CREATE ANOTHER VARIABLE TO RESET MAP

// LEVEL BY STEPS SHOW ON THE RIGHT (guardado numa variável global)
// MONSTERS BY LEVEL
// SECRET PASSAGES (DOORS, ITEMS)
// TRAPS AROUND THE MAP
