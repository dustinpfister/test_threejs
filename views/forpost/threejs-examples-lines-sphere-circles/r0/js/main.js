//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//******** **********
// LINES
//******** **********
// just create one circle for a set of circles that form a sphere like shape
const createSphereCirclePoints = function(maxRadius, circleCount, circleIndex, pointsPerCircle, randomDelta){
    const points = [];
    const sPer = circleIndex / circleCount;
    const radius = Math.sin( Math.PI * 1.0 * sPer ) * maxRadius;
    const y = Math.cos( Math.PI * 1.0 * sPer ) * maxRadius;
    let i = 0;
    // buch points for the current circle
    while(i < pointsPerCircle){
        // might want to subtract 1 or 0 for this cPer expression
        const cPer =  i / ( pointsPerCircle - 1 );
        const radian = Math.PI * 2 * cPer;
        const p_radius = radius + Math.random() * randomDelta;
        const v = new THREE.Vector3();
        v.x = Math.cos(radian) * p_radius;
        v.y = y;
        v.z = Math.sin(radian) * p_radius;
        points.push( v.clone().normalize().multiplyScalar(maxRadius) );
        i += 1;
    }
    return points;
};
// create sphere Lines helper
const createSphereLines = function(maxRadius, circleCount, pointsPerCircle, randomDelta, colors, lineWidth){
    colors = colors || [0xff0000,0x00ff00,0x0000ff]
    const lines = new THREE.Group();
    let i = 1;
    while(i < circleCount + 1){
        const p = createSphereCirclePoints(maxRadius, circleCount + 1, i, pointsPerCircle, randomDelta);
        const geometry = new THREE.BufferGeometry().setFromPoints( p);
        const line = scene.userData.line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: colors[i % colors.length],
                linewidth: lineWidth
            })
        );
        lines.add(line);
        i += 1;
    };
    return lines;
};
const g = createSphereLines(8, 20, 100, 1.5, [0x00ffff, 0x008800, 0x008888, 0x00ff00], 6);
scene.add(g);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);

