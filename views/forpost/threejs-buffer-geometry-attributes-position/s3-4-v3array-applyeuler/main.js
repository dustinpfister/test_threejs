// v3 apply Euler method
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
    // Buffer Geometry from v3Array
    const Vector3ArrayToGeometry = (v3Array) => {
        return new THREE.BufferGeometry().setFromPoints(v3Array);
    };
    // Vector3 array from geometry
    const Vector3ArrayFromGeometry = (geometry) => {
        const pos = geometry.getAttribute('position');
        let i = 0;
        const len = pos.count, v3Array = [];
        while(i < len){
            const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
            v3Array.push(v);
            i += 1;
        }
        return v3Array;
    };
    //-------- ----------
    // POINTS
    //-------- ----------
    const geometry = new THREE.TorusGeometry(2, 0.75, 30, 60);
    geometry.rotateX(Math.PI / 180 * 90);
    const v3Array = Vector3ArrayFromGeometry(geometry);
    v3Array.forEach((v) => {
        const v_delta = new THREE.Vector3(0, 0, 1);
        const eu = new THREE.Euler();
        if(v.y > 0){
            eu.x =  1 * Math.random();
        }
        v_delta.normalize().applyEuler(eu).multiplyScalar(1);
        v.add(v_delta);
    });
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    scene.add(
        new THREE.Points(
            Vector3ArrayToGeometry(v3Array),
            new THREE.PointsMaterial({
                color: 0x00afaf,
                size: 0.125
            })));
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());