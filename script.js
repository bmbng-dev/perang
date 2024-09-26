const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const scoreDisplay = document.getElementById('score-display');
let playerPosition = 170;
const playerSpeed = 20;
let enemyPosition = 0;
const gameWidth = document.querySelector('.game-area').offsetWidth - player.offsetWidth;
let score = 0; // Variabel untuk menyimpan skor

const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const shootBtn = document.getElementById('shootBtn');

// Gerakan pemain ke kiri
leftBtn.addEventListener('click', () => {
    if (playerPosition > 0) {
        playerPosition -= playerSpeed;
        player.style.left = `${playerPosition}px`;
    }
});

// Gerakan pemain ke kanan
rightBtn.addEventListener('click', () => {
    if (playerPosition < gameWidth) {
        playerPosition += playerSpeed;
        player.style.left = `${playerPosition}px`;
    }
});

// Fungsi menembak peluru
shootBtn.addEventListener('click', shootBullet);

// Fungsi untuk menembak peluru
function shootBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    document.querySelector('.game-area').appendChild(bullet);

    let bulletPosition = playerPosition + 25;
    bullet.style.left = `${bulletPosition}px`;
    bullet.style.bottom = `80px`;

    const bulletInterval = setInterval(() => {
        const bulletBottom = parseInt(bullet.style.bottom.replace('px', ''));
        bullet.style.bottom = `${bulletBottom + 10}px`;

        if (bulletBottom > 400) {
            clearInterval(bulletInterval);
            bullet.remove();
        }

        // Cek apakah peluru mengenai musuh
        if (bulletBottom > enemy.offsetTop && bulletPosition > enemy.offsetLeft && bulletPosition < enemy.offsetLeft + 50) {
            clearInterval(bulletInterval);
            bullet.remove();
            enemy.style.display = 'none';
            updateScore(); // Panggil fungsi updateScore
            setTimeout(() => {
                enemy.style.display = 'block';
                resetEnemy();
            }, 1000);
        }
    }, 50);
}

// Reset posisi musuh setelah tertembak
function resetEnemy() {
    enemy.style.top = '0px';
    enemy.style.left = `${Math.floor(Math.random() * (gameWidth - 50))}px`;
}

// Fungsi untuk memperbarui skor
function updateScore() {
    score += 10; // Tambahkan 10 poin untuk setiap musuh yang tertembak
    scoreDisplay.textContent = `Skor: ${score}`; // Perbarui tampilan skor
}