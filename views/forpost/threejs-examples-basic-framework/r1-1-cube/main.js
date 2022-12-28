// basic rotating cube
const tf = threeFrame.create({
    // setting active to true will start the loop also
    active: true,
    fps_target: 12,
    // can pass custom objects for camera, renderer, and scene
    camera: new THREE.PerspectiveCamera(70, 32 / 24, 0.1, 1000),
    renderer: new THREE.WebGL1Renderer({alpha: true}),
    scene: (function(){
         const scene = new THREE.Scene();
         scene.add( new THREE.GridHelper(10, 10) );
         return scene;
    }()),
    // user data object
    userData: {
        radian: 0,
        mesh: new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshNormalMaterial()
        )
    },
    // called just once and only once
    init: function (api, ud, scene, camera, renderer) {
        // set size of renderer
        renderer.setSize(640, 480, false);
        // add mesh to scene
        scene.add(ud.mesh);
    },
    // update
    update: function (api, secs, ud, scene, camera, renderer) {
        ud.radian += Math.PI / 180 * 45 * secs;
        ud.radian %= Math.PI * 2;
        ud.mesh.rotation.y = ud.radian;
        camera.position.set( 1.25, 1.25, 1.25 );
        camera.lookAt( 0, 0, 0);
    }
});
// start and stop by clicking canvas
tf.canvas.addEventListener('click', ()=>{
   if(tf.active){
      threeFrame.stop(tf);
   }else{
      threeFrame.start(tf);
   }
});
