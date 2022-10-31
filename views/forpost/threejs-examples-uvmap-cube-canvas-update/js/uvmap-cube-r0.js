// uvmap-cube.js - r0 - from threejs-examples-uvmap-cube-canvas-update
(function (api) {
//-------- ----------
//  HELPERS
//-------- ----------
// get a uvData array for a given uv face index and cell index
const getUVData = (uv, faceIndex, cellIndex, gridSize) => {
    faceIndex = faceIndex === undefined ? 0: faceIndex;
    cellIndex = cellIndex === undefined ? 0: cellIndex;
    gridSize = gridSize === undefined ? 4: gridSize;
    const cellX = cellIndex % gridSize;
    const cellY = Math.floor(cellIndex / gridSize);
    // for each set of uvs for the face
    let di = 0;
    const uvd = 1 / gridSize;
    let uvData = [];
    while(di < 4){
        const i = faceIndex * 4 + di;
        const x = di % 2;
        const y = 1 - 1 * Math.floor(di / 2);
        // get u and v using cellX and cellY
        const u = uvd * cellX + x * uvd;
        const v = 1 - uvd * ( cellY + 1 ) + y * uvd;
        uvData.push({i:i,u:u,v:v});
        di += 1;
    }
    return uvData;
};
// set uvs with the uvData, and order arrays
const setUVData = (uv, uvData, order ) => {
    order = order || [0, 1, 2, 3]; // normal
    uvData.forEach((a, di, uvData) => {
    const b = uvData[ order[di] ]
        uv.setXY(a.i, b.u, b.v);
    });
    uv.needsUpdate = true;
};
// main helper
const setUVFace = (uv, faceIndex, cellIndex, order, gridSize) => {
    const uvData = getUVData(uv, faceIndex, cellIndex, gridSize);
    setUVData(uv, uvData, order );
}

    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // create and return a cube
    api.create = (opt) => {
        opt = opt || {};
        const cs = opt.cubeSize = opt.cubeSize === undefined ? 1 : opt.cubeSize;

        // CREATE BOX GEO
        const geo = new THREE.BoxGeometry(cs, cs, cs);

        const uv = geo.getAttribute('uv');

        // set the uvs once!
        let faceIndex = 0;
        const cellIndices = [5, 7, 1, 9, 4, 6];
        while( faceIndex < 6){
            setUVFace(uv, faceIndex, cellIndices[faceIndex], [0,1,2,3], 4);
            faceIndex += 1;
        }

        // CREATE Mesh User Data
        const mud = {};
        mud.gSize = 20;
        mud.canObj = canvasMod.create({
            size: opt.canvasSize === undefined ? 256 : opt.canvasSize,
            state: mud,
            palette: ['red','white'],
            draw: 'rnd'
        });

        // MATERIAL
        const material = new THREE.MeshPhongMaterial({
            emissive: new THREE.Color(1, 1, 1),
            emissiveMap: mud.canObj.texture_data
        });

        // MESH OBJECT
        const mesh = new THREE.Mesh(geo, material);
        mesh.userData = mud;

        // return a mesh object
        return mesh;
    };

    api.update = () => {

    };

}
    (this['uvMapCube'] = {}));
