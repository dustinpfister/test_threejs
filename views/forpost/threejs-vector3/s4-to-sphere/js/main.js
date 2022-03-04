(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // HELPER FUNCTIONS
    // ---------- ----------
    // simple create cube helper
    var createCube = function(){
        var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
    // set on sphere helper
    var setOnSphereFromPos = function(mesh, x, y, z, alt){
         var dir = new THREE.Vector3(x, y, z).normalize();
         var pos = new THREE.Vector3();
         pos.x = dir.x * alt;
         pos.y = dir.y * alt;
         pos.z = dir.z * alt;
         mesh.position.copy(pos);
    };
    var setOnSphere = function(mesh, lat, long, alt){
        var latBias = Math.abs(lat - 0.5) / 0.5;
        var radian = Math.PI * 2 * long,
        x = Math.cos(radian) * (alt - alt * latBias),
        z = Math.sin(radian) * (alt - alt * latBias),
        y = alt * latBias * (lat > 0.5 ? -1 : 1);
        setOnSphereFromPos(cube, x, y, z, alt);
    };
    // ---------- ----------
    // ADDING MESH OBJECTS TO SCENE
    // ---------- ----------
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 30, 30),
        new THREE.MeshNormalMaterial({wireframe:true}));
    scene.add(sphere);
    var cube = createCube();
    scene.add(cube);
    setOnSphere(cube, 0.1, 0.3, 2);
    cube.lookAt(0, 0, 0);
    // ---------- ----------
    // LOOP
    // ---------- ----------
    var sm = {
		lat: 0,
		frame: 0,
		maxFrame: 90,
		fps: 30,
		lt: new Date()
	};
    var loop = function(){
        var now = new Date(),
		secs = (now - sm.lt) / 1000;

        requestAnimationFrame(loop);

        if(secs >= 1 / sm.fps){
			
			sm.frame += sm.fps * secs;
			sm.frame %= sm.maxFrame;
			sm.per = sm.frame / sm.maxFrame;
			sm.lat = 1 * sm.per;

        setOnSphere(cube, sm.lat, 0, 2);
        //sm.lat += 0.01;
        //sm.lat %= 1;
        cube.lookAt(0, 0, 0);
        renderer.render(scene, camera);
		
		sm.lt = new Date();
		
		}
		
    };
    loop();
}
    ());