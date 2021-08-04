import THREE from "../basic/ExportInstance.js";
import BasicControls from './BasicControls.js';
import CollisionBoxes from "./CollisionBoxes.js";
import templates from "./Templates.js";


class GroupRobotCamera {
  constructor() {
    this.camera = null;
    this.robot = null;
    this.basicControls = new BasicControls();
    this.group = new THREE.Group();
    this.hidden = true;
    this.vectorBoxesHelper =  new THREE.Vector3(0.5,0.5,0.5);
    this.boxes = [
      new CollisionBoxes(2.85,0,4.1, this.vectorBoxesHelper, 'portfolio'),
      new CollisionBoxes(-3,0,4, this.vectorBoxesHelper, 'rickAndMorty'),
      new CollisionBoxes(-4.65,0,-1.75, this.vectorBoxesHelper, 'weatherApi'),
      new CollisionBoxes(0.35,0,-4.9, this.vectorBoxesHelper, 'chat'),
      new CollisionBoxes(4.65,0,-1.4, this.vectorBoxesHelper, 'trivia'),
      new CollisionBoxes(18.72,0,-17.5, this.vectorBoxesHelper, 'aboutMe'),
      new CollisionBoxes(-17.7,0,-18.8, this.vectorBoxesHelper, 'contact'),
    ];
    this.lengthBoxes = this.boxes.length;
    this.lengthBoxesHelper = this.lengthBoxes -1;
    this.helpVectorBox = new THREE.Vector3(0.2 ,0.2 ,0.2 );
    this.robotBox = new THREE.Box3();
    this.boxReference = -1;
    this.addHTMLContainer = document.getElementById('addHTMLContainer'); // TESTS
    this.addHTML = document.getElementById('addHTML'); // TESTS
    this.templates = templates;
  }

  addBoxesToScene(scene) {
    for (let i = 0; i < this.lengthBoxes; i++) {
      scene.add(this.boxes[i].boxObject);  
    }
    return;
  }

  update (delta){
    this.robotBox.setFromCenterAndSize(this.group.position, this.helpVectorBox);
    if(this.hidden && (this.basicControls.controls[87] || this.basicControls.isTouchUp)) {
      this.group.translateZ(5 * delta);
      this.robot.boneRobotRotate.rotation.x += 2.15 * delta;
    }
    if(this.hidden && (this.basicControls.controls[83] || this.basicControls.isTouchDown)) {
      this.group.translateZ(-3 * delta);
      this.robot.boneRobotRotate.rotation.x -= 1.75 * delta;
    }
    if(this.hidden && (this.basicControls.controls[65] || this.basicControls.isTouchLeft)) {
      this.group.rotation.y += 1 * delta;
    }
    if(this.hidden && (this.basicControls.controls[68] || this.basicControls.isTouchRigth)) {
      this.group.rotation.y -= 1 * delta;
    }
  
    if(!this.hidden) return;
    for (let i = 0; i < this.lengthBoxes; i++) {
      if(this.robotBox.intersectsBox(this.boxes[i].boxObject.box)) {
        if(this.boxReference == -1) {
          this.hidden = false;
          this.boxReference = i;
          console.log(this.boxes[i].name);
          this.addHTMLContainer.classList.remove('hidden');
          this.addHTML.innerHTML = this.templates[this.boxes[i].name];
          break;
        }
        break;
      } else if(i == this.lengthBoxesHelper){
        this.boxReference = -1;
      }
    }
  }
}

export default GroupRobotCamera;