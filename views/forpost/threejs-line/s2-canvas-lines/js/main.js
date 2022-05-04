
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.4, 1.4, 1.4);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);


 
    // CANVAS
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
 
    canvas.width = 8;
    canvas.height = 8;
 
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff00ff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
 
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
 
    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // MATERIAL
    var material = new THREE.MeshBasicMaterial({
            map: texture
        });
 
    // MESH
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.render(scene, camera);