let bigShipLocation
let leftBigShipLocation
let rightBigShipLocation
let bigShipAttack = false
let leftCellOfBigShipAttack = false
let rightCellOfBigShipAttack = false
let player_error = 3
let gameStop = false
let totalShots = 0
let successfulShots = 0
let missedShots = 0
let attackedCells = ''
let enteredNumbers = 0

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

shipCount = 1
bigShipLocation = rand(2, 9)
leftBigShipLocation = bigShipLocation - 1
rightBigShipLocation = bigShipLocation + 1
let gridBigShip = "grid: " + leftBigShipLocation + " " + bigShipLocation + " " + rightBigShipLocation

while (!gameStop) {
    let shoot
    try {
        shoot = prompt("Виберіть комірку 1-10")
        if (shoot === null) {
            gameStop = true
            alert("Гра закінчена.")
            break
        }
        shoot = parseInt(shoot, 10)
        if (isNaN(shoot) || shoot < 1 || shoot > 10) {
            throw new Error("Невірне введення! Введіть число від 1 до 10.")
        }

        let bitPosition = shoot - 1
        let mask = 1 << bitPosition

        if ((enteredNumbers & mask) !== 0) {
            throw new Error("Ви вже стріляли по цій комірці! Виберіть іншу.")
        }

        enteredNumbers |= mask

        if (shoot == bigShipLocation || shoot == leftBigShipLocation || shoot == rightBigShipLocation) {
            if (shoot == bigShipLocation) {
                bigShipAttack = true
            } else if (shoot == rightBigShipLocation) {
                rightCellOfBigShipAttack = true
            } else if (shoot == leftBigShipLocation) {
                leftCellOfBigShipAttack = true
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
        }
    } catch (error) {
        alert(error.message + " Ваші спроби:" + player_error)
        continue
    } finally {
        if (player_error <= 0) {
            gameStop = true
            alert("Гра закінчена. Ви програли. Успішність атак: " + ((successfulShots / totalShots) * 100).toFixed(2) + "%")
        }
        if (player_error > 3) {
            player_error = 3
        }
    }
}
