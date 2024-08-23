function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

document.write("<div class='grid'>")

let bigShipOrientation = rand(0, 1),
bigShipLocation,
leftBigShipLocation, 
rightBigShipLocation, 
playerErrors = 10,
win = false,
lose = false,
shipsDestroyed = 0,
totalAttacks = 0,
successfulAttacks = 0

for (let i = 1; i <= 25; i++) {
    document.write("<button name='" + i + "' onclick='shipAttack(" + i + ")'>" + i + "</button>")
}

function randShip() {
    if (bigShipOrientation === 0) {
        bigShipOrientation = "Horizontal"
    } else if (bigShipOrientation === 1) {
        bigShipOrientation = "Vertical"
    }

    if (bigShipOrientation === "Horizontal") {
        bigShipLocation = rand(6, 24)
        bigShipOrientation = (bigShipLocation === 1 || bigShipLocation === 5 || bigShipLocation === 6 || bigShipLocation === 10 || bigShipLocation === 11 || bigShipLocation === 15 || bigShipLocation === 16 || bigShipLocation === 20 || bigShipLocation === 21 || bigShipLocation === 25) ? "Vertical" : bigShipOrientation
        while (bigShipLocation === 1 || bigShipLocation === 5 || bigShipLocation === 6 || bigShipLocation === 10 || bigShipLocation === 11 || bigShipLocation === 15 || bigShipLocation === 16 || bigShipLocation === 20 || bigShipLocation === 21 || bigShipLocation === 25) {
            bigShipLocation = rand(2, 24)
        }
        leftBigShipLocation = bigShipLocation - 1
        rightBigShipLocation = bigShipLocation + 1
    } else if (bigShipOrientation === "Vertical") {
        bigShipLocation = rand(6, 20)
        while (bigShipLocation === 1 || bigShipLocation === 2 || bigShipLocation === 3 || bigShipLocation === 4 || bigShipLocation === 5 || bigShipLocation === 6 || bigShipLocation === 10 || bigShipLocation === 11 || bigShipLocation === 15 || bigShipLocation === 16 || bigShipLocation === 20 || bigShipLocation === 21 || bigShipLocation === 22 || bigShipLocation === 23 || bigShipLocation === 24 || bigShipLocation === 25) {
            bigShipLocation = rand(6, 20)
        }
        leftBigShipLocation = bigShipLocation - 5
        rightBigShipLocation = bigShipLocation + 5
    }
}

randShip()

function resetGame() {
    randShip()
    playerErrors = 10
    win = false
    lose = false
    shipsDestroyed = 0
    totalAttacks = 0
    successfulAttacks = 0

    for (let i = 1; i <= 25; i++) {
        document.getElementsByName(i)[0].disabled = false
    }
}

function shipAttack(button) {
    totalAttacks++
    let successPercentage
    if (button === bigShipLocation || button === leftBigShipLocation || button === rightBigShipLocation) {
        alert("Ви влучили в корабель!")
        successfulAttacks++
        if (button === bigShipLocation) {
            bigShipLocation = false
            shipsDestroyed++
        }
        if (button === leftBigShipLocation) {
            leftBigShipLocation = false
            shipsDestroyed++
        }
        if (button === rightBigShipLocation) {
            rightBigShipLocation = false
            shipsDestroyed++
        }
        if (bigShipLocation === false && leftBigShipLocation === false && rightBigShipLocation === false) {
            win = true
            setTimeout(() => {
                alert("Ви виграли!")
                resetGame()
            }, 0)
        }
    } else {
        playerErrors--
        successPercentage = (successfulAttacks / totalAttacks) * 100
        if (playerErrors <= 0) {
            lose = true
            setTimeout(() => {
                alert("Ви програли! Відсоток успішних атак: " + successPercentage.toFixed(2) + "%")
                resetGame()
            }, 0)
        } else {
            alert("Ви не попали в корабель! Залишилося спроб: " + playerErrors)
        }
    }
    document.getElementsByName(button)[0].disabled = true
}

document.write("</div>")