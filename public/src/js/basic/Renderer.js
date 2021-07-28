import THREE from './ExportInstance.js';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const Renderer = new THREE.WebGLRenderer({antialias: true});

Renderer.setSize( windowWidth, windowHeight );
Renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(Renderer.domElement);

export default Renderer;