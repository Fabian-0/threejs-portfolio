import THREE from './ExportInstance.js';

const geometry = new THREE.PlaneGeometry(500,500, 10, 10);
const material = new THREE.MeshBasicMaterial({color: 0x212534, side: THREE.DoubleSide})

const Plane = new THREE.Mesh(geometry, material);
Plane.rotateX(Math.PI/2);
export default Plane;