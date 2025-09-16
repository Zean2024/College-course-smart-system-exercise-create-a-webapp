async function requestPermission() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    try {
      const response = await DeviceMotionEvent.requestPermission();
      if (response === 'granted') {
        initSensors();
      } else {
        alert("Permission denied.");
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    initSensors();
  }
}

function initSensors() {
  window.addEventListener("devicemotion", (event) => {
    document.getElementById("acc-x").textContent = event.acceleration.x?.toFixed(2) || 0;
    document.getElementById("acc-y").textContent = event.acceleration.y?.toFixed(2) || 0;
    document.getElementById("acc-z").textContent = event.acceleration.z?.toFixed(2) || 0;
  });

  window.addEventListener("deviceorientation", (event) => {
    document.getElementById("alpha").textContent = event.alpha?.toFixed(2) || 0;
    document.getElementById("beta").textContent = event.beta?.toFixed(2) || 0;
    document.getElementById("gamma").textContent = event.gamma?.toFixed(2) || 0;
  });
}

window.onload = () => { requestPermission(); };
