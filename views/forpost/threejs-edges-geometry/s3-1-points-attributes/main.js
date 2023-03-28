(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // EDGE GEOMETRY CREATED FROM SPHERE GEOMETRY
    //-------- ----------
    const sphereGeo = new THREE.SphereGeometry(1, 30, 30);
    const edgeGeo = new THREE.EdgesGeometry(sphereGeo, 10);
    // The source geometry made with the TRHEE.SpgereGeometry constructor has
    // a position, normal, and uv attribute, while edges geometry will just have a 
    // position attribute
    console.log(sphereGeo.attributes); // {position: Nn, normal: Nn, uv: Nn}
    console.log(edgeGeo.attributes)    // {position: Nn}
    // edges geometry might not be good for mesh objects
    // but it is still fine for lines and points
    const points = new THREE.Points(
            edgeGeo,
            new THREE.PointsMaterial({
                color: new THREE.Color('white'),
                size: 0.05
            }));
    scene.add(points);
    //-------- ----------
    // SCENE
    //-------- ----------
    renderer.render(scene, camera);
}());
