import THREE from "../basic/ExportInstance.js";

class CollisionBoxes {
  constructor(x,y,z, vectorHelper, name) {
    this.name = name;
    this.boxObject = new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(x,y,z), vectorHelper);
  }
}

export default CollisionBoxes;