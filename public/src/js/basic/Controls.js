import { OrbitControls } from '../threeModuls/OrbitControls.js';
import { PointerLockControls } from "../threeModuls/PointerLockControls.js";

const Controls = {};

Controls.AddOrbitControls = (camera, domElement) => {
  const newControl = new OrbitControls(camera, domElement);
  newControl.maxPolarAngle = Math.PI;
  return newControl;
}

Controls.AddPointerLockControls = ({element, camera, domElement}) =>{
  const newControl = new PointerLockControls(camera, domElement);
  element.addEventListener('click', ()=> {
    newControl.lock();
  });
  return newControl;
}
export default Controls;