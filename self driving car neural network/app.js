carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200

networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300

const carCtx = carCanvas.getContext("2d")
const networkCtx = networkCanvas.getContext("2d")
const road = new Road(carCanvas.width/2, carCanvas.width * .9)

const N = 100
const cars = generateCars(N)
let bestCar = cars[0]
if(localStorage.getItem("bestBrain")){
    for(let i=0; i<cars.length; i++){
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        )
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain, 0.11)
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -1200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1350, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -1500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -1700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -1900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -2100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -2100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -2300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -2300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -2500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -2500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -2700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -2700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -2900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -2900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -3050, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -3200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -3200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -3400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -3400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -3700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -3900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -3900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -4100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -4400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -4600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -4600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -4800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -5000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -5200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -5200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -5400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -5600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -5600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -5900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -5900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -6100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -6300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -6300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -6500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -6500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -6800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -7000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -7000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -7200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -7400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -7600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -7600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -7800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -8000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -8000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -8200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -8200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -8400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -8400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -8600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -8600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -8750, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -9000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -9000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -9200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -9400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -9400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -9600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -9600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -9800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -9800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -10000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -10000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -10200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -10200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -10400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -10400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -10600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -10800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -10800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -11000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -11200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -11200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -11400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -11400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -11600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -11600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -11800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -11800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -12000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -12150, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -12150, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -12300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -12450, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -12450, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -12600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -12600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -12800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -13000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -13200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -13200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -13400, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -13600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -13600, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -13800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -13800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -14000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -14000, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -14200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -14350, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -14350, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -14500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -14500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -14700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -14700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -14900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -14900, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -15050, 30, 50, "DUMMY", 2),
]

animate()

function save(){
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain))
}
function discard(){
    localStorage.removeItem("bestBrain")
}

function generateCars(N){
    const cars = []
    for(let i = 1; i <= N; i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"))
    }
    return cars
}

function animate(time){
    for(let i=0; i < traffic.length; i++){
        traffic[i].update(road.borders, [])
    }
    for(let i=0; i < cars.length; i++){
        cars[i].update(road.borders, traffic)
    }

    bestCar = cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    )
    carCanvas.height = window.innerHeight
    networkCanvas.height = window.innerHeight

    carCtx.save()
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7)
    road.draw(carCtx)

    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(carCtx, "red")
    }
        
    carCtx.globalAlpha =.2
    for(let i=0; i < cars.length; i++){
        cars[i].draw(carCtx, "blue")
    }
    carCtx.globalAlpha = 1
    bestCar.draw(carCtx, "blue", true)

    carCtx.restore()

    networkCtx.lineDashOffset = -time/50
    Visualizer.drawNetwork(networkCtx, bestCar.brain)
    requestAnimationFrame(animate)
}