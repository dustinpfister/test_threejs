//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT - directional and ambient
//-------- ----------
// directional light
const dl = new THREE.DirectionalLight(0xffffff, 0.9);
dl.castShadow = true;
dl.shadow.mapSize.width = 256;
dl.shadow.mapSize.height = 256;
dl.shadow.camera.near = 0.5;
dl.shadow.camera.far = 15;
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(al);
//-------- ----------
// HELPERS
//-------- ----------
// create and return a canvas texture
const createCanvasTexture = function (draw, size_canvas) {
    size_canvas = size_canvas === undefined ? 32 : size_canvas;
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size_canvas;
    canvas.height = size_canvas;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
const draw_grid_fill = (ctx, canvas, iw, ih, getColor) => {
    getColor = getColor || function(color){ return color };
    const len = iw * ih;
    const pxW = canvas.width / iw;
    const pxH = canvas.height / ih;
    let i = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    while(i < len){
        const x = i % iw;
        const y = Math.floor(i / iw);
        const color = getColor( new THREE.Color(), x, y, i);
        ctx.fillStyle = color.getStyle();
        const px = x * pxW;
        const py = y * pxH;
        ctx.fillRect(px, py, pxW, pxH);
        i += 1;
    }
};
//-------- ----------
// TEXTURES
//-------- ----------
const texture_grass = createCanvasTexture((ctx, canvas)=>{
    draw_grid_fill(ctx, canvas, 16, 16, (color, x, y, i) => {
        const g = 0.25 + 0.75 * Math.random();
        color.setRGB(0, g, 0);
        return color;
    });
}, 32);
const texture_emissive = createCanvasTexture((ctx, canvas) => {
    const size = 8;
    draw_grid_fill(ctx, canvas, size, size, (color, x, y, i) => {
        let v = 0;
        if(x === 0 || x === size - 1 || y === 0 || y === size - 1){
           v = 1;
        }
        color.setRGB(v, v, v);
        return color;
    });
}, 32);
//-------- ----------
// MATERIALS
//-------- ----------
const materials = {
    house: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveMap: texture_emissive,
        emissiveIntensity: 0
    }),
    ground: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: texture_grass,
        emissive: 0xffffff,
        emissiveMap: texture_emissive,
        emissiveIntensity: 0
    })
};
//-------- ----------
// MESH
//-------- ----------
const house = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), materials.house);
house.position.y = 1;
house.castShadow = true; //default is false
house.receiveShadow = false; //default
scene.add(house);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), materials.ground);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.castShadow = false; //default is false
plane.receiveShadow = true; //default
scene.add(plane);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(house.position);
let frame = 0,
maxFrame = 300;
const loop = function () {
    setTimeout(loop, 33);
    const a1 = frame / maxFrame;
    const a2 = 1 - Math.abs(0.5 - a1)  / 0.5;
    // light intesity
    dl.intensity = 0.9 - 0.9 * a2;
    al.intensity = 0.1 - 0.1 * a2;
    // emmisve intensity
    materials.house.emissiveIntensity = a2;
    materials.ground.emissiveIntensity = a2;
    // change directional light position
    const r = Math.PI * 2 * a1;
    dl.position.set(Math.cos(r) * 5, 5, Math.sin(r) * 5 );
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
