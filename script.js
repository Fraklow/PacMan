//DEFINIR EL MUNDO
const canvas = document.getElementById("GameCanva")
const ctx = canvas.getContext("2d")
//tamaño de bloque
const bloqSize = 28
//mapa 
const map = [
   //1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //1
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1], //2
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], //3
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], //4
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //5
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1], //6
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], //7
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1], //8
    [1, 3, 3, 3, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 3, 3, 3, 1], //9
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 3, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1], //10
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 1], //11
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 3, 3, 3, 1, 0, 1, 0, 1, 1, 1, 1, 1], //12
    [1, 3, 3, 3, 1, 0, 1, 0, 1, 1, 3, 1, 1, 0, 1, 0, 1, 3, 3, 3, 1], //13
    [1, 3, 3, 3, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 3, 3, 3, 1], //14
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1], //15
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //16
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], //17
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], //18
    [1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1], //19
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //20
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1], //21
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1], //22
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  //23
]



//PACMAN
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
//controles de movimiento
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
//FANTASMAS
class ghost {
    constructor(x, y, color, speed, name) {
        this.x = x * bloqSize + bloqSize / 2
        this.y = y * bloqSize + bloqSize / 2
        this.color = color
        this.speed = speed
        this.name = name
        this.dx = 0
        this.dy = 0
        this.mode = "CHASE" // o "SCATTER"
        this.size = 12
        this.frightened = false
        this.dead = false
        this.homeX = x * bloqSize + bloqSize / 2
        this.homeY = y * bloqSize + bloqSize / 2
    }

    // Verifica si puede moverse a una coordenada
    canMove(newX, newY) {
        const col = Math.floor(newX / bloqSize)
        const row = Math.floor(newY / bloqSize)
        if (row < 0 || col < 0 || row >= map.length || col >= map[0].length) return false
        return map[row][col] !== 1
    }

    // Decide hacia dónde moverse según el modo
    getTarget(pacman, blinky) {
        switch (this.name) {
            case "blinky":
                return { x: pacman.x, y: pacman.y }
            case "pinky":
                return { x: pacman.x + pacman.dx * bloqSize * 4, y: pacman.y + pacman.dy * bloqSize * 4 }
            case "inky":
                if (!blinky) return { x: pacman.x, y: pacman.y }
                const vecX = (pacman.x + pacman.dx * bloqSize * 2) - blinky.x
                const vecY = (pacman.y + pacman.dy * bloqSize * 2) - blinky.y
                return { x: pacman.x + vecX, y: pacman.y + vecY }
            case "clyde":
                const dist = Math.hypot(this.x - pacman.x, this.y - pacman.y)
                if (dist < bloqSize * 4)
                    return { x: 0, y: canvas.height } // esquina inferior izquierda
                else
                    return { x: pacman.x, y: pacman.y }
        }
    }

    // Cambia dirección según posibles caminos
    chooseNewDirection(pacman, blinky) {
        const dirs = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 }
        ]

        const valid = dirs.filter(d => {
            const nx = this.x + d.dx * bloqSize
            const ny = this.y + d.dy * bloqSize
            return this.canMove(nx, ny)
        })

        if (valid.length === 0) return

        const target = this.getTarget(pacman, blinky)
        // Escoge la dirección que acerque más al objetivo
        let best = valid[0]
        let minDist = Infinity

        valid.forEach(v => {
            const nx = this.x + v.dx * bloqSize
            const ny = this.y + v.dy * bloqSize
            const dist = Math.hypot(nx - target.x, ny - target.y)
            if (dist < minDist) {
                minDist = dist
                best = v
            }
        })

        this.dx = best.dx
        this.dy = best.dy
    }

    // Movimiento completo del fantasma
    move(pacman, blinky) {
        const newX = this.x + this.dx * this.speed
        const newY = this.y + this.dy * this.speed

        // Si puede avanzar, se mueve
        if (this.canMove(newX, newY)) {
            this.x = newX
            this.y = newY

            // Verificar si está centrado en una celda
            const cellX = Math.round(this.x / bloqSize) * bloqSize + bloqSize / 2
            const cellY = Math.round(this.y / bloqSize) * bloqSize + bloqSize / 2
            const distX = Math.abs(this.x - cellX)
            const distY = Math.abs(this.y - cellY)
            const tolerance = 1.5

            // Si está centrado, chance de girar
            if (distX < tolerance && distY < tolerance) {
                if (Math.random() < 0.2) this.chooseNewDirection(pacman, blinky)
            }
        } else {
            // Si choca, cambia dirección
            this.chooseNewDirection(pacman, blinky)
        }
    }
}


