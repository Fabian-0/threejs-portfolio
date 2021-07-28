import THREE from './ExportInstance.js';

const min = 0.1;
const max = 1000;
const positionZ = 50;
const positionY = 10;
const positionX = 0;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const Camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, min, max);
// Camera.position.z = positionZ;
// Camera.position.y = positionY;
// Camera.position.x = positionX;

export default Camera;