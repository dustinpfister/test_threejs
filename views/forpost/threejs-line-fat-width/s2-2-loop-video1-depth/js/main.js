(function () {
    //-------- ----------
    // SCENE, RENDER, CAMERA
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    const camera = new THREE.PerspectiveCamera(40, 320 / 240, 2.5, 25);
    //camera.position.set(12, 12, 12);
    //camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create sin wave position array to use with the setPositions method
    const sinWave = (zStart, zEnd, x, waves, yMax, pointCount, radianOffset) => {
        const pos = [];
        let i = 0;
        while(i < pointCount){
           const a1 = i / (pointCount - 1);
           const z = zStart - (zStart - zEnd) * a1;
           let r = Math.PI * 2 * waves * a1 + radianOffset;
           r = THREE.MathUtils.euclideanModulo(r, Math.PI * 2);
           const y = Math.sin(r) * yMax;
           pos.push(x, y, z);
           i += 1;
        }
        return pos;
    };
    // color trans
    const colorTrans = (color1, color2, posArray, camera) => {
        const colors = [];
        let i = 0;
        const pointCount = posArray.length / 3;
        while(i < pointCount){
           const a1 = i / (pointCount - 1);
           // raw color values
           let r = color1.r * (1 - a1) + color2.r * a1;
           let g = color1.g * (1 - a1) + color2.g * a1;
           let b = color1.b * (1 - a1) + color2.b * a1;
           // vector3 in pos Array
           let v3 = new THREE.Vector3( posArray[i], posArray[i + 1], posArray[i + 2] );
           const d = v3.distanceTo(camera.position);
           let a_d = 0;
           if(d >= camera.near && d <= camera.far){
                a_d = 1 - 1 * (d - camera.near) / ( camera.far - camera.near );
           }
           colors.push(r * a_d, g * a_d, b * a_d);
           i += 1;
        }
        return colors;
    };
    // update line group
    const updateLine2Group = (l2Group, camera, a1 ) => {
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        let i = 0;
        const count = l2Group.children.length;
        const pointCount = 120;
        while(i < count){
            const a_line = i / (count);
            const a_line2 = 1 - Math.abs(0.5 - a_line) / 0.5;
            const line = l2Group.children[i];
            const x = -5 + 10 * a_line;
            const yMax = 1 + 3 * a_line2;
            const radianOffset = Math.PI * 2 / count * i + Math.PI * 2 * a1;
            const posArray = sinWave(5, -5, x, 4, yMax, pointCount, radianOffset);
            line.geometry.setPositions( posArray );
            // color
            const c1 = new THREE.Color(1,0,1 - a_line);
            const c2 = new THREE.Color(a_line, 1, 0);
            const colorArray = colorTrans( c1, c2, posArray, camera );
            line.geometry.setColors( colorArray );
            i += 1;
        }
    };
    const createLine2Group = (count) => {
        const group = new THREE.Group();
        scene.add(group);
        let i = 0;
        while(i < count){
            const a_line = i / (count - 1);
            const geo = new THREE.LineGeometry();
            // use vertex colors when setting up the material
            const line_material = new THREE.LineMaterial({
                linewidth: 0.05, //0.05 - 0.025 * a_line,
                vertexColors: true
            });
            const line = new THREE.Line2(geo, line_material);
            group.add(line);
            i += 1;
        }
        return group;
    };
    //-------- ----------
    // LINE2
    //-------- ----------
    const group = createLine2Group(10);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const campos1 = new THREE.Vector3(15, 15, 15);
    const campos2 = new THREE.Vector3(-5, 5, 5);
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        camera.position.copy(campos1).lerp(campos2, a2);
        camera.lookAt(0, 0, 0);
        updateLine2Group(group, camera, a1 * 4 % 1);
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}
    ());
