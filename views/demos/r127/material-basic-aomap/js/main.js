
(function () {

    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a2a);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    var controls = new THREE.OrbitControls(camera);

    // making an Ambient occlusion map texture with CANVAS
    var aoCanvas = document.createElement('canvas'),
    ctx = aoCanvas.getContext('2d');

    // set canvas native size
    aoCanvas.width = 32;
    aoCanvas.height = 32;

    // // full green means that light effects the area completely
    ctx.fillStyle = 'rgba(255,0,0,1)';
    ctx.fillRect(0, 0, aoCanvas.width, aoCanvas.height);

    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, aoCanvas.width, aoCanvas.height);

	var geometry = new THREE.BoxGeometry(1, 1, 1);
	
	//console.log(geometry.attributes);
	
	/*
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	geometry.addAttribute( 'uv2', new THREE.BufferAttribute( geometry.attributes.uv.array, 2 ) );
	*/
	
	
	
    // CUBE
    var cube = new THREE.Mesh(

            // box GEOMETRY
            geometry,

            new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                aoMap: new THREE.CanvasTexture(aoCanvas)
            }));
			
    scene.add(cube);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var loop = function () {

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

}
    ());
