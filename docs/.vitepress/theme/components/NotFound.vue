<template>
  <div class="not-found">
    <h1>404</h1>

    <div class="frame">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="caps">
      <img src="http://ademilter.com/caps.png" alt="" />
    </div>

    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas?.getContext('2d');
  const WIDTH = 700;
  const HEIGHT = 500;

  if (!canvas || !ctx) return;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
  const pix = imgData.data;

  setInterval(() => {
    for (let i = 0; i < pix.length; i += 4) {
      const color = Math.random() * 255 + 50;
      pix[i] = color;
      pix[i + 1] = color;
      pix[i + 2] = color;
    }
    ctx.putImageData(imgData, 0, 0);
  }, 30);
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

html,
.not-found {
  height: 100%;
  overflow: hidden;
}

canvas {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.caps {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: as 8s linear infinite;
}

.caps img {
  display: block;
  width: 100%;
  height: 100%;
}

@keyframes as {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  20% {
    opacity: 0.1;
  }
  30% {
    opacity: 0.5;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  55% {
    opacity: 0;
  }
}

.frame {
  z-index: 3;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 19%,
    rgba(0, 0, 0, 0.9) 100%
  );
}

.frame div {
  position: absolute;
  left: 0;
  top: -20%;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: asd 12s linear infinite;
}

.frame div:nth-child(1) {
  animation-delay: 0s;
}

.frame div:nth-child(2) {
  animation-delay: 4s;
}

.frame div:nth-child(3) {
  animation-delay: 8s;
}

@keyframes asd {
  0% {
    top: -20%;
  }
  100% {
    top: 100%;
  }
}

h1 {
  z-index: 3;
  position: absolute;
  font: bold 200px/200px Arial, sans-serif;
  left: 50%;
  top: 50%;
  margin-top: -100px;
  width: 100%;
  margin-left: -50%;
  height: 200px;
  text-align: center;
  color: transparent;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  animation: asdd 2s linear infinite;
}

@keyframes asdd {
  0% {
    text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  }
  33% {
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
  66% {
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
  100% {
    text-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
  }
}
</style>
