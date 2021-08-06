const THREEx = {};
export const reference = document.getElementById('auxReference');

let height = reference.offsetHeight;
let width = reference.offsetWidth;

THREEx.WindowResize	= function(renderer, camera, controls){
	
	const callback	= function(){
		height = reference.offsetHeight;
		width = reference.offsetWidth;
		renderer.setSize( width, height );
		camera.aspect	= width / height;
		camera.updateProjectionMatrix();
		document.body.style.width = width+'px';
		document.body.style.height = height+'px';
		controls.updateValues();
	}

  window.addEventListener('resize', callback, false);

  return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			reference.removeEventListener('resize', callback);
		}
	};
};

export default THREEx;