
(function () {

    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(4, 4));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    // MESH OBJECTS
	var randAxis = function(){
		return ( 0.25 + 1.25 * Math.random() ) * ( Math.random() < 0.5 ? -1 : 1 );
	};
	
    var group = new THREE.Group();
    scene.add(group);
	var i = 0, len = 20;
	while(i < len){
		var mesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
		var start_dir = mesh.userData.start_dir = new THREE.Vector3();
		mesh.userData.alpha = 0;
		start_dir.x = randAxis();
		start_dir.y = randAxis();
		start_dir.z = randAxis();
		mesh.position.copy( start_dir.normalize().multiplyScalar(2) );
		group.add(mesh);
		i += 1;
	}
	
	var update = function(group, delta){
		
		group.children.forEach(function(mesh, i){
			
			var ud = mesh.userData;
			var start_dir = ud.start_dir;
			
			ud.alpha += delta;
			
			mesh.position.copy( start_dir.clone().normalize().multiplyScalar(ud.alpha) );
			
		    mesh.position.clamp(
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
		});
		
	};
	
    /*
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);

    mesh.position.set(0, 0, -5);
    mesh.position.clamp(
        new THREE.Vector3(-2, 0, -2),
        new THREE.Vector3(2, 0, 2));
*/
    // LOOP
    var frame = 0,
    maxFrame = 90,
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
			
			update(group, 0.1);
			
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
