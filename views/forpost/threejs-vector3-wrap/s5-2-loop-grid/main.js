// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// mod method that just wraps THREE.MathUtils.euclideanModulo
const mod = function (a, b) {
    return THREE.MathUtils.euclideanModulo(a, b);
};
// wrap method using THREE.MathUtils.euclideanModulo mod
const wrap = function (value, a, b){
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    if(max === 0 && min === 0){
        return 0;
    }
    const range = max - min;
    const a_range = mod(value + Math.abs(min), range) / range;
    return min + range * a_range; 
};
// position a group of child objects to a grid
const groupToGrid = function(group, size = 5, divisions = 5, offset = new THREE.Vector2( 0.5, 0.5 ), forChild ){
    let i = 0;
    const len = size * size;
    while(i < len){
        const obj = group.children[i];
        const gx = i % size;
        const gz = Math.floor( i / size );
        obj.position.x = size / 2 * -1 + gx + offset.x;
        obj.position.z = size / 2 * -1 + gz + offset.y;
        obj.position.x = wrap(obj.position.x, size / 2 * -1, size / 2);
        obj.position.z = wrap(obj.position.z, size / 2 * -1, size / 2);
        if(forChild){
            let a_dist = obj.position.distanceTo(group.position) / ( size / 2 );
            a_dist = s_dist = THREE.MathUtils.clamp(a_dist, 0, 1);
            forChild(obj, i, gx, gz, a_dist, group);
        }
        i += 1;
    }
};
// opacity for child effect
const forChild_opacity = (function(){
    const curve_path = new THREE.CurvePath();
    const v1 = new THREE.Vector2(0.00, 1.00);
    const v2 = new THREE.Vector2(0.80, 1.00);
    const v3 = new THREE.Vector2(1.00, 0.00);
    const c1 = v2.clone().lerp(v3, 0.5).add( new THREE.Vector2( 0.0, 1.00) );
    curve_path.add( new THREE.LineCurve( v1, v2 ) );
    curve_path.add( new THREE.QuadraticBezierCurve( v2, c1, v3 ) );
    return (obj, i, gx, gz, a_dist, group) => {
        const v = curve_path.getPoint(a_dist);
        //obj.material.opacity = 1 - a_dist;
        obj.material.opacity = v.y;
    };
}());
// ---------- ----------
// GROUP OF OBJECTS
// ---------- ----------
const size = 10, divisions = 10;
const group = new THREE.Group();
scene.add(group);
let i = 0;
const len = size * size;
while(i < len){
    const a_x = (i % size) / size;
    const a_y = Math.floor(i / size) / size;
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color(1 - a_x, 0.25, a_y),
            transparent: true
        })
    );
    group.add(mesh);
    i += 1;
}
// ---------- ----------
// GRID HELPER
// ---------- ----------
scene.add( new THREE.GridHelper( size, divisions ) );
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set( -8, 8, -8 );
camera.lookAt(0,0,0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 90;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a_frame = frame / frameMax;
    const a_y = Math.sin( Math.PI * 2 * a_frame );
    const v_offset = new THREE.Vector2(0, 0);
    v_offset.x = 0.5 + size * a_frame;
    v_offset.y = 0.5 + size * a_y;
    groupToGrid( group, size, divisions, v_offset, forChild_opacity );
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
