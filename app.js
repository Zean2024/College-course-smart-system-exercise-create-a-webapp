let ball, playground;
let posX = 0, posY = 0;

async function requestPermission() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    try {
      const response = await DeviceMotionEvent.requestPermission();
      if (response === 'granted') initSensors();
      else alert("Permission denied.");
    } catch (err) {
      console.error(err);
    }
  } else {
    initSensors();
  }
}

function initSensors() {
  ball = document.getElementById("ball");
  playground = document.getElementById("playground");

  window.addEventListener("deviceorientation", (event) => {
    // event.gamma: 左右 [-90, 90]
    // event.beta: 前后 [-180, 180]
    moveBall(event.gamma, event.beta);
  });
}

function moveBall(gamma, beta) {
  if (!ball || !playground) return;

  const playgroundWidth = playground.clientWidth;
  const playgroundHeight = playground.clientHeight;

  // 将角度转换为坐标
  posX = (gamma / 45) * (playgroundWidth / 2 - 20);
  posY = (beta / 45) * (playgroundHeight / 2 - 20);

  // 更新位置
  ball.style.left = (playgroundWidth / 2 + posX) + "px";
  ball.style.top = (playgroundHeight / 2 + posY) + "px";
}

window.onload = () => requestPermission();

