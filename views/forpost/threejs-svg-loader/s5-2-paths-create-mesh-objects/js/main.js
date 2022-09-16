// Paths SVG DEMO
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(150, 150, 150);
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
            // get minMax value for all paths
            const minMax =  data.paths.reduce( (acc, path)=>{
                path.subPaths[0].getPoints().forEach((v2)=>{
                    if(v2.x < acc.xMin){
                        acc.xMin = v2.x;
                    }
                    if(v2.x > acc.xMax){
                        acc.xMax = v2.x;
                    }
                    if(v2.y < acc.yMin){
                       acc.yMin = v2.y;
                    }
                    if(v2.y > acc.yMax){
                        acc.yMax = v2.y;
                    }
                });
               return acc;
            }, {xMin: Infinity, xMax: -Infinity, yMin: Infinity, yMax: -Infinity});
            // create a group of mesh objects using each Vector2 of eash path
            const group = new THREE.Group();
            data.paths.forEach(function(path){
                //const path = path.subPaths[0];
                const points = path.subPaths[0].getPoints();
                // create a mesh for each point
                points.forEach(function(v2){
                    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), new THREE.MeshNormalMaterial());
                    mesh.position.set(v2.x - minMax.xMax / 2, v2.y - minMax.yMax / 2, 0);
                    group.add(mesh);
                });
            });
            scene.add(group);
            group.rotation.x = Math.PI;
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