//crear fantasmas
const ghosts = [
    new ghost(10, 12, "red", 1.3, "blinky"),
    new ghost(10, 11, "pink", 1.2, "pinky"),
    new ghost(10, 9, "cyan", 1.1, "inky"),
    new ghost(9, 10, "orange", 1.1, "clyde")
]

// Inicializa su dirección después de crearlos
ghosts.forEach(g => g.chooseNewDirection(pacman, ghosts[0]))
ghosts.forEach(g => {
  if (g.dx === 0 && g.dy === 0) g.dx = 1 // si no encontró dirección, que empiece a la derecha
})

//MAPA Y MOVIMIENTO
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
  const r = pacman.size
  const targetY = Math.floor(pacman.y / bloqSize) * bloqSize + bloqSize / 2
  const targetX = Math.floor(pacman.x / bloqSize) * bloqSize + bloqSize / 2

  if (pacman.dx !== 0)
      pacman.y += (targetY - pacman.y) * 0.3
  if (pacman.dy !== 0)
      pacman.x += (targetX - pacman.x) * 0.3
}

//PUNTOS Y SCORE
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
                console.log("Punto Comido! score: " + Score)

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

    ghosts.forEach(g => {
        g.frightened = true
        g.color = "blue"
    })

    setTimeout(() => {
        ghosts.forEach(g => {
            g.frightened = false
            g.color = (g.name === "blinky") ? "red":
                      (g.name === "pinky") ? "pink":
                      (g.name === "inky") ? "cyan": "orange" 
        })
        console.log("SUPERPODER TERMINADO")
    }, durationMs)
}
//dibujar puntacion
function drawScore() {
    ctx.fillStyle = "white"
    ctx.font = "bold 15px Arial"
    ctx.fillText(`SCORE: ${Score}`, 1, bloqSize * 0.6)
}

//DIBUJO DE FAMTAMAS
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

//BUCLE PRINCIPAL
startPoint()

let animationId

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

    ghosts.forEach(g => {
        g.move(pacman, ghosts[0])
    })

    function checkCollisionGhost() {
        ghosts.forEach(g => {
            const dx = pacman.x - g.x
            const dy = pacman.y - g.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < pacman.size + g.size) {
                if (g.frightened) {
                    g.dead = true
                    Score += 200
                    g.x = g.homeX
                    g.y = g.homeY
                    g.frightened = false
                    g.color = "white"
                    console.log(`${g.name.toUpperCase()} comido! +200`)
                } else {
                    console.log("Pac-Man ha muerto!")
                }
            }
        })
    }

    checkCollisionGhost()
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
    
    
    animationId = requestAnimationFrame(animation)

    ghosts.forEach(g => {
        const dx = g.x - pacman.x
        const dy = g.y - pacman.y
        const dist  = Math.hypot(dx, dy)

        if (dist < pacman.size + g.size - 3) {
            cancelAnimationFrame(animationId)
            console.log("¡Pac-Man fue atrapado por " + g.name + "!")
            ctx.fillStyle = "white"
            ctx.font = "20px Arial"
            ctx.fillText("¡Pac-Man murió!", canvas.width / 2 - 70, canvas.height / 2)
            setTimeout(() => {
                location.reload() // reinicia la página
            }, 2000)
        }
    })

}

animation()