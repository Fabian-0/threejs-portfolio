const THREEx = {};
THREEx.WindowResize	= function(renderer, camera){
	const callback	= function(){
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}
  window.addEventListener('resize', callback, false);
  return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
};

export default THREEx;