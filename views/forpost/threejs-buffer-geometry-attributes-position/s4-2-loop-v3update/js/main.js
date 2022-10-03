(function () {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // set location of a vert given an index value in geometry.index
    const setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        const posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };
    // set pos for tri index
    const setTri = function(geometry, triIndex, pos){
        pos = pos || {};
        const vertIndex = triIndex * 3;
        setVert(geometry, vertIndex, pos);
        setVert(geometry, vertIndex + 1, pos);
        setVert(geometry, vertIndex + 2, pos);
    };
    // update method for a box geo
    const updateBoxGeo = function(geometry, per){
        const bias = 1 - Math.abs(per - 0.5) / 0.5,
        size = 0.5 + 1 * bias,
        position = geometry.getAttribute('position'),
        triCount = geometry.getIndex().count / 3;
        let i = 0, pos, axis;
        while(i < triCount){
            axis = ['x', 'y', 'z'][Math.floor(i / 4)];
            pos = {};
            pos[axis] = size * ( i % 4 < 2 ? 1: -1);
            setTri(geometry, i, pos);
            i += 1;
        }
        // MUST SET THE needsUpdate prop of position to true
        position.needsUpdate = true;
    };
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(3, 3, 3);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // GEOMETRY, MESH
    //-------- ----------
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);
    camera.lookAt(mesh.position);
    //-------- ----------
    // LOOP
    //-------- ----------
    const maxFrames = 300,
    FPS = 30;
    let lt = new Date(), per = 0;
    const loop = function(){
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS){
            per += 1 / (maxFrames / FPS) * secs;
            per %= 1;
            updateBoxGeo(geometry, per);
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
}());
