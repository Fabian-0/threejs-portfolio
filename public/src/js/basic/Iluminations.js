import THREE from './ExportInstance.js';


export const Ligth = new THREE.AmbientLight(0xffffff, 0.8)
// Ligth.position.set(0, 50, 10);
Ligth.position.set(10, 10, -5);

// export const helperli = new THREE.SpotLightHelper(Ligth)

export const Ligth2 = new THREE.DirectionalLight(0xffffff)
export const helperli2 = new THREE.PointLightHelper(Ligth2)

Ligth2.position.set(0, 2, 4);

// Ligth2.color.setColorName('#f3f3f3')
