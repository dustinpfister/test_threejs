//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff);
pl.position.set(2, 5, 3);
scene.add(pl);
//-------- ----------
// LOAD MANAGER
//-------- ----------
const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log('manager.onStart');
};
manager.onLoad = function ( ) {
    console.log('manager.onLoad: Dae and textures now loaded.');
    camera.position.set(5,5,5);
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log('manager.onProgress: ' + itemsLoaded + '/' + itemsTotal);
};
manager.onError = function ( url ) {};
//-------- ----------
// DAE LOADER
//-------- ----------
// CREATE A COLLADALOADER INSTANCE
const loader = new THREE.ColladaLoader(manager);
// SETTING THE BASE RESOURCE URL FOR TEXTTURES
loader.setResourcePath('/dae/guy2/guy2-skin-mrg1/');
// THEN LOADING AS USHUAL
loader.load('/dae/guy2/guy2.dae', function (result) {
    console.log('cb of loader.load');
    // adding the child that I want to the scene
    scene.add(result.scene.children[2]);
});

