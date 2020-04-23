// Variables globales
const map = document.querySelector('.map')
const pacMan = document.querySelector('img[src="assets/img/pacman.gif"]')
const redGhost = document.querySelector('img[src="assets/img/redGhost.png"]')
const pinkGhost = document.querySelector('img[src="assets/img/pinkGhost.png"]')
const blueGhost = document.querySelector('img[src="assets/img/blueGhost.png"]')

let score = 0
let level = 1;

document.getElementById('playerScore').innerHTML=score;
document.getElementById('level').innerHTML=level;

let pacManInterval
let redGhostInterval
let blueGhostInterval
let pinkGhostInterval


let currentRedGhostDirection

const directions = [ 'toLeft', 'toRight', 'toTop', 'toBottom' ]

const maxSize = 1000
const mqlMaxWidth = window.matchMedia(`(max-width: ${maxSize}px)`)
const mqlMaxHeight = window.matchMedia(`(max-height: ${maxSize}px)`)
const mqlOrientation = window.matchMedia('(orientation: portrait)')

const sizeUnit = () => {
    let sizeUnit = 'px'
    if (isSmallScreen()) {
        sizeUnit = isPortraitOrientation() ? 'vw' : 'vh'
    }
    return sizeUnit
}
const isSmallScreen = () => {
    const mql = isPortraitOrientation() ? mqlMaxWidth : mqlMaxHeight
    return mql.matches
}
const isPortraitOrientation = () => {
    const mql = mqlOrientation
    return mql.matches
}
const pxToViewportSize = (px) => {
    return 100 * px / maxSize
}
const rearrange = element => {
    element.style.top = isSmallScreen() ? pxToViewportSize(element.dataset.top) + sizeUnit() : element.dataset.top + sizeUnit()
    element.style.left = isSmallScreen() ? pxToViewportSize(element.dataset.left) + sizeUnit() : element.dataset.left + sizeUnit()
}
const rearrangeElements = () => {
    elements = document.querySelectorAll('[data-top][data-left]')
    elements.forEach(element => rearrange(element))
}

mqlMaxWidth.addListener(e => rearrangeElements())
mqlMaxHeight.addListener(e => rearrangeElements())
mqlOrientation.addListener(e => rearrangeElements())

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
];

// Fonction pour connaître la position d'un personnage
const getPositionOf = (element) => {
    // const top = parseInt(getComputedStyle(element, null).getPropertyValue('top'), 10)
    // const left = parseInt(getComputedStyle(element, null).getPropertyValue('left'), 10)
    const top = Number(element.dataset.top)
    const left = Number(element.dataset.left)
    return { top, left }
}

//Fonction pour créer les collisions entre les personnages et les murs
const isTheCharacterBlocked = (characterPositon, movingDirection) => {
    let blockedSquares
    switch (movingDirection) {
        case 'toLeft':
            blockedSquares = blockedSquaresToLeft
            break
        case 'toRight':
            blockedSquares = blockedSquaresToRight
            break
        case 'toTop':
            blockedSquares = blockedSquaresToTop
            break
        case 'toBottom':
            blockedSquares = blockedSquaresToBottom
            break
    }

    return blockedSquares.some(square => {
        const topsAreEquals = characterPositon.top === square.top
        const leftsAreEquals = characterPositon.left === square.left
        return topsAreEquals && leftsAreEquals
    })
}

// Fonction de déplacement du Pacman
const movePacMan = (to) => {
    clearInterval(pacManInterval)

    pacMan.className = to

    let pacManPosition = getPositionOf(pacMan)

    pacManInterval = setInterval(() => {
        // PACMAN MANGE LES PAC-GOMME SUR LESQUELLES IL PASSE
        // créer variable let score tout haut du code
        // Récupérer la position de Pac-Man
        // Construire un tableau des positions de tous les points présents sur la carte :
        //        - document.querySelectorAll('.dot')
        //        - supprimer du document le .dot sur lesquelles se trouve Pac-Man, par exemple avec un .forEach()
        // incrémenter le score

        if (!isTheCharacterBlocked(pacManPosition, to)) {
            move(pacMan, pacManPosition, to)

            pacManPosition = getPositionOf(pacMan)

            if (isGameOver()){
                document.getElementById('score').value = score
                document.getElementById('formScore').submit();
                // document.location.href="views/game_over.php";
            }


            const meal = removeDot(pacManPosition.top, pacManPosition.left)
            if (meal) score++;
            document.getElementById('playerScore').innerHTML=score;
            if (!(restDot())){
                level++;
                document.getElementById('level').innerHTML=level;
                start();
                alert("Next level ! Congratulations :)");
            }
        }
    }, 200)
}

