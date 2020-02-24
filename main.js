// Référencement des personnages
const map = document.querySelector('.map')
const menu = document.querySelector('.menu')
const pacMan = document.querySelector('img[src="./img/pacman.gif"]')
const redGhost = document.querySelector('img[src="./img/redghost.png"]')
const blueGhost = document.querySelector('img[src="./img/blueghost.png"]')
const greenGhost = document.querySelector('img[src="./img/greenghost.png"]')

let pacManInterval
let redGhostInterval
let blueGhostInterval
let greenGhostInterval

let score = 0;

let currentRedGhostDirection

const directions = ['toLeft', 'toRight', 'toTop', 'toBottom'];

const blockedSquaresToLeft = [
    { top: 0, left: 0 }, { top: 0, left: 500 },
    { top: 100, left: 0 },
    { top: 200, left: 0 }, { top: 200, left: 300 }, { top: 200, left: 500 }, { top: 200, left: 700 },
    { top: 300, left: 200 }, { top: 300, left: 300 }, { top: 300, left: 700 },
    { top: 400, left: 600 },
    { top: 500, left: 200 }, { top: 500, left: 300 }, { top: 500, left: 700 },
    { top: 600, left: 0 }, { top: 600, left: 500 },
    { top: 700, left: 0 }, { top: 700, left: 200 }, { top: 700, left: 800 },
    { top: 800, left: 0 }, { top: 800, left: 300 }, { top: 800, left: 700 }, { top: 800, left: 500 },
    { top: 900, left: 0 },
]

// Collection des murs axe horizontale gauche-droite
const blockedSquaresToRight = [
    { top: 0, left: 400 }, { top: 0, left: 900 },
    { top: 100, left: 900 },
    { top: 200, left: 200 }, { top: 200, left: 400 }, { top: 200, left: 600 }, { top: 200, left: 900},
    { top: 300, left: 200 }, { top: 300, left: 600 }, { top: 300, left: 700 },
    { top: 400, left: 300 },
    { top: 500, left: 200 }, { top: 500, left: 600 }, { top: 500, left: 700 },
    { top: 600, left: 400 }, { top: 600, left: 900 },
    { top: 700, left: 100 }, { top: 700, left: 700 }, { top: 700, left: 900 },
    { top: 800, left: 200 }, { top: 800, left: 400 }, { top: 800, left: 600 }, { top: 800, left: 900 },
    { top: 900, left: 900 },
]

// Collection des murs axe vertical haut-bas
const blockedSquaresToBottom = [
    { top: 0, left: 100 }, { top: 0, left: 300 }, { top: 0, left: 600 }, { top: 0, left: 800 },
    { top: 100, left: 100 }, { top: 100, left: 400 }, { top: 100, left: 500 }, { top: 100, left: 800 },
    { top: 200, left: 0 }, { top: 200, left: 100 }, { top: 200, left: 300 }, { top: 200, left: 600 }, { top: 200, left: 800 }, { top: 200, left: 900 },
    { top: 300, left: 400 }, { top: 300, left: 500 },
    { top: 400, left: 0 }, { top: 400, left: 100 }, { top: 400, left: 800 }, { top: 400, left: 900 },
    { top: 500, left: 400 }, { top: 500, left: 500 },
    { top: 600, left: 100 }, { top: 600, left: 300 }, { top: 600, left: 600 }, { top: 600, left: 800 },
    { top: 700, left: 0 }, { top: 700, left: 400 }, { top: 700, left: 500 }, { top: 700, left: 900 },
    { top: 800, left: 100 }, { top: 800, left: 200 }, { top: 800, left: 300 }, { top: 800, left: 600 }, { top: 800, left: 700 }, { top: 800, left: 800 },
    { top: 900, left: 0 }, { top: 900, left: 100 }, { top: 900, left: 200 }, { top: 900, left: 300 }, { top: 900, left: 400 }, { top: 900, left: 500 }, { top: 900, left: 600 }, { top: 900, left: 700 }, { top: 900, left: 800 }, { top: 900, left: 900 },
]

