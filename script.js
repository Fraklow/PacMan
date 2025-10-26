//DEFINIR EL MUNDO
const canvas = document.getElementById("GameCanva")
const ctx = canvas.getContext("2d")
//tamaño de bloque
const bloqSize = 28
//mapa 
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

//DEFINIR PERSONAJES
let pacman = {
    x: bloqSize * 1.5,
    y: bloqSize * 1.5,
    size: 10,
    mouthOpen: 0.2, //apertura inicial de pacman
    mouthSpeed: 0.03, //velocidad en abrir y cerrar boca
    direction: 0, //movimientos
    dx: 0,
    dy: 0,
    speed: 1.3
}
//llamar teclas
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
//dibujar pacman
function drawPac() {
    let mouth = pacman.mouthOpen
    let dir = pacman.direction * Math.PI / 2

    let startAngle = dir + mouth
    let endAngle = dir + (2 * Math.PI - mouth)

    //segun la direccion rota la boca
    if (pacman.direction === 0) { //derecha
        startAngle = pacman.mouthOpen
        endAngle = 2 * Math.PI - pacman.mouthOpen
    } else if (pacman.direction === 1) { //abajo
        startAngle = 0.5 * Math.PI + pacman.mouthOpen
        endAngle = 0.5 * Math.PI - pacman.mouthOpen + 2 * Math.PI
    } else if (pacman.direction === 2) { //izquierda
        startAngle = Math.PI + pacman.mouthOpen
        endAngle = Math.PI - pacman.mouthOpen
    } else if (pacman.direction === 3) { //arriba
        startAngle = 1.5 * Math.PI + pacman.mouthOpen
        endAngle = 1.5 * Math.PI - pacman.mouthOpen + 2 * Math.PI
    }

    //dibujar pacman
    ctx.fillStyle = "yellow"
    ctx.beginPath()
    ctx.arc(pacman.x, pacman.y, pacman.size, startAngle, endAngle)
    ctx.lineTo(pacman.x, pacman.y)
    ctx.fill()
}
//fantasmas
class ghost {
    constructor(x, y, color, speed, scatterCorner, size = 10) {
        this.x = x * bloqSize + bloqSize / 2
        this.y = y * bloqSize + bloqSize / 2
        this.size = size
        this.speed = speed
        this.color = color
        this.scatteCorner = scatterCorner
        this.mode = "SCATTER"
        this.dx = 0
        this.dy = 0
    }
}
const ghosts = [
    //blinky
    new ghost(9, 8, "red", 1.3, {x: map[0].length * bloqSize, y: 0}),
    //pinky
    new ghost(9, 9, "pink", 1.2, {x: 0, y: 0}),
    //inky
    new ghost(9, 10, "cyan", 1.1, {x: map[0].length * bloqSize, y: map.length * bloqSize}),
    //clyde
    new ghost(8, 9, "orange", 1.1, {x: 0, y: map.length * bloqSize})
]

//DEFINIR INTERRACION
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
//donde se puede mover
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
//centrar pacman
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
//puntos y score
let Score = 0
const mapPoints = []
const normalPoints = 10
const powerPellet = 50
const pelletSize = 6
//clase dot (punto)
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
//inicia puntos en el mapa
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
//dibujar puntos
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
//comprobar y comer puntos
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
//activar super
function activeModeSuper(durationMs) {
    console.log("SUPERPODER ACTIVADO - Tiempo de duracion", durationMs / 1000, "segundos")
}
//dibujar puntacion
function drawScore() {
    ctx.fillStyle = "white"
    ctx.font = "bold 15px Arial"
    ctx.fillText(`SCORE: ${Score}`, 1, bloqSize * 0.6)
}
// dibujar fantamas
function drawGhost() {
    ghosts.forEach(ghost => {
        ctx.fillStyle = ghost.color
        ctx.beginPath()
        //cabeza superior
        ctx.arc(ghost.x, ghost.y, ghost.size, Math.PI, 2 * Math.PI)
        let baseLineY = ghost.y + ghost.size
        ctx.lineTo(ghost.x + ghost.size, baseLineY)
        let footSize = ghost.size / 3
        //cuerpo
        ctx.arc(ghost.x + footSize, baseLineY, footSize, 0, Math.PI, true)
        // ctx.arc(ghost.x, baseLineY, footSize, 0, Math.PI, true)
        ctx.arc(ghost.x - footSize, baseLineY, footSize, 0, Math.PI, true)
        // ctx.lineTo(ghost.x - ghost.size, ghost.y)
        ctx.closePath()
        ctx.fill()

        //dibujar ojos
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(ghost.x - ghost.size / 3, ghost.y - ghost.size / 3, ghost.size / 3, 0, Math.PI * 2)
        ctx.arc(ghost.x + ghost.size / 3, ghost.y - ghost.size / 3, ghost.size / 3, 0, Math.PI * 2)
        ctx.fill()
        //pupila
        ctx.fillStyle = "blue"
        ctx.beginPath()
        ctx.arc(ghost.x - ghost.size / 3, ghost.y - ghost.size / 3, ghost.size / 6, 0, Math.PI * 2)
        ctx.arc(ghost.x + ghost.size / 3, ghost.y - ghost.size / 3, ghost.size / 6, 0, Math.PI * 2)
        ctx.fill()
    })
}

startPoint()

//EJECUCION DEL JUEGO
function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //movimiento pacman
    let newX = pacman.x + pacman.dx
    let newY = pacman.y + pacman.dy

    //colision
    if (move(newX, pacman.y)) {
        pacman.x = newX
    }
    if (move(pacman.x, newY)) {
        pacman.y = newY
    }

    checkEatPoint()

    // ghost.forEach(g => g.move(pacman, ghost[0]))

    drawMap()
    drawPoint()
    drawPac()
    drawGhost()
    drawScore()
    alignCenter()

    //animacion
    pacman.mouthOpen += pacman.mouthSpeed
    if (pacman.mouthOpen > 0.4 || pacman.mouthOpen < 0.05) {
        pacman.mouthSpeed *= -1
    }
    
    
    requestAnimationFrame(animation)
}

animation()