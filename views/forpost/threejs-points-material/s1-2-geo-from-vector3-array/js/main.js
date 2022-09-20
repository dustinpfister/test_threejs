(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Vector3 Array to Typed Array
    const Vector3ArrayToTyped = (v3Array) => {
        let i = 0, len = v3Array.length, vertArray = [];
        while(i < len){
            let v = v3Array[i];
            vertArray.push(v.x, v.y, v.z);
            i += 1;
        }
        return new THREE.Float32BufferAttribute(vertArray, 3)
    };
    // Buffer Geometry from v3Array
    const Vector3ArrayToGeometry = (v3Array) => {
        const typedArray = Vector3ArrayToTyped(v3Array);
        const geometry = new THREE.BufferGeometry();
        return geometry.setAttribute('position', typedArray);
    };
    //-------- ----------
    // POINTS
    //-------- ----------
    // ARRAY of VECTOR3 CLASS INSTANCES
    const v3Array = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(2, 0, 0),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, 0, 2),
        new THREE.Vector3(3, 0, 0),
        new THREE.Vector3(0, 3, 0),
        new THREE.Vector3(0, 0, 3)
    ];
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    scene.add(
        new THREE.Points(
            Vector3ArrayToGeometry(v3Array),
            new THREE.PointsMaterial({
                color: 0x00afaf,
                size: 0.25
            })));
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());