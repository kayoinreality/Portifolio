const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+=-`~[]\{}|;\':",./<>?';
const fontSize = 10;
const columns = canvas.width / fontSize;

const rain = [];
for (let i = 0; i < columns; i++) {
  rain[i] = 1;
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0f0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < columns; i++) {
    const letra = letras[Math.floor(Math.random() * letras.length)];
    const x = i * fontSize;
    const y = rain[i] * fontSize;
    ctx.fillText(letra, x, y);

    if (y > canvas.height || Math.random() > 0.975) {
      rain[i] = 0;
    }
    rain[i]++;
  }
}

setInterval(draw, 30);