const playerDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const enemyDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

const player = document.getElementById('player')
const enemy = document.getElementById('enemy')
const playerCount = document.getElementById('player-count')
const enemyCount = document.getElementById('enemy-count')

var playerCard, enemyCard
var roundOver = false
var GameOver = false

const shuffle = (deck) => {
    let random, temp, i

    for (i = deck.length - 1; i > 0; i -= 1) {
        random = Math.floor((i + 1) * Math.random())
        temp = deck[random]
        deck[random] = deck[i]
        deck[i] = temp
    }
}

const cycleCards = () => {
    if (enemyDeck.length === 0) {
        if (confirm('Victory!\nPlay Again?')) {
            location.reload()
        }
    }
    else if (playerDeck.length === 0) {
        if (confirm('Defeat!\nPlay Again?')) {
            location.reload()
        }
    }
    else {
        if (roundOver === false) {
            playerCard = playerDeck.shift()
            player.innerText = playerCard
            player.classList.toggle('card')
    
            enemyCard = enemyDeck.shift()
            enemy.innerText = enemyCard
            enemy.classList.toggle('card')
    
            roundOver = true
        }
        else {
            player.innerHTML = '<img src="static/war/img/valknut.svg" alt="Valknut Clipart">'
            player.classList.toggle('card')

            enemy.innerHTML = '<img src="static/war/img/valknut.svg" alt="Valknut Clipart">'
            enemy.classList.toggle('card')
    
            if (playerCard > enemyCard) {
                playerDeck.push(playerCard, enemyCard)
            }
            else if (enemyCard > playerCard) {
                enemyDeck.push(enemyCard, playerCard)
            }
            else {
                playerDeck.push(playerCard)
                enemyDeck.push(enemyCard)
            }

            playerCount.innerText = 'Player Deck: ' + playerDeck.length
            enemyCount.innerText = 'Enemy Deck: ' + enemyDeck.length

            roundOver = false
        }
    }
}

const betray = () => {
    if (confirm('Victory by Betrayal!\nPlay Again?')) {
        location.reload()
    }
}

shuffle(playerDeck)
shuffle(enemyDeck)

playerCount.innerText = 'Player Deck: ' + playerDeck.length
enemyCount.innerText = 'Enemy Deck: ' + enemyDeck.length


document.getElementById('player').addEventListener('click', cycleCards)
document.getElementById('betray').addEventListener('click', betray)
