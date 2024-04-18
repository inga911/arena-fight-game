const goldWon = document.getElementById('goldWon')
const atackBtn = document.getElementById('atackBtn')
const playerHP = document.getElementById('playerHP')
const enemyHP = document.getElementById('enemyHP')
const potion = document.getElementById('potion')
const enemyImg = document.getElementById('enemyImg')
const resultPlayer = document.getElementById('resultPlayer')
const resultEnemy = document.getElementById('resultEnemy')
potion.classList.add('disable')
playerHP.style.backgroundColor = 'lightgreen'
enemyHP.style.backgroundColor = 'lightgreen'

const images = [
    'https://www3.minijuegosgratis.com/v3/games/thumbnails/236711_7_sq.jpg',
    'https://i.pinimg.com/736x/57/ed/25/57ed25ccf5133bf3dfe5aa440a8273de.jpg',
    'https://i.pinimg.com/736x/21/da/aa/21daaa69be5f3c7f319e2e5ae23ba1bd.jpg'
]

let gold = 0
let playerHpBar = 100;
let enemyHpBar = 100;
console.log(enemyHpBar);
function setRandomEnemyImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    enemyImg.src = images[randomIndex];
}


atackBtn.onclick = () => {
    const randomGold = Math.floor(Math.random() * 5 + 1)
    gold += randomGold
    goldWon.textContent = gold
    if (gold >= 50) {
        potion.classList.remove('disable')
    } else if (gold < 50) {
        potion.classList.add('disable')
    }
    playerDamage()
    enemyDamage()
    resultPlayer.textContent = playerHpBar
    resultEnemy.textContent = enemyHpBar
    console.log(resultEnemy.textContent = enemyHpBar, 'ENEMY atack CLICK');
}

potion.onclick = () => {
    if (gold >= 50) {
        gold -= 50;
        goldWon.textContent = gold;
        refreshBar(playerHpBar, playerHP)
    }
}



function playerDamage() {
    const randomDamage = Math.floor(Math.random() * 10 + 1)
    playerHpBar -= randomDamage
    playerHP.style.width = playerHpBar + '%';
    if (playerHpBar >= 75) {
        playerHP.style.backgroundColor = 'lightgreen'
    } else if (playerHpBar >= 45) {
        playerHP.style.backgroundColor = 'orange'
    } else if (playerHpBar >= 0) {
        playerHP.style.backgroundColor = 'crimson'
    } else {
        playerHP.style.backgroundColor = 'white'
        console.log('game over');
        resetGame()
    }
}

function enemyDamage() {
    const randomDamage = Math.floor(Math.random() * 8 + 1)
    enemyHpBar -= randomDamage
    enemyHP.style.width = enemyHpBar + '%';
    if (enemyHpBar >= 75) {
        enemyHP.style.backgroundColor = 'lightgreen'
    } else if (enemyHpBar >= 45) {
        enemyHP.style.backgroundColor = 'orange'
    } else if (enemyHpBar >= 0) {
        enemyHP.style.backgroundColor = 'crimson'
    } else {
        enemyHP.style.backgroundColor = 'white'
        console.log('game over');
        resetGame()
    }
    console.log(randomDamage, 'ENEMY RANDOM');
}


function resetGame() {
    if (playerHpBar > enemyHpBar) {
        console.log('you won');
    } else {
        console.log('you lost');
    }
    // gold = 0;
    // goldWon.textContent = gold;
    // playerHpBar = 100;
    // playerHP.style.width = playerHpBar + '%';
    // playerHP.style.backgroundColor = 'lightgreen';
    // enemyHpBar = 100;
    // enemyHP.style.width = '100%';
    // enemyHP.style.backgroundColor = 'lightgreen';
    // setRandomEnemyImage();
    // refreshBar(enemyHpBar, enemyHP)
    // console.log(enemyHP.style.width, ' enemy RESET');
    location.reload();
}


function refreshBar(userHpBar, userHp) {
    userHpBar = 100
    userHp.style.width = '100%'
    userHp.style.backgroundColor = 'lightgreen'
    console.log(userHp.style.width);
}