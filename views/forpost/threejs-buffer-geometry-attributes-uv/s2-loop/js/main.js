
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // CANVAS TEXTURE
    //-------- ----------
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = '#004040'; // fill
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'red';
    ctx.beginPath(); // draw red and white circle
    ctx.arc(16, 16, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath(); // draw white square
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    //-------- ----------
    // GEOMETRY
    //-------- ----------
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const uv = geometry.getAttribute('uv');
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
    scene.add(mesh);


    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 20;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const a = frame / frameMax;
        const bias = 1 - Math.abs(a - 0.5) / 0.5;
        uv.array[0] = -2 + 2 * bias;
        uv.array[1] = 2 - 1 * bias;
        uv.needsUpdate = true;
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
