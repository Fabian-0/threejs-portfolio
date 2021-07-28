import THREE from './ExportInstance.js';

// export const plane = new THREE.Mesh(
// const planeGeometry =  new THREE.PlaneGeometry(100, 100, 10, 10);
// const texturePlane =  new THREE.TextureLoader().load('./texturas/plano.jpg');
// texturePlane.wrapS = texturePlane.wrapT = THREE.RepeatWrapping;
// texturePlane.repeat.set(10,10);
// const materilPlane = new THREE.MeshBasicMaterial({
//   map: texturePlane,
//   side: THREE.DoubleSide
// });

// export const plane = new THREE.Mesh(planeGeometry, materilPlane);
// );

const Plane = new THREE.GridHelper(1000, 100);
export default Plane;