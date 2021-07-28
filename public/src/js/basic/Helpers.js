import THREE from './ExportInstance.js';

class Helpers {
  static createVectors(arrayVectors) {
    let vectors = [];

    for (let i = 0; i < arrayVectors.length; i++) {

      const X = arrayVectors[i][0];
      const Y = arrayVectors[i][1];
      const Z = arrayVectors[i][2];
      
      const createVector = new THREE.Vector3(X, Y, Z);
      vectors.push(createVector);
      return vectors;
    }
  }
}

export default Helpers;