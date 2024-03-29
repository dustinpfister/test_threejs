// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// base on this: https://github.com/mrdoob/three.js/blob/master/examples/webgl_morphtargets.html
// ---------- ----------
const geo = new THREE.BoxGeometry(2, 2, 2, 8, 8, 8);
geo.morphAttributes.position = [];
const pos = geo.attributes.position;
const data_pos = [];
const data_color = [];
for ( let i = 0; i < pos.count; i ++ ) {
    const x = pos.getX( i );
    const y = pos.getY( i );
    const z = pos.getZ( i );
    data_pos.push(
        x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
        y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
        z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
    );
    const a1 = i / pos.count;
    const r = a1;
    const g = a1 % 0.25 / 0.25;
    const b = a1 % 0.5 / 0.5;;
    data_color.push(r, g, b);
}
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_pos, 3 );
geo.setAttribute('color', new THREE.Float32BufferAttribute( data_color, 3 ));
// ---------- ----------
// MATERIAL, POINTS
// ---------- ----------
const material = new THREE.PointsMaterial({ size: 0.2, vertexColors: true });
const points = new THREE.Points(geo, material);
scene.add(points);
points.morphTargetInfluences[ 0 ] = 1;
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    points.morphTargetInfluences[ 0 ] = a2;
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
