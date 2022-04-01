(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // object of TYPE OBJECT3D
    var obj = new THREE.Object3D();
    scene.add(obj);
    // adding MESH TYPE objects to object3d
    var mkMesh = function(){
        return  new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    [[0,0,1],[0,0,-1],[1,0,0],[-1,0,0]].forEach(function(meshData){
        var mesh = mkMesh();
        THREE.Vector3.prototype.set.apply(mesh.position, meshData)
        obj.add(mesh);
    });

    scene.children.forEach(function(obj){
		
		if(obj.type === 'PerspectiveCamera'){
            obj.position.set(8, 8, 8);
            obj.lookAt(0,0,0)
		}
		
		if(obj.type === 'Object3D'){
			obj.children.forEach(function(obj){
				
				if(obj.type === 'Mesh'){
					console.log(obj);
				}
				
			});
			
		}
		
	});

    // render static scene

    renderer.render(scene, camera);
 
}
    ());