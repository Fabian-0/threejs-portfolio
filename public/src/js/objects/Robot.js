import { GLTFLoader } from "../threeModuls/GLTFLoader.js";

class Robot {
  constructor(){
    this.robotScene = null;
    this.robotModel = null;
    this.boneRobotRotate = null;
  }

  loadModel(){
    const self = this;
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        '/3dmodels/robot.glb', 
        function ( object ) {
          self.robotScene = object;
          self.robotModel = object.scene;
          self.boneRobotRotate = self.robotModel.children[0].children[0].children[0].children[0];
          return resolve(self)
        },
        // called when loading is in progresses
        function ( xhr ) {
      
          // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      
        },
        // called when loading has errors
        function ( error ) {
      
          console.log( 'An error happened', error );
          return reject(error)
        }
      )
    });
  }
}

export default Robot;