// Fonction de déplacement aléatoire du fantôme rouge
const moveRedGhostRandom = () => {
    clearInterval(redGhostInterval)

    let redGhostPosition = getPositionOf(redGhost)

    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

    redGhostInterval = setInterval(() => {
        currentRedGhostDirection = randomDirection

        if (!isTheCharacterBlocked(redGhostPosition, randomDirection)) {
            move(redGhost, redGhostPosition, randomDirection)
            redGhostPosition = getPositionOf(redGhost)
        } else {
            moveRedGhostRandom() // La fonction est relancée si le fantôme est bloqué
            return
        }
    }, 300)
}

// Fonction de déplacement aléatoire du fantôme bleu
const moveBlueGhostRandom = () => {
    clearInterval(blueGhostInterval)

    let blueGhostPosition = getPositionOf(blueGhost)
    let timing  = 300;
    if (level === 1)
        timing = 300;
    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

    blueGhostInterval = setInterval(() => {
        currentBlueGhostDirection = randomDirection

        if (!isTheCharacterBlocked(blueGhostPosition, randomDirection)) {
            move(blueGhost, blueGhostPosition, randomDirection)
            blueGhostPosition = getPositionOf(blueGhost)
        } else {
            moveBlueGhostRandom() // La fonction est relancée si le fantôme est bloqué
            return
        }
    }, timing)
}

// Fonction de déplacement aléatoire du fantôme rose
const movePinkGhostRandom = () => {
    clearInterval(pinkGhostInterval)

    let pinkGhostPosition = getPositionOf(pinkGhost)
    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

    pinkGhostInterval = setInterval(() => {
        currentPinkGhostDirection = randomDirection

        if (!isTheCharacterBlocked(pinkGhostPosition, randomDirection)) {
            move(pinkGhost, pinkGhostPosition, randomDirection)
            pinkGhostPosition = getPositionOf(pinkGhost)
        } else {
            movePinkGhostRandom() // La fonction est relancée si le fantôme est bloqué
            return
        }
    }, 300)
}

// Fonction de déplacement du fantôme rose qui poursuit pacman
const movePinkGhost = () => {
    let timing = 570;
    if (level === 5)
        timing = 530;
    if (level === 8)
        timing = 500;
    clearInterval(pinkGhostInterval)
    pinkGhostInterval = setInterval(() => {
        moveToPacMan(pinkGhost)
    }, timing)
}

// Fonction de déplacement du fantôme bleu qui poursuit pacman
const moveBlueGhost = () => {
    let timing = 540;
    if (level === 6)
        timing = 500;
    if (level === 9)
        timing = 480;
    clearInterval(blueGhostInterval)
    blueGhostInterval = setInterval(() => {
        moveToPacMan(blueGhost)
    }, timing)
}

// Fonction de déplacement du fantôme rouge qui poursuit pacman
const moveRedGhost = () => {
    let timing = 510;
    if (level === 7)
        timing = 480;
    if (level === 10)
        timing = 450;
    clearInterval(redGhostInterval)
    redGhostInterval = setInterval(() => {
        moveToPacMan(redGhost)
    }, timing)
}

//Fonction de déplacement général
const move = (character, from, to) => {
    switch (to) {
        case 'toLeft':
            character.dataset.left = from.left === 0 ? 900 : from.left - 100
            character.style.left = isSmallScreen() ? pxToViewportSize(character.dataset.left) + sizeUnit() : character.dataset.left + sizeUnit()
            break
        case 'toRight':
            character.dataset.left = from.left === 900 ? 0 : from.left + 100
            character.style.left = isSmallScreen() ? pxToViewportSize(character.dataset.left) + sizeUnit() : character.dataset.left + sizeUnit()
            break
        case 'toTop':
            character.dataset.top = from.top - 100
            character.style.top = isSmallScreen() ? pxToViewportSize(character.dataset.top) + sizeUnit() : character.dataset.top + sizeUnit()
            break
        case 'toBottom':
            character.dataset.top = from.top + 100
            character.style.top = isSmallScreen() ? pxToViewportSize(character.dataset.top) + sizeUnit() : character.dataset.top + sizeUnit()
            break
    }
}


