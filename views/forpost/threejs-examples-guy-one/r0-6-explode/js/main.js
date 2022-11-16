(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.1, 0.1, 0.1);
    scene.add( new THREE.GridHelper(10, 10) );
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.05, 100);
    const renderer = new THREE.WebGL1Renderer();
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const pl = new THREE.PointLight(0xffffff, 1);
    pl.position.set(3, 2, 1);
    scene.add(pl);
    const al = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(al);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create guy helper
    const createGuy = (scale) => {
        const guy = new Guy();
        const gud =  guy.group.userData;
        gud.scale = scale;
        guy.group.scale.set(scale, scale, scale);
        // for each mesh
        guy.group.traverse(( obj ) => {
            if(obj.type === 'Mesh'){
                const mesh = obj;
                const mud = mesh.userData;
                // I WANT A NON INDEX GEOMETRY
                mesh.geometry = mesh.geometry.toNonIndexed();
                // store refs to pos and a clone of the pos
                const pos = mesh.geometry.getAttribute('position');
                mud.pos = pos;
                mud.pos_home = pos.clone();
                mud.unitDelta = 5;
            }
        });
        // using set to plain surface
        setGuyPos(guy);
        return guy;
    };
    // create a guy by way of a hight scale value
    const createGuyHScale = (HScale) => {
        const scale_h1 = 1 / getGuySize( createGuy(1) ).y;
        const guy = createGuy(HScale * scale_h1);
        return guy;
    };
    // get guy size helper
    const getGuySize = (guy) => {
        const b3 = new THREE.Box3();
        b3.setFromObject(guy.group);
        const v3_size = new THREE.Vector3();
        b3.getSize(v3_size);
        return v3_size;
    };
    // set guy pos using box3 and userData object
    const setGuyPos = (guy, v3_pos) => {
        v3_pos = v3_pos || new THREE.Vector3();
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        guy.group.position.copy(v3_pos);
        guy.group.position.y = ( v3_size.y + gud.scale ) / 2 + v3_pos.y;
    };
    // a set guy rotation helper
    const setGuyRotation = (guy, v3_lookat, ignoreY) => {
        ignoreY = ignoreY === undefined ? true: ignoreY;
        const gud = guy.group.userData;
        const v3_size = getGuySize(guy);
        const v3 = v3_lookat.clone();
        v3.y = guy.group.position.y;
        if(!ignoreY){
            v3.y = v3_lookat.y + ( v3_size.y + gud.scale ) / 2;
        }
        guy.group.lookAt( v3 );
    };
    // update guy method
    const updateGuyEffect = (guy, globalAlpha, effect) => {
        guy.group.traverse( (obj) => {
            if(obj.type === 'Mesh'){
                const mesh = obj;
                const mud = mesh.userData;
                let ti = 0;
                const ct = mud.pos.array.length;
                // for each trinagle
                while(ti < ct){
                    const a1 = (ti + 1) / ct;
                    // for each point of a triangle
                    let pi = 0;
                    while(pi < 3){
                        const i = ti + pi * 3;
                        const a2 = ( pi + 1) / 3;
                        // create vector3 from pos_home
                        const x = mud.pos_home.array[ i ];
                        const y = mud.pos_home.array[ i + 1];
                        const z = mud.pos_home.array[ i + 2];
                        const v_pos_home = new THREE.Vector3(x, y, z);
                        // figure out the delta
                        let v_delta = new THREE.Vector3(0, 0, 1);
                        v_delta = effect(ti, pi, v_pos_home, globalAlpha, mesh, mud, v_delta);
                        // update pos
                        const v_pos = v_pos_home.clone().add( v_delta );
                        mud.pos.array[ i ] = v_pos.x;
                        mud.pos.array[ i + 1] = v_pos.y;
                        mud.pos.array[ i + 2] = v_pos.z;
                        pi += 1;
                    }
                    ti += 9;
                }
                mud.pos.needsUpdate = true;
            }
        });
    };
    //-------- ----------
    // EFFECTS
    //-------- ----------
    // EFFECT 1
    const EFFECT1 = (ti, pi, v_pos_home, globalAlpha, mesh, mud, v_delta) => {
        const a1 = ti / mud.pos.array.length;
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * globalAlpha * (0.25 + a1);
        v_delta.applyEuler(e).normalize().multiplyScalar( globalAlpha * mud.unitDelta);
        return v_delta;
    };
    //-------- ----------
    // CREATE GUY
    //-------- ----------
    // guy1
    const guy1 = createGuyHScale(3);
    scene.add(guy1.group);
    ///-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let f = 0,
    lt = new Date();
    const fMax = 200;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 0.05) {
            const a1 = f / fMax;
            const a2 = 1 - Math.abs(0.5 - a1) / 0.5;

guy1.walk(a1, 8)

            updateGuyEffect(guy1, a2, EFFECT1);
            // draw
            renderer.render(scene, camera);
            f += 30 * secs;
            f %= fMax;
            lt = now;
        }
    };
    loop();
}
    ());
