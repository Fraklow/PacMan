//TOMAR EL CANVA DE REFERENCIA
const canvas = document.getElementById("GameCanva")
const ctx = canvas.getContext("2d")

//BLOQUES
//TAMAÑO DE BLOQUES
const bloqSize = 28
//MAPAC
const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,0,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,0,0,1,0,1,0,0,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,0,0,1,0,1,0,0,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,0,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

//MOVIMIENTO DE PACMAN
let pacman = {
    x: bloqSize * 1.5,
    y: bloqSize * 1.5,
    size: 10,
    mouthOpen: 0.2, //APERTURA INICAL DE PACMAN
    mouthSpeed: 0.03, //LA VELOCIDAD EN ABRIR Y CERRAR LA BOCA
    direction: 0, //MOVIMIENTOS
    dx: 0,
    dy: 0,
    speed: 1.3
}

//LLAMAR A LAS TECLAS
document.addEventListener("keydown", (e) =>{
    if (e.key === "ArrowRight") {
        pacman.dx = pacman.speed
        pacman.dy = 0
        pacman.direction = 0
    }
    if (e.key === "ArrowDown") {
        pacman.dx = 0
        pacman.dy = pacman.speed
        pacman.direction = 1
    }
    if (e.key === "ArrowLeft") {
        pacman.dx = -pacman.speed
        pacman.dy = 0
        pacman.direction = 2
    }
    if (e.key === "ArrowUp") {
        pacman.dx = 0
        pacman.dy = -pacman.speed
        pacman.direction = 3
    }
})

//DIBUJAR MAPA
function drawMap() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === 1) {
                ctx.fillStyle = "blue"
                ctx.fillRect(col * bloqSize, row * bloqSize, bloqSize, bloqSize)
            }
        }
    }
}

//DIBUJAR PACMAN
function drawPac() {
    let mouth = pacman.mouthOpen
    let dir = pacman.direction * Math.PI / 2

    let startAngle = dir + mouth
    let endAngle = dir + (2 * Math.PI - mouth)

    //SEGUN LA DIRECCION SE ROTA LA BOCA
    if (pacman.direction === 0) { //DERECHA
        startAngle = pacman.mouthOpen
        endAngle = 2 * Math.PI - pacman.mouthOpen
    } else if (pacman.direction === 1) { //ABAJO
        startAngle = 0.5 * Math.PI + pacman.mouthOpen
        endAngle = 0.5 * Math.PI - pacman.mouthOpen + 2 * Math.PI
    } else if (pacman.direction === 2) { //IZQUIERDA
        startAngle = Math.PI + pacman.mouthOpen
        endAngle = Math.PI - pacman.mouthOpen
    } else if (pacman.direction === 3) { //ARRIBA
        startAngle = 1.5 * Math.PI + pacman.mouthOpen
        endAngle = 1.5 * Math.PI - pacman.mouthOpen + 2 * Math.PI
    }

    //DIBUJAR A PACMAN
    ctx.fillStyle = "yellow"
    ctx.beginPath()
    ctx.arc(pacman.x, pacman.y, pacman.size, startAngle, endAngle)
    ctx.lineTo(pacman.x, pacman.y)
    ctx.fill()
}

//PUNTOS
let Score = 0
const mapPoints = []
const normalPoints = 10
const powerPellet = 50
const pelletSize = 6

class Dot {
    constructor(x, y, value, isPowerPellete = false) {
        this.x = x
        this.y = y
        this.value = value
        this.isPowerPellete = isPowerPellete
        this.eaten = false
        this.size = isPowerPellete ? pelletSize : 3
    }
}

function startPoint() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const x = col * bloqSize + bloqSize / 2
            const y = row * bloqSize + bloqSize / 2

            if (map[row][col] === 0) {
                mapPoints.push(new Dot(x, y, normalPoints))
            } else if (map[row][col] === 2) {
                mapPoints.push(new Dot(x, y, powerPellet, true))
            }
        }
    }
}

function drawPoint() {
    mapPoints.forEach(dot => {
        if(!dot.eaten) {
            ctx.fillStyle = dot.isPowerPellete ? "rgba(255, 255, 255, 0.7)" : "white"
            ctx.beginPath()
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
            ctx.fill()
        }
    })
}

function checkEatPoint() {
    for (let i = mapPoints.length - 1; i >= 0; i--) {
        const dot = mapPoints[i]

        if(!dot.eaten) {
            const dx = pacman.x - dot.x
            const dy = pacman.y - dot.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < pacman.size + dot.size) {
                dot.eaten = true
                Score += dot.value
                console.log("Punto Comido! score " + {Score})

                if (dot.isPowerPellete) {
                    activeModeSuper(8000)
                }
            }
        }
    }
}

//ACTIVAR MODO SUPER
function activeModeSuper(durationMs) {
    console.log("SUPERPODER ACTIVADO - Tiempo de duracion", durationMs / 1000, "segundos")
}

//DIBUJAR LOS PUNTOS    
function drawScore() {
    ctx.fillStyle = "white"
    ctx.font = "bold 15px Arial"
    ctx.fillText(`SCORE: ${Score}`, 1, bloqSize * 0.6)
}

startPoint()

//DONDE SE PUEDE MOVER
function move(x, y) {
    let r = pacman.size

    let moveLeft = Math.floor((x - r) / bloqSize)
    let moveRight = Math.floor((x + r) / bloqSize)
    let moveUp = Math.floor((y - r) / bloqSize)
    let moveDown = Math.floor((y + r) / bloqSize)

    if (
        map[moveUp][moveLeft] === 1 ||
        map[moveUp][moveRight] === 1 ||
        map[moveDown][moveLeft] === 1 ||
        map[moveDown][moveRight] === 1
    ) {
        return false
    }
    return true
}

//CENTRAR PACMAN
function alignCenter() {
    let r = pacman.size

    if (pacman.dx !== 0) {
        let centerY = Math.floor(pacman.y / bloqSize) * bloqSize + bloqSize / 2
        pacman.y += (centerY - pacman.y) * 0.5
    }
    if (pacman.dy !== 0) {
        let centerX = Math.floor(pacman.x / bloqSize) * bloqSize + bloqSize / 2
        pacman.x += (centerX - pacman.x) * 0.5

    }
}

//ANIMAR EL PACMAN
function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //MOVER PACMAN
    let newX = pacman.x + pacman.dx
    let newY = pacman.y + pacman.dy

    //COLISIONES
    if (move(newX, pacman.y)) {
        pacman.x = newX
    }
    if (move(pacman.x, newY)) {
        pacman.y = newY
    }

    checkEatPoint()

    drawMap()
    drawPoint()
    drawPac()
    drawScore()
    alignCenter()

    //ANIMACION DE LA BOCA
    pacman.mouthOpen += pacman.mouthSpeed
    if (pacman.mouthOpen > 0.4 || pacman.mouthOpen < 0.05) {
        pacman.mouthSpeed *= -1
    }
    
    
    requestAnimationFrame(animation)
}

animation()