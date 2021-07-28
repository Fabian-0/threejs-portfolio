import THREE from './ExportInstance.js';

// crear y configurar escena

const Scene = new THREE.Scene();
Scene.background = new THREE.Color(0xfff0f0);
Scene.fog = new THREE.Fog(0xffffff, 0, 500);
export default Scene;