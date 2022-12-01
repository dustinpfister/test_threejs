(function(){
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1, 2, 3);
    camera.lookAt(0, 0 ,0);
    const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // create 4 count helper
    const create4Count = (radius) => {
        const geo_source = new THREE.TetrahedronGeometry(radius === undefined ? 1 : radius, 0);
        const pos = geo_source.getAttribute('position');
        const geo = new THREE.BufferGeometry();
        const posB = new THREE.BufferAttribute( pos.array.slice(0, 4 * 3), 3);
        geo.setAttribute('position', posB);
        const data = new Uint8Array([1,2,0,  3,1,0,  2,3,0,  1,3,2]);
        const index = new THREE.BufferAttribute(data, 1);
        geo.setIndex(index);
        geo.computeVertexNormals();
        return geo;
    }
    // test helper
    const testTetrahedron = (geo) => {
        const pos = geo.getAttribute('position');
        // if count is not 4 then false
        if(pos.count != 4){
            return false;
        }
        let i_p = 0;
        // check lengths of all edges
        const points = [];
        while(i_p < pos.count){
            points.push( new THREE.Vector3( pos.getX(i_p), pos.getY(i_p),pos.getZ(i_p) ) )
            i_p += 1;
        }
        let point_indices = [ [0,1], [1,2], [2,3], [3,1], [0,2], [0,3] ];
        let n;
        let i2 = 0;
        while(i2 < point_indices.length){
            const a = point_indices[i2]
            const d = points[ a[0] ].distanceTo( points[ a[1] ] );
            if(n === undefined){
                n = d;
            }else{
                if(d != n){
                    return false;
                }
            }
            i2 += 1;
        }
        return true;
    };
    // ---------- ----------
    // CUSTOM GEOMETRY MADE FROM THREE.TetrahedronGeometry
    // ---------- ----------
    const geo = create4Count(2);
    console.log( testTetrahedron(geo) ); // true

/*
    const pos = geo.getAttribute('position');
    let i = 0;
    const points = [];
    while(i < pos.count){
        points.push( new THREE.Vector3( pos.getX(i), pos.getY(i),pos.getZ(i) ) )
        i += 1;
    }

    let point_indices = [ [0,1], [1,2], [2,3], [3,1], [0,2], [0,3] ];
    let n;
    let i2 = 0;
    while(i2 < point_indices.length){
       const a = point_indices[i2]
       const d = points[ a[0] ].distanceTo( points[ a[1] ] );
       i2 += 1;
    }
*/

    //console.log( points[0].distanceTo( points[1] ) );
    //console.log( points[1].distanceTo( points[2] ) );
    //console.log( points[2].distanceTo( points[3] ) );

    //console.log( points[3].distanceTo( points[1] ) );
    //console.log( points[0].distanceTo( points[2] ) );
    //console.log( points[0].distanceTo( points[3] ) );

    // cretaing mesh objects at each vert
/*
    points.forEach( (v) => {
        const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.1, 10, 10) );
        mesh.position.copy(v);
        scene.add(mesh);
    });
*/

    // ---------- ----------
    // LIGHT
    // ---------- ----------
    //const dl = new THREE.DirectionalLight();
    //dl.position.set(0, 1, 2);
    //scene.add(dl);
    // ---------- ----------
    // MESH 
    // ---------- ----------
    //const mesh1 = new THREE.Mesh( geo, new THREE.MeshPhongMaterial({ emissive: new THREE.Color(1,1,1), emissiveIntensity: 0.1 }) );
    const mesh1 = new THREE.Mesh( geo, new THREE.MeshNormalMaterial() );
    scene.add(mesh1);
    // ---------- ----------
    // CONTROLS
    // ---------- ----------
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // ---------- ----------
    // RENDER
    // ---------- ----------
    // loop
    const loop = () => {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();

}());