// Collection des murs axe vertical bas-haut
const blockedSquaresToTop = [
    { top: 0, left: 0 }, { top: 0, left: 100 }, { top: 0, left: 200 }, { top: 0, left: 300 }, { top: 0, left: 400 }, { top: 0, left: 500 }, { top: 0, left: 600 }, { top: 0, left: 700 }, { top: 0, left: 800 }, { top: 0, left: 900 },
    { top: 100, left: 100 }, { top: 100, left: 300 }, { top: 100, left: 600 }, { top: 100, left: 800 },
    { top: 200, left: 100 }, { top: 200, left: 400 }, { top: 200, left: 500 }, { top: 200, left: 800 },
    { top: 300, left: 300 }, { top: 300, left: 600 },
    { top: 400, left: 0 }, { top: 400, left: 100 }, { top: 400, left: 800 }, { top: 400, left: 900 },
    { top: 500, left: 400 }, { top: 500, left: 500 },
    { top: 600, left: 0 }, { top: 600, left: 100 }, { top: 600, left: 400 }, { top: 600, left: 500 }, { top: 600, left: 800 }, { top: 600, left: 900 },
    { top: 700, left: 100 }, { top: 700, left: 300 }, { top: 700, left: 600 }, { top: 700, left: 800 },
    { top: 800, left: 0 }, { top: 800, left: 400 }, { top: 800, left: 500 }, { top: 800, left: 900 },
    { top: 900, left: 100 }, { top: 900, left: 200 }, { top: 900, left: 300 }, { top: 900, left: 600 }, { top: 900, left: 700 }, { top: 900, left: 800 },
]

const getPositionOf = (element) => {
    const top = parseInt(getComputedStyle(element, null).getPropertyValue('top'), 10)
    const left = parseInt(getComputedStyle(element, null).getPropertyValue('left'), 10)
    return {top, left}
}

const checkDot = (pacManPosition) => {
    console.log(pacManPosition);
    return positionDot.some(square => {
        const topsAreEquals = pacManPosition.top === square.top;
        const leftsAreEquals = pacManPosition.left === square.left;
        return topsAreEquals && leftsAreEquals})
}

const movePacMan = (to) => {

    clearInterval(pacManInterval)
    pacMan.className = to
    let pacManPosition = getPositionOf(pacMan)

    pacManInterval = setInterval(() => {
        if (!isTheCharacterBlocked(pacManPosition, to)) {
            const dot = document.querySelectorAll(".dot").forEach(function (dot) {
                if (dot.style.left === pacManPosition.left + "px" && dot.style.top === pacManPosition.top + "px" && dot.style.display !== "none" )
                {
                    score++;
                    dot.style.display = "none";

                    document.getElementById('playerScore').innerHTML=score;
                }
            })
            switch (to) {
                case 'toLeft':
                    pacMan.style.left = pacManPosition.left === 0 ? 900 + "px" :
                        pacManPosition.left - 100 + "px"
                    break
                case 'toRight':
                    pacMan.style.left = pacManPosition.left === 900 ? 0 :
                        pacManPosition.left + 100 + "px"
                    break
                case 'toTop':
                    pacMan.style.top = pacManPosition.top - 100 + "px"
                    break
                case 'toBottom':
                    pacMan.style.top = pacManPosition.top + 100 + "px"
                    break
            }
            pacManPosition = getPositionOf(pacMan)
        }
    }, 300)

    // Le personnage ne bougera que s’il n’est pas bloqué contre un mur
}

const moveRedGhost = (to) => {
    clearInterval(redGhostInterval)

    let redGhostPosition = getPositionOf(redGhost)

    const randomInt = Math.floor(Math.random()* 4)
    const randomDirection = directions[randomInt]

    // DEBUT BONUS
    // let filtredDirections = directions.filter((direction) => {
    // direction !== currentRedGhostDirection})

    redGhostInterval = setInterval(()=> {
        // currentRedGhostDirection = randomDirection
        if (!isTheCharacterBlocked(redGhostPosition, randomDirection)) {
            switch (randomDirection) {
                case 'toLeft':
                    redGhost.style.left = redGhostPosition.left === 0 ? 900 + "px" :
                        redGhostPosition.left - 100 + "px";
                    break;
                case 'toRight':
                    redGhost.style.left = redGhostPosition.left === 900 ? 0 :
                        redGhostPosition.left + 100 + "px";
                    break;
                case 'toTop':
                    redGhost.style.top = redGhostPosition.top - 100 + "px";
                    break;
                case 'toBottom':
                    redGhost.style.top = redGhostPosition.top + 100 + "px";
                    break
            }
            redGhostPosition = getPositionOf(redGhost)
        } else {
            moveRedGhost()
            return
        }
    }, 300)
};


