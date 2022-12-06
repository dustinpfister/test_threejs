(function () {
    //-------- ----------
    // SCENE, RENDER, CAMERA
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10))
    const camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 1000);
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create sin wave position array to use with the setPositions method
    const sinWave = (zStart, zEnd, waves, yMax, pointCount, radianOffset) => {
        const pos = [];
        let i = 0;
        while(i < pointCount){
           const a1 = i / (pointCount - 1);
           const z = zStart - (zStart - zEnd) * a1;
           let r = Math.PI * 2 * waves * a1 + radianOffset;
           r = THREE.MathUtils.euclideanModulo(r, Math.PI * 2);
           const y = Math.sin(r) * yMax;
           pos.push(0, y, z);
           i += 1;
        }
        return pos;
    };
    // color wrap method
/*
    const colorWrap = (palette, pointCount) => {
        const colors = [];
        let i = 0;
        while(i < pointCount){
           const current = palette[ i % palette.length ];
           colors.push(current[0], current[1], current[2]);
           i += 1;
        }
        return colors;
    }
*/
    // color trans
    const colorTrans = (color1, color2, pointCount) => {
        const colors = [];
        let i = 0;
        while(i < pointCount){
           const a1 = i / (pointCount - 1);
           const r = color1.r * (1 - a1) + color2.r * a1;
           const g = color1.g * (1 - a1) + color2.g * a1;
           const b = color1.b * (1 - a1) + color2.b * a1;
           colors.push(r, g, b);
           i += 1;
        }
        return colors;
    }
    //-------- ----------
    // LINE2
    //-------- ----------
    const geo = new THREE.LineGeometry();
    geo.setColors( colorTrans( new THREE.Color(1,0,0), new THREE.Color(0,1,0.5), 80 ));

    //geo.setColors([0,1,0, 0,1,1, 0,1,0]);
    // use vertex colors when setting up the material
    const line_material = new THREE.LineMaterial({
        linewidth: 0.025,
        vertexColors: true
    });
    const line = new THREE.Line2(geo, line_material);
    scene.add(line)
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a1 = frame / frameMax;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        geo.setPositions( sinWave(5, -5, 4, 2, 80, Math.PI * 2 * a1) );
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
