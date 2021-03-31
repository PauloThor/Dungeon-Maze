const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

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
            div.style.background = '#145399'
        }
        if (map[i][j] === 'S') {
            const player = document.createElement('div')
            player.id = 'player'
            div.appendChild(player)
            playerLine = i;
            playerColumn = j;
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

function checkWin() {
  if (map[playerLine][playerColumn] === 'F') {
    document.getElementById('win').classList.remove('hidden')
  }
}

document.addEventListener('keydown', (event) => {
  if (map[playerLine][playerColumn] !== 'F') movePlayer[event.key]()
  appendPlayer()
  checkWin()
});

document.getElementById('win').addEventListener('click', () => {
  const startingPosition = document.getElementById('div9-0');
  startingPosition.appendChild(player)
  playerLine = 9;
  playerColumn = 0;
  document.getElementById('win').classList.add('hidden')
})