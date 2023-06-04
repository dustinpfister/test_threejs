// buffgeo-promise-loader.js - r0 - from threejs-buffer-geometry-loader
const loadBufferGeometryJSON = ( urls = [], w = 2, scale = 5, material = new THREE.MeshNormalMaterial() ) => {
    const scene_source = new THREE.Scene();
    let i = 0;
    const onBufferGeometryLoad =  (geometry) => {
        const x = i % w;
        const z = Math.floor( i / w);
        const mesh = new THREE.Mesh( geometry, material);
        mesh.position.set(x, 0, z).multiplyScalar(scale);
        scene_source.add(mesh);
        i += 1;
    };
    return new Promise( ( resolve, reject ) => {
        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            resolve(scene_source);
        };
        const loader = new THREE.BufferGeometryLoader(manager);
        urls.forEach( (url) => {
           loader.load(url, onBufferGeometryLoad);
        });
    });
};
