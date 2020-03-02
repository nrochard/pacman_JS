// Variables globales
const map = document.querySelector('.map')
const pacMan = document.querySelector('img[src="./img/pacman.gif"]')
const redGhost = document.querySelector('img[src="./img/redGhost.png"]')
const pinkGhost = document.querySelector('img[src="./img/pinkGhost.png"]')
const blueGhost = document.querySelector('img[src="./img/blueGhost.png"]')
const button = document.querySelector('button')
const menu = document.getElementById('menu')
const name = document.getElementById('name')

let score = 0

let pacManInterval
let redGhostInterval
let blueGhostInterval
let pinkGhostInterval


let currentRedGhostDirection

const directions = [ 'toLeft', 'toRight', 'toTop', 'toBottom' ]

console.log('jeu lancé')

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
]

const getPositionOf = (element) => {
    // const top = parseInt(getComputedStyle(element, null).getPropertyValue('top'), 10)
    // const left = parseInt(getComputedStyle(element, null).getPropertyValue('left'), 10)
    const top = Number(element.dataset.top)
    const left = Number(element.dataset.left)
    return { top, left }
}

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

// Mouvements du clavier
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

            isGameOver()

            const meal = removeDot(pacManPosition.top, pacManPosition.left)
            if (meal) score++
            console.log('score:', score)
        }
    }, 250)
}

const moveRedGhost = () => {
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
            moveRedGhost() // La fonction est relancée si le fantôme est bloqué
            return
        }
    }, 250)
}


const moveBlueGhost = () => {
    clearInterval(blueGhostInterval)

    let blueGhostPosition = getPositionOf(blueGhost)

    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

    blueGhostInterval = setInterval(() => {
        currentBlueGhostDirection = randomDirection

        if (!isTheCharacterBlocked(blueGhostPosition, randomDirection)) {
            move(blueGhost, blueGhostPosition, randomDirection)
            blueGhostPosition = getPositionOf(blueGhost)
        } else {
            moveBlueGhost() // La fonction est relancée si le fantôme est bloqué
            return
        }
    }, 250)
}


const movePinkGhost = () => {
    clearInterval(pinkGhostInterval)
    pinkGhostInterval = setInterval(() => {
        moveToPacMan(pinkGhost)
    }, 500)
}


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



const moveToPacMan = (ghost) => {
    const pacManPosition = getPositionOf(pacMan)
    const ghostPosition = getPositionOf(ghost)
    const delta = getDelta(pacManPosition, ghostPosition)
    console.log('delta:', delta)
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

const isGameOver = () => {
    const redGhostPosition = getPositionOf(redGhost)
    const pinkGhostPosition = getPositionOf(pinkGhost)
    const pacManPosition = getPositionOf(pacMan)
    if ((redGhostPosition.top === pacManPosition.top && redGhostPosition.left === pacManPosition.left) 
        || (pinkGhostPosition.top === pacManPosition.top && pinkGhostPosition.left === pacManPosition.left))
        {
        console.log('GAME OVER')
        return true
    }
    return false
}

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

    // Reste à faire disparaître les 10 pac-gommes superflues
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



button.addEventListener('click', evt => {
    evt.preventDefault()
    if (name.value.length > 3)
    {
        menu.style.display = 'none';
        start();
    }
})


const removeDot = (top, left) => {
    const dot = document.querySelector(`.dot[data-top="${ top }"][data-left="${ left }"]`)
    if (dot) map.removeChild(dot)
    return dot
}

const start = () => {
    moveRedGhost()
    movePinkGhost()
    moveBlueGhost()
    displayDots()
}

// start() // À supprimer quand le submit.addEventListener('click', (e) => {}) sera implémenté
