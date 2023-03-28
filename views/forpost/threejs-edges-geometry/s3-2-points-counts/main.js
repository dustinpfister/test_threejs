(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // EDGE GEOMETRY CREATED FROM SPHERE GEOMETRY
    //-------- ----------
    const sphereGeo = new THREE.SphereGeometry(0.75, 15, 15);
    const edgeGeo1 = new THREE.EdgesGeometry(sphereGeo, 1);
    const edgeGeo2 = new THREE.EdgesGeometry(sphereGeo, 10);
    const edgeGeo3 = new THREE.EdgesGeometry(sphereGeo, 20);
    // checking point counts for each
    console.log( sphereGeo.getAttribute('position').count ); // 256
    console.log( edgeGeo1.getAttribute('position').count ); // 870
    console.log( edgeGeo2.getAttribute('position').count ); // 750
    console.log( edgeGeo3.getAttribute('position').count ); // 7150
    // making points for all
    [sphereGeo, edgeGeo1, edgeGeo2, edgeGeo3].forEach( (geo, i, arr) => {
        const points = new THREE.Points(
            geo,
            new THREE.PointsMaterial({
                color: new THREE.Color('white'),
                size: 0.1
            }));
        points.position.x = -3 + 6 * (i / arr.length)
        scene.add(points);
    });
    //-------- ----------
    // SCENE
    //-------- ----------
    renderer.render(scene, camera);
}());
