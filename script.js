const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = { x: 50, y: 150, width: 40, height: 40, vy: 0, gravity: 1.5, jump: -20, grounded: true };
let cactus = { x: 800, y: 160, width: 20, height: 40 };
let score = 0;

function drawDino() {
  ctx.fillStyle = '#333';
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawCactus() {
  ctx.fillStyle = 'green';
  ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDino();
  drawCactus();

  dino.y += dino.vy;
  dino.vy += dino.gravity;

  if (dino.y > 150) {
    dino.y = 150;
    dino.vy = 0;
    dino.grounded = true;
  }

  cactus.x -= 8;
  if (cactus.x < -20) {
    cactus.x = 800;
    score++;
  }

  if (
    dino.x < cactus.x + cactus.width &&
    dino.x + dino.width > cactus.x &&
    dino.y < cactus.y + cactus.height &&
    dino.y + dino.height > cactus.y
  ) {
    alert('💥 Game Over! Pontuação: ' + score);
    location.reload();
  }

  ctx.font = "20px Arial";
  ctx.fillText("Pontuação: " + score, 650, 30);

  requestAnimationFrame(update);
}

document.addEventListener('keydown', function (e) {
  if (e.code === 'Space' && dino.grounded) {
    dino.vy = dino.jump;
    dino.grounded = false;
  }
});

update();
