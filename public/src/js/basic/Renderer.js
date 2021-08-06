import THREE from './ExportInstance.js';
import { reference } from './THREEx.js';

const windowWidth = reference.offsetWidth;
const windowHeight = reference.offsetHeight;
const Renderer = new THREE.WebGLRenderer({antialias: true});

Renderer.setSize( windowWidth, windowHeight );
Renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(Renderer.domElement);

export default Renderer;