//Fonction qui permet aux fantômes de suivre le déplacement de Pacman
const moveToPacMan = (ghost) => {
    const pacManPosition = getPositionOf(pacMan)
    const ghostPosition = getPositionOf(ghost)
    const delta = getDelta(pacManPosition, ghostPosition)
    let direction
    if (delta.top === delta.left) direction = [delta.topDirection, delta.leftDirection][Math.floor(Math.random() * 2)]
    if (delta.topDirection === null) direction = delta.leftDirection
    else if (delta.leftDirection === null) direction = delta.topDirection
    else direction = delta.top < delta.left ? delta.topDirection : delta.leftDirection

    if (isTheCharacterBlocked(ghostPosition, direction)) {
        direction = direction === delta.topDirection ? delta.leftDirection : delta.topDirection
        if (direction === null) {
            let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection)
            direction = otherDirections[Math.floor(Math.random() * 2)]
        }
        console.log('direction:', direction)
    }

    while (isTheCharacterBlocked(ghostPosition, direction)) {
        let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection)
        direction = otherDirections[Math.floor(Math.random() * 2)]
    }
    move(ghost, ghostPosition, direction)
}

const getDelta = (pacManPosition, ghostPosition) => {
    const top = pacManPosition.top - ghostPosition.top
    const left = pacManPosition.left - ghostPosition.left
    let topDirection, leftDirection
    if (top === 0) topDirection = null
    else topDirection = top > 0 ? 'toBottom' : 'toTop'
    if (left === 0) leftDirection = null
    else leftDirection = left > 0 ? 'toRight' : 'toLeft'
    return { top, left, topDirection, leftDirection }
}

//Fonction qui compare la position de PacMan et ses fantômes
const isGameOver = () => {
    const redGhostPosition = getPositionOf(redGhost)
    const pinkGhostPosition = getPositionOf(pinkGhost)
    const blueGhostPosition = getPositionOf(blueGhost)
    const pacManPosition = getPositionOf(pacMan)
    if ((redGhostPosition.top === pacManPosition.top && redGhostPosition.left === pacManPosition.left)
        || (pinkGhostPosition.top === pacManPosition.top && pinkGhostPosition.left === pacManPosition.left) ||
        (blueGhostPosition.top === pacManPosition.top && blueGhostPosition.left == pacManPosition.left) )
    {
        console.log('GAME OVER')
        return true
    }
    return false
}

//Fonction qui permet de connaître le déplacement que le joueur souhaite effectuer
addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 37:
            movePacMan('toLeft')
            break
        case 39:
            movePacMan('toRight')
            break
        case 38:
            movePacMan('toTop')
            break
        case 40:
            movePacMan('toBottom')
            break
    }
})

//Fonction pour afficher les pacgommes sur le jeu
const displayDots = () => {
    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            const dot = document.createElement('div')
            dot.className = 'dot'
            dot.dataset.top = row * 100
            dot.dataset.left = col * 100
            dot.style.top = isSmallScreen() ? row * pxToViewportSize(100) + sizeUnit() : row * 100 + sizeUnit()
            dot.style.left = isSmallScreen() ? col * pxToViewportSize(100) + sizeUnit() : col * 100 + sizeUnit()
            map.insertBefore(dot, pacMan)
        }
    }

    //Permet de supprimer les pacgommes dans les murs
    removeDot(300, 0)
    removeDot(300, 100)
    removeDot(500, 0)
    removeDot(500, 100)
    removeDot(300, 800)
    removeDot(300, 900)
    removeDot(500, 800)
    removeDot(500, 900)
    removeDot(400, 400)
    removeDot(400, 500)
}

//Fonction pour savoir s'il reste des pacgommes à manger
const restDot = () => {
    const dots = document.querySelectorAll('.dot')
    return dots.length ? true : false
}

// Fonction pour supprimer les pacgommes
const removeDot = (top, left) => {
    const dot = document.querySelector(`.dot[data-top="${ top }"][data-left="${ left }"]`)
    if (dot) map.removeChild(dot)
    return dot
}

// Fonction de lancement du jeu
const start = () => {
    //Au premier niveau, Pac-Man est poursuivi par trois fantômes qui se déplacent de façon aléatoire,
    if (level === 1){
        moveRedGhostRandom()
        movePinkGhostRandom()
        moveBlueGhostRandom()
    }
    //Au deuxième niveau, un fantôme poursuit Pac-Man à vitesse réduite tandis que les deux autres fantômes se déplacent de manière aléatoire,
    if (level === 2){
        movePinkGhost()
        moveBlueGhostRandom()
        moveRedGhostRandom()
    }
    // Au troisième niveau, deux fantôme poursuivent Pac-Man à vitesse réduite tandis que le troisième fantômes se déplace de manière aléatoire,
    if (level === 3){
        movePinkGhost()
        moveBlueGhost()
        moveRedGhostRandom()
    }
    //À partir du quatrième niveau, les trois fantôme poursuivent Pac-Man à vitesse réduite.. et à chaque niveau supérieur la vitesse d'un des fantômes accélèrent
    if (level >= 4) {
        movePinkGhost()
        moveBlueGhost()
        moveRedGhost();
    }
    displayDots()
}

start();