const moveBlueGhost = (to) => {
    clearInterval(blueGhostInterval)

    let blueGhostPosition = getPositionOf(blueGhost)

    const randomInt = Math.floor(Math.random()* 4)
    const randomDirection = directions[randomInt]

    // DEBUT BONUS
    // let filtredDirections = directions.filter((direction) => {
    // direction !== currentRedGhostDirection})


    blueGhostInterval = setInterval(()=> {
        // currentRedGhostDirection = randomDirection
        if (!isTheCharacterBlocked(blueGhostPosition, randomDirection)) {
            switch (randomDirection) {
                case 'toLeft':
                    blueGhost.style.left = blueGhostPosition.left === 0 ? 900 + "px" :
                        blueGhostPosition.left - 100 + "px";
                    break;
                case 'toRight':
                    blueGhost.style.left = blueGhostPosition.left === 900 ? 0 :
                        blueGhostPosition.left + 100 + "px";
                    break;
                case 'toTop':
                    blueGhost.style.top = blueGhostPosition.top - 100 + "px";
                    break;
                case 'toBottom':
                    blueGhost.style.top = blueGhostPosition.top + 100 + "px";
                    break
            }
            blueGhostPosition = getPositionOf(blueGhost)
        } else {
            moveBlueGhost();
            return
        }
    }, 300)
};

const moveGreenGhost = (to) => {
    clearInterval(greenGhostInterval)

    let greenGhostPosition = getPositionOf(greenGhost)

    const randomInt = Math.floor(Math.random()* 4)
    const randomDirection = directions[randomInt]

    // DEBUT BONUS
    // let filtredDirections = directions.filter((direction) => {
    // direction !== currentRedGhostDirection})


    greenGhostInterval = setInterval(()=> {
        // currentRedGhostDirection = randomDirection
        if (!isTheCharacterBlocked(greenGhostPosition, randomDirection)) {
            switch (randomDirection) {
                case 'toLeft':
                    greenGhost.style.left = greenGhostPosition.left === 0 ? 900 + "px" :
                        greenGhostPosition.left - 100 + "px";
                    break;
                case 'toRight':
                    greenGhost.style.left = greenGhostPosition.left === 900 ? 0 :
                        greenGhostPosition.left + 100 + "px";
                    break;
                case 'toTop':
                    greenGhost.style.top = greenGhostPosition.top - 100 + "px";
                    break;
                case 'toBottom':
                    greenGhost.style.top = greenGhostPosition.top + 100 + "px";
                    break
            }
            greenGhostPosition = getPositionOf(greenGhost)
        } else {
            moveGreenGhost();
            return
        }
    }, 250)
};


addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 37:
            movePacMan('toLeft');
            break;
        case 39:
            movePacMan('toRight');
            break;
        case 38:
            movePacMan('toTop');
            break;
        case 40:
            movePacMan('toBottom');
            break;
    }

});
const isTheCharacterBlocked = (characterPositon, movingDirection) => {
    // Nous déterminons quel tableau est concerné par la direction prise
    let blockedSquares;
    switch (movingDirection) {
        case 'toLeft':
            blockedSquares = blockedSquaresToLeft;
            break;
        case 'toRight':
            blockedSquares = blockedSquaresToRight;
            break;
        case 'toTop':
            blockedSquares = blockedSquaresToTop;
            break;
        case 'toBottom':
            blockedSquares = blockedSquaresToBottom;
            break
    }

    // Nous retournons un booléen indiquant si la position du personnage
    // est référencéE dans le tableau
    return blockedSquares.some(square => {
        const topsAreEquals = characterPositon.top === square.top;
        const leftsAreEquals = characterPositon.left === square.left;
        return topsAreEquals && leftsAreEquals
    })
};

const displayDots = () => {
    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            const dot = document.createElement('div')
            dot.className = 'dot'
            dot.style.left = col * 100 + 'px'
            dot.style.top = row * 100 + 'px'
            map.insertBefore(dot, pacMan)
        }
    }

    // FAIRE DISPARAITRE LES POINTS
}

const start = () =>{
    menu.style.display = 'none';
    map.style.diplay = 'block';
    moveRedGhost();
    moveBlueGhost();
    moveGreenGhost();
    displayDots();
}

start();
// A SUPPRIMER APRÈS


// Après avoir créée l'input dans le HTML, nous le référençerons tout en haut de main.js

//
// NOUS CRÉEONS UNE VARIABLE VIDE AU DEBUT
// let username
//
// submit.addEventListener('click', (e) =>{
//     e.preventDefault()
//     VERIFIER ICI QUE inputName.value CONTIENT AU MOINS TROIS CARACTÈRES
//     username = inputName.value
//     LANCER LA PARTIE CII
//         start()
// })