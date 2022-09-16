// Lines SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(120, 120, 120);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // SVG LOADER
    //-------- ----------
    // instantiate a loader
    const loader = new THREE.SVGLoader();
    // load a SVG resource
    loader.load(
        // resource URL
        '/forpost/threejs-svg-loader/svg/fff.svg',
        // called when the resource is loaded
        function ( data ) {
            // create a Line for each path
            data.paths.forEach((path)=>{
                const geo = new THREE.BufferGeometry().setFromPoints( path.subPaths[0].getPoints() );
                geo.translate(-90,-80,0);
                geo.rotateX(Math.PI);
                // setting custom line width, this will not work on some platforms
                const material = new THREE.LineBasicMaterial({ linewidth: 6, color: 0xff0000 });
                const line = new THREE.Line(geo, material);
                scene.add(line);
            });
            renderer.render(scene, camera);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
}());
