import THREE from "../basic/ExportInstance.js";
import { GLTFLoader } from "../threeModuls/GLTFLoader.js";

const loader = new GLTFLoader();
function PrincipalScene() {
  return new Promise((resolve, reject) => {
    loader.load('src/3dmodels/portfolio.glb', 
    function ( object ) {
      return resolve(object);
    },
    // called when loading is in progresses
    function ( xhr ) {

      // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

      console.log( 'An error happened', error );
      return reject(error)
    })
  })
}

export default PrincipalScene;