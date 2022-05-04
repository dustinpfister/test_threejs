    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
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
 
    // MATERIAL
    var material = new THREE.MeshBasicMaterial({
            map: texture
        });
 
    // MESH
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);