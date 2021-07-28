import THREE from './ExportInstance.js';
import THREEx from "./THREEx.js";
import Renderer from "./Renderer.js";
import Camera from "./Camera.js";
import Scene from "./Scene.js";
import Plane from './Plane.js';
import Controls from './Controls.js'; // delete
import { Ligth } from './Iluminations.js';
import PrincipalScene from '../objects/PrincipalScene.js';
import Robot from '../objects/Robot.js';
import { ControlsConfig } from './temp.js';

// Globals

const controlsconfig = new ControlsConfig();
controlsconfig.activeControls();

// let mixer = null;
let RobotLoaded = null;
let robotAction = null;
let boxReference = -1;
let hidden = true;
const axesHelper = new THREE.AxesHelper( 5 );
const RobotAndCamara = new THREE.Group();
const clock = new THREE.Clock();
const robotBox = new THREE.Box3();
const boxHelper = new THREE.Box3Helper(robotBox);
const HTMLcontainer = document.getElementById('addHTML');
const closeInfo = document.getElementById('closeInfo');

RobotAndCamara.position.setZ(23);
RobotAndCamara.rotation.y = Math.PI;
Scene.add(boxHelper)
RobotAndCamara.add(Camera)
RobotAndCamara.add(axesHelper)

Camera.rotation.y = Math.PI;
Camera.rotation.x = Math.PI * 35 / 180;
Camera.position.y = 2.75;
Camera.position.z = -2;

closeInfo.addEventListener('click', () => {
  HTMLcontainer.classList.add('hidden');
  hidden = true;
});
// const orbitControls = Controls.AddOrbitControls(Camera, Renderer.domElement); // delete
// collisions
const testVector = new THREE.Vector3(0.5,0.5,0.5);
const boxes = [
  new THREE.Box3Helper(new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(2.85,0,4.1),testVector)),
  new THREE.Box3Helper(new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(-3,0,4),testVector)),
  new THREE.Box3Helper(new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(-4.65,0,-1.75),testVector)),
  new THREE.Box3Helper(new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(0.35,0,-4.9),testVector)),
  new THREE.Box3Helper(new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(4.65,0,-1.4),testVector)),
  // new THREE.Box3Helper(new THREE.Box3().setFromCenterAndSize(new THREE.Vector3(-3,0,3),testVector)),
];
const lengthBoxes = boxes.length;
const lengthBoxesHelper = lengthBoxes -1;
Scene.add(boxes[0])
Scene.add(boxes[1])
Scene.add(boxes[2])
Scene.add(boxes[3])
Scene.add(boxes[4])

// Load robot animation

const loadAnimation = ({robot, animations}) => {
  const mixer = new THREE.AnimationMixer( robot );
  const clips = animations;
  const clip = THREE.AnimationClip.findByName( clips, 'EsqueletoAction.002' );
  const action = mixer.clipAction( clip );
  return action;
}

function init() {

  // rezise

  THREEx.WindowResize(Renderer, Camera);

  // Agregar Plano
  Scene.add(Plane);

  // agregar iluminacion 
  Scene.add(Ligth);

  // Load scene
  PrincipalScene().then(response => {
    Scene.add(response.scene)
  });
  
  // Load robot model
  
  Robot().then(response => {
    RobotLoaded = response.scene;
    robotAction = loadAnimation({robot: RobotLoaded, animations: response.animations});
    // console.log();
    RobotAndCamara.add(RobotLoaded)
    Scene.add(RobotAndCamara);
    animate()
  });
}

const update = (delta) => {
  if(controlsconfig.controls[87] && hidden) {
    RobotAndCamara.translateZ(5 * delta);
  }
  if(controlsconfig.controls[83] && hidden) {
    RobotAndCamara.translateZ(-5 * delta);
  }
  if(controlsconfig.controls[65] && hidden) {
    RobotAndCamara.rotation.y += 1 * delta;
  }
  if(controlsconfig.controls[68] && hidden) {
    RobotAndCamara.rotation.y -= 1 * delta;
  }

  if(!hidden) return;
  for (let i = 0; i < lengthBoxes; i++) {
    if(robotBox.intersectsBox(boxes[i].box)) {
      if(boxReference == -1) {
        hidden = false;
        boxReference = i;
        console.log('ok');
        HTMLcontainer.classList.remove('hidden');
        RobotAndCamara.translateZ(0);
        break;
      }
      break;
    } else if(i == lengthBoxesHelper){
      boxReference = -1;
    }
  }
}

const helpVectorBox = new THREE.Vector3(0.2 ,0.2 ,0.2 );

function animate() {
  // orbitControls.update() // delete
  robotBox.setFromCenterAndSize(RobotAndCamara.position, helpVectorBox);
  update(clock.getDelta())

  Renderer.render(Scene, Camera);
  requestAnimationFrame(animate);
};

init();