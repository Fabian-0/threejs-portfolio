import THREE from './ExportInstance.js';
import THREEx from "./THREEx.js";
import Renderer from "./Renderer.js";
import Camera from "./Camera.js";
import Scene from "./Scene.js";
import Plane from './Plane.js';
// import Controls from './Controls.js'; // helper
import { Ligth } from './Iluminations.js';
import PrincipalScene from '../objects/PrincipalScene.js';
import GroupRobotCamera from '../objects/GroupRobotCamera.js';
import Robot from '../objects/Robot.js';

// Globals

let RobotAndCamera = null, aboutMixer = null , contactMixer = null, isReady =0;
let delta = null;
const clock = new THREE.Clock();

// const orbitControls = Controls.AddOrbitControls(Camera, Renderer.domElement); // helper

function init() {
  // Config camera in group
  RobotAndCamera = new GroupRobotCamera();
  RobotAndCamera.basicControls.activePcControls();
  RobotAndCamera.group.add(Camera);
  
  Camera.rotation.y = Math.PI;
  Camera.rotation.x = Math.PI * 35 / 180;
  Camera.position.y = 2.75;
  Camera.position.z = -2;
  
  RobotAndCamera.group.position.setZ(23);
  RobotAndCamera.group.rotation.y = Math.PI;
  RobotAndCamera.group.add(Camera);
  // RobotAndCamera.addBoxesToScene(Scene);
  
  // Load robot model

  const RobotObject = new Robot();
  RobotObject.loadModel().then(response => {
    RobotAndCamera.group.add(response.robotModel);
    RobotAndCamera.robot = response;
    Scene.add(RobotAndCamera.group);
    isReady++;
    if(isReady == 2) return animate();
  });

  // rezise
  THREEx.WindowResize(Renderer, Camera, RobotAndCamera.basicControls);

  // Add Plano
  Scene.add(Plane);

  // Add iluminacion 
  Scene.add(Ligth);

  // Load scene
  PrincipalScene().then(response => {
    const principalScene = response.scene;
    contactMixer = new THREE.AnimationMixer(principalScene);
    aboutMixer = new THREE.AnimationMixer(principalScene);
    const actionContact = contactMixer.clipAction(response.animations[0]);
    const aboutContact = aboutMixer.clipAction(response.animations[1]);
    actionContact.play()
    aboutContact.play()
    isReady++;
    Scene.add(principalScene);
    if(isReady == 2) return animate();
  });

  // add event for close div
  const closeInfo = document.getElementById('closeInfo');

  closeInfo.addEventListener('click', () => {
    RobotAndCamera.addHTMLContainer.classList.add('hidden');
    RobotAndCamera.basicControls.parentControls.classList.remove('hidden');
    RobotAndCamera.hidden = true;
    RobotAndCamera.basicControls.updateValues();
  });
}

function animate() {
  delta = clock.getDelta();
  // orbitControls.update() // helper
  contactMixer.update(delta);
  aboutMixer.update(delta);
  RobotAndCamera.update(delta);
  Renderer.render(Scene, Camera);
  requestAnimationFrame(animate);
};

init();