(function () {
    //******** **********
    // SCENE, CAMERA, RENDERER, LIGHT
    //******** **********
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3)
    scene.add(dl);
    //******** **********
    // CONTROL
    //******** **********
    var grid = new THREE.GridHelper(10, 10, 0xffffff, 0xff0000);
    grid.material.linewidth = 3;
    grid.material.transparent = true;
    grid.material.opacity = 0.25;;
    scene.add(grid);


    //******** **********
    // CONTROL
    //******** **********
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    //-------- ----------
    // LOOP
    //-------- ----------
    let fps = 30,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            // render
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();


// instantiate a loader
const loader = new SVGLoader();

// load a SVG resource
loader.load(
	// resource URL
	'data/svgSample.svg',
	// called when the resource is loaded
	function ( data ) {

		const paths = data.paths;
		const group = new THREE.Group();

		for ( let i = 0; i < paths.length; i ++ ) {

			const path = paths[ i ];

			const material = new THREE.MeshBasicMaterial( {
				color: path.color,
				side: THREE.DoubleSide,
				depthWrite: false
			} );

			const shapes = SVGLoader.createShapes( path );

			for ( let j = 0; j < shapes.length; j ++ ) {

				const shape = shapes[ j ];
				const geometry = new THREE.ShapeGeometry( shape );
				const mesh = new THREE.Mesh( geometry, material );
				group.add( mesh );

			}

		}

		scene.add( group );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

}());
