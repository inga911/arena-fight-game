



const goldWon = document.getElementById('goldWon')
const atackBtn = document.getElementById('atackBtn')
const playerHP = document.getElementById('playerHP')
const enemyHP = document.getElementById('enemyHP')
const potion = document.getElementById('potion')
const enemyImg = document.getElementById('enemyImg')
const resultPlayer = document.getElementById('resultPlayer')
const resultEnemy = document.getElementById('resultEnemy')
const main = document.getElementById('main')
const startGame = document.getElementById('gameStart')
const gameOver = document.getElementById('gameOver')
const startBtn = document.getElementById('gameStartBtn')
const gameOverBtn = document.getElementById('gameOverBtn')
const mainPlayerImg = document.getElementById('mainPlayerImg')
const gameResult = document.getElementById('gameResult')
///////////    ENEMY IMAGES
const images = [
    'https://www3.minijuegosgratis.com/v3/games/thumbnails/236711_7_sq.jpg',
    'https://i.pinimg.com/736x/57/ed/25/57ed25ccf5133bf3dfe5aa440a8273de.jpg',
    'https://i.pinimg.com/736x/21/da/aa/21daaa69be5f3c7f319e2e5ae23ba1bd.jpg',
    'https://assets-global.website-files.com/61fb38ad476d48c108471e8d/64972c6c6f36b06378dc2d39_6487365dbd08c05e9eea9ffe_blissful-igor.gif'
];
//////////     PLAYERS
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')
const player3 = document.getElementById('player3')
const player4 = document.getElementById('player4')
const player5 = document.getElementById('player5')
let allPlayers = []
allPlayers.push(player1, player2, player3, player4, player5)

let wapons = []
wapons.push(sword, bow, magicWand)


/////////     CLASSES AND STYLES
potion.classList.add('disable');
playerHP.style.backgroundColor = 'lightgreen';
enemyHP.style.backgroundColor = 'lightgreen';
main.classList.add('d-none');
gameOver.classList.add('d-none');
sword.style.border = ' 2px solid red'

//////////     BUTTONS
startBtn.onclick = () => {
    if (!playerClicked) {
        checkPlayerClicked();
        return;
    }

    startGame.classList.add('d-none');
    main.classList.remove('d-none');
    setRandomEnemyImage();
}

gameOverBtn.onclick = () => {
    startGame.classList.remove('d-none');
    gameOver.classList.add('d-none');
}

///////////    SELECT THE PLAYER
let previousClickedImage = null;
let playerClicked = false;

function handlePlayerClick(clickedImage) {
    const clonePlayer = clickedImage.cloneNode(true);
    mainPlayerImg.innerHTML = '';
    mainPlayerImg.appendChild(clonePlayer);
    if (previousClickedImage) {
        previousClickedImage.style.border = 'none';
    }
    clickedImage.style.border = '3px solid #4666FF';
    previousClickedImage = clickedImage;
    playerClicked = true;

}

allPlayers.forEach(player => {
    player.onclick = () => handlePlayerClick(player);
});

function checkPlayerClicked() {
    if (!playerClicked) {
        alert('Please select a player first!');
        return
    }
}
///////////    SELECT THE WEAPON
let previousClickedWeapon = sword;
sword.style.border = '2px solid red';
sword.style.scale = '1.2';
function handleWeaponClick(weapon) {
    if (sword.style.border = ' 2px solid red') {
        sword.style.border = 'none';
        sword.style.scale = '1';
    }
    if (previousClickedWeapon) {
        previousClickedWeapon.style.border = 'none';
        previousClickedWeapon.style.scale = '1';
    }
    weapon.style.border = '2px solid red';
    weapon.style.scale = '1.2';
    previousClickedWeapon = weapon;
}

wapons.forEach(weapon => {
    weapon.addEventListener('click', () => handleWeaponClick(weapon));
});


/////////  LOGIC AND FUNCTIONS
let gold = 0;
let playerHpBar = 100;
let enemyHpBar = 100;

const random = (num) => Math.floor(Math.random() * num + 1);

function textContentResult() {
    resultPlayer.textContent = playerHpBar + ' / 100%';
    resultEnemy.textContent = enemyHpBar + ' / 100%';
}


function setRandomEnemyImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomEnemyImage = images[randomIndex];
    enemyImg.style.backgroundImage = `url(${randomEnemyImage})`;
}

const addRemoveDisable = () => {
    if (gold >= 50) {
        potion.classList.remove('disable');
    } else {
        potion.classList.add('disable');
    }
}

function updateHtmlPlayer() {
    playerHpBar = 100
    playerHP.style.width = '100%'
    playerHP.style.backgroundColor = 'lightgreen'
}

atackBtn.onclick = () => {
    const playerDamage = random(12);
    let enemyDamage = random(8);
    const percentage = random(100)
    if (previousClickedWeapon === sword && percentage < 25) {
        enemyDamage = 0;
    }
    if (previousClickedWeapon === bow && percentage < 35) {
        const doublePlayerDamage = playerDamage;
        enemyHpBar -= doublePlayerDamage;
    }
    if (previousClickedWeapon === magicWand && percentage < 20) {
        updateHealthBar(playerHP, playerHpBar);
        updateHtmlPlayer();
        enemyDamage = 0;
    }
    const randomGold = random(5);
    gold += randomGold;
    goldWon.textContent = gold;
    enemyHpBar -= playerDamage;
    playerHpBar -= enemyDamage;
    if (playerHpBar <= 0) {
        resetGame();
        return;
    }

    if (enemyHpBar <= 0) {
        setRandomEnemyImage();
        enemyHpBar = 100;
    }
    addRemoveDisable();
    textContentResult();
    updateHealthBar(playerHP, playerHpBar);
    updateHealthBar(enemyHP, enemyHpBar);
};


potion.onclick = () => {
    if (gold >= 50) {
        gold -= 50;
        goldWon.textContent = gold;
        updateHtmlPlayer()
        resultPlayer.textContent = playerHpBar
    }
}

function updateHealthBar(hp, hpBar) {
    hp.style.width = hpBar + '%';
    if (hpBar >= 75) {
        hp.style.backgroundColor = 'lightgreen'
    } else if (hpBar >= 45) {
        hp.style.backgroundColor = 'orange'
    } else if (hpBar >= 0) {
        hp.style.backgroundColor = 'crimson'
    } else {
        hp.style.backgroundColor = 'white'
    }
}
function resetGameData() {
    gold = 0;
    playerHpBar = 100;
    enemyHpBar = 100;
    goldWon.textContent = gold;
    textContentResult()
    updateHealthBar(playerHP, playerHpBar);
    updateHealthBar(enemyHP, enemyHpBar);
}


function resetGame() {
    resetGameData();
    main.classList.add('d-none');
    gameOver.classList.remove('d-none');
    if (playerHP > enemyHP) {
        gameResult.textContent = 'You won!';
    } else {
        gameResult.textContent = 'You lost!';
    }
}

