const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const result = document.getElementById('result');

// Start webcam
navigator.mediaDevices.getUserMedia({ video: {} }).then(stream => {
  video.srcObject = stream;
});

// Load models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(() => {
  console.log("Models loaded");
});

document.getElementById('captureBtn').onclick = async () => {
  const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

  if (detection) {
    const expr = detection.expressions;
    const traits = {
      smile: expr.happy,
      angry: expr.angry,
      neutral: expr.neutral,
      beard: Math.random() > 0.5, // Dummy beard detection
      glasses: Math.random() > 0.7 // Dummy glasses detection
    };

    const personality = mapTraitsToPersonality(traits);
    result.innerHTML = `<h2>Personality: ${personality}</h2>`;
  } else {
    result.innerHTML = "Face not detected!";
  }
};
