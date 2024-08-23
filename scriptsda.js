let bigShipLocation,
    leftBigShipLocation,
    rightBigShipLocation,
    bigShipAttack = false,
    leftCellOfBigShipAttack = false,
    rightCellOfBigShipAttack = false,
    player_error = 10,
    gameStop = false,
    totalShots = 0,
    successfulShots = 0,
    missedShots = 0,
    enteredNumbers = [],
    error = false

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let bigShipOrientation = rand(0, 1) === 0 ? "Horizontal" : "Vertical"

if (bigShipOrientation === "Horizontal") {
    do {
        bigShipLocation = rand(1, 25)
    } while ([1, 5, 6, 10, 11, 15, 16, 20, 21, 25].includes(bigShipLocation))
    leftBigShipLocation = bigShipLocation - 1
    rightBigShipLocation = bigShipLocation + 1
} else {
    do {
        bigShipLocation = rand(1, 25)
    } while ([1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25].includes(bigShipLocation))
    leftBigShipLocation = bigShipLocation - 5
    rightBigShipLocation = bigShipLocation + 5
}

while (!gameStop) {
    let shoot
    try {
        shoot = prompt("Виберіть комірку 1-25")
        if (shoot === null) {
            gameStop = true
            alert("Гра закінчена.")
            break
        }
        shoot = parseInt(shoot)
        if (isNaN(shoot) || shoot < 1 || shoot > 25) {
            throw new Error("Невірне введення! Введіть число від 1 до 25.")
        }

        if (enteredNumbers.includes(shoot)) {
            error = true
            throw new Error("Ви вже стріляли по цій комірці! Виберіть іншу.")
        }
    } catch (error) {
        alert(error.message + " Ваші спроби: " + player_error)
        continue
    }

    if (!gameStop && !error) {
        totalShots++
        enteredNumbers.push(shoot)
        if ([bigShipLocation, leftBigShipLocation, rightBigShipLocation].includes(shoot)) {
            switch (shoot) {
                case bigShipLocation:
                    bigShipAttack = true
                    break
                case rightBigShipLocation:
                    rightCellOfBigShipAttack = true
                    break
                case leftBigShipLocation:
                    leftCellOfBigShipAttack = true
                    break
            }
            player_error++
            successfulShots++
            alert("Ви поцілили по кораблю! Ваші спроби: " + player_error)
            if (bigShipAttack && rightCellOfBigShipAttack && leftCellOfBigShipAttack) {
                gameStop = true
                alert("Вітаємо! Ви виграли!")
            }
        } else {
            player_error--
            missedShots++
            alert("Ви не поцілили у корабель. Ваші спроби: " + player_error)

            if (player_error <= 0) {
                gameStop = true
                alert("Гра закінчена. Ви програли. Успішність атак: " + ((successfulShots / totalShots) * 100).toFixed(2) + "%")
                break
            }
        }
        if (player_error > 20) {
            player_error = 20
        }
    }

    error = false
}
