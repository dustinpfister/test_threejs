
(function () {

    // set location of a vert given an index value in geometry.index
    var setVert = function(geometry, vertIndex, pos){
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex]: pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1]: pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2]: pos.z;
    };

    var setTri = function(geometry, triIndex, pos){
        pos = pos || {};
        var vertIndex = triIndex * 3;
        setVert(geometry, vertIndex, pos);
        setVert(geometry, vertIndex + 1, pos);
        setVert(geometry, vertIndex + 2, pos);
    };

    var updateBoxGeo = function(geometry, per){
        var bias = 1 - Math.abs(per - 0.5) / 0.5;
        var size = 0.5 + 1 * bias,
        position = geometry.getAttribute('position'),
        triCount = geometry.getIndex().count / 3,
        i = 0, pos, axis;
        while(i < triCount){
            axis = ['x', 'y', 'z'][Math.floor(i / 4)];
            pos = {};
            pos[axis] = size * ( i % 4 < 2 ? 1: -1);
            setTri(geometry, i, pos);
            i += 1;
        }
   
/*
        setTri(geometry, 0, {x: size});
        setTri(geometry, 1, {x: size});
        setTri(geometry, 2, {x: size * -1});
        setTri(geometry, 3, {x: size * -1});

        setTri(geometry, 4, {y: size});
        setTri(geometry, 5, {y: size});
        setTri(geometry, 6, {y: size * -1});
        setTri(geometry, 7, {y: size * -1});

        setTri(geometry, 8, {z: size});
        setTri(geometry, 9, {z: size});
        setTri(geometry, 10, {z: size * -1});
        setTri(geometry, 11, {z: size * -1});
*/
        // MUST SET THE needsUpdate prop of position to true
        position.needsUpdate = true;
    };

    // scene
    var scene = new THREE.Scene();


    // GEOMETRY - starting with a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);


    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);


    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    var per = 0;
    var loop = function(){
        requestAnimationFrame(loop);
        per += 0.0125;
        per %= 1;
        updateBoxGeo(geometry, per);
        renderer.render(scene, camera);
    };
    loop();

}
    ());
