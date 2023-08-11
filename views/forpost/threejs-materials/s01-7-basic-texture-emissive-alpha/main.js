//-------- ----------
// SCENE CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const canvas_texture_grid = ( grid, size = 4, palette = null ) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    grid.forEach( (a, i) => {
        const x = i % canvas.width;
        const y = Math.floor( i / canvas.width );
        if(palette){
            ctx.fillStyle = palette[a];
        }
        if(!palette){
            ctx.fillStyle = new THREE.Color( a, a, a).getStyle();
        }

        ctx.fillRect( x, y, 1, 1);
    });
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    return texture;
};
//-------- ----------
// TEXTURES
//-------- ----------
const texture_map = canvas_texture_grid([
   0, 0, 0, 0,
   0, 1, 1, 1,
   0, 1, 2, 2,
   0, 1, 2, 2
], 4, [ 'red', 'green', 'blue' ]);
const texture_emissive = canvas_texture_grid([
   0.10, 0.20, 0.20, 0.10,
   0.20, 0.80, 0.80, 0.20,
   0.20, 0.80, 0.80, 0.20,
   0.10, 0.20, 0.20, 0.10
], 4);
const texture_alpha = canvas_texture_grid([
    0.00, 1.00, 1.00,0.00,
    1.00, 0.25, 1.00,1.00,
    1.00, 1.00, 0.25,1.00,
    0.00, 1.00, 1.00,0.00
], 4);
//-------- ----------
// BASIC MATERIAL USING A TEXTURE FOR THE MAP OPTION
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture_map,
    emissive: 0xffffff,
    emissiveMap: texture_emissive,
    emissiveIntensity: 0.75,
    alphaMap: texture_alpha,
    transparent: true,
    side: THREE.DoubleSide
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(6, 2, 1);
scene.add(dl);
scene.add(new THREE.GridHelper(10, 10));
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0.75, 1.2, 1.5);
camera.lookAt(0, -0.10, 0);
renderer.render(scene, camera); // render

