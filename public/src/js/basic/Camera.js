import THREE from './ExportInstance.js';
import { reference } from './THREEx.js';


const min = 0.1;
const max = 100;
const windowWidth = reference.offsetWidth;
const windowHeight = reference.offsetHeight;

const Camera = new THREE.PerspectiveCamera(85, windowWidth / windowHeight, min, max);

export default Camera;