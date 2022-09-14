(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.5, 1000);
    camera.position.set(3, 3, 6);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 2, 1);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(al);
    const pl = new THREE.PointLight(0xffffff, 0.5);
    pl.position.set(-3, 2, -3);
    scene.add(pl);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // create a plane geo with groups set up to work with images
    const createPlaneGeo = () => {
        const geometry = new THREE.PlaneGeometry(5, 5, 16, 16);
        geometry.rotateX(Math.PI * 1.5);
        let pxIndex = 0, len = 256;
        while(pxIndex < len){
            geometry.addGroup(pxIndex * 6, 6, 0);
            pxIndex += 1;
        }
        return geometry;
    };
    // update plane geo to given imageindex and images array
    const updatePlaneGeo = (geometry, images, imageIndex) => {
        const img = images[imageIndex];
        let pxIndex = 0, len = 256;
        while(pxIndex < len){
            const group = geometry.groups[pxIndex]
            group.materialIndex = img[pxIndex];
            pxIndex += 1;
        }
        return geometry;
    };
    const mkMaterial = (color, opacity, texture) => {
        return new THREE.MeshPhongMaterial({
            color: color,
            map: texture || null,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: opacity
        })
    };
    // data texture module
    var datatex = (function () {
        var api = {};
        // mk data texture helper
        api.mkDataTexture = function (data, w) {
            data = data || [];
            w = w || 0;
            var width = w, //20,
            height = data.length / 4 / w;
            var texture = new THREE.DataTexture(data, width, height);
            texture.needsUpdate = true;
            return texture;
        };
        // create a data texture with a method that will be called for each pix
        api.forEachPix = function (w, h, forEach) {
            var width = w === undefined ? 5 : w,
            height = h === undefined ? 5 : h;
            var size = width * height;
            var data = new Uint8Array(4 * size);
            for (let i = 0; i < size; i++) {
                var stride = i * 4;
                var x = i % width;
                var y = Math.floor(i / width);
                var obj = forEach(x, y, w, h, i, stride, data);
                obj = obj || {};
                data[stride] = obj.r || 0;
                data[stride + 1] = obj.g || 0;
                data[stride + 2] = obj.b || 0;
                data[stride + 3] = obj.a === undefined ? 255: obj.a;
            }
            return api.mkDataTexture(data, width)
        };
        // from px data method
        api.fromPXDATA = function(pxData, width, palette){
            palette = palette || [
                [0,0,0,255],
                [0,255,0,255],
                [32,32,32,255],
                [64,64,64,255],
                [128,128,128,255]
            ];
            var height = Math.floor(pxData.length / width);
            return api.forEachPix(width, height, function(x, y, w, h, i){
                var obj = {};
                var colorIndex = pxData[i];
                var color = palette[colorIndex];
                obj.r = color[0];
                obj.g = color[1];
                obj.b = color[2];
                obj.a = color[3];
                return obj;
            });
        };
        // simple gray scale seeded random texture
        api.seededRandom = function (w, h, rPer, gPer, bPer, range) {
            w = w === undefined ? 5 : w,
            h = h === undefined ? 5 : h;
            rPer = rPer === undefined ? 1 : rPer;
            gPer = gPer === undefined ? 1 : gPer;
            bPer = bPer === undefined ? 1 : bPer;
            range = range || [0, 255]
            var size = w * h;
            var data = new Uint8Array(4 * size);
            for (let i = 0; i < size; i++) {
                var stride = i * 4;
                var v = Math.floor(range[0] + THREE.MathUtils.seededRandom() * (range[1] - range[0]));
                data[stride] = v * rPer;
                data[stride + 1] = v * gPer;
                data[stride + 2] = v * bPer;
                data[stride + 3] = 255;
            }
            return api.mkDataTexture(data, w);
        };
        // return the api
        return api;
    }
    ());
    // create plane mesh to use with images
    const createPlaneMesh = (materials) => {
        // new plane geometry
        var geometry = createPlaneGeo(images, 1);
        var mesh = new THREE.Mesh(
            // geometry as first argument
            geometry,
            // array of materials as the second argument
            materials || [
                mkMaterial(0xffffff, 1, null),
                mkMaterial(0x000000, 1, null),
                mkMaterial(0x888888, 1, null)
            ]
        );
        return mesh;
    };
    //-------- ----------
    // PLANE MATERIAL INDEX DATA
    //-------- ----------
    const images = [
        [
            1,2,2,0,0,0,0,0,0,0,0,0,0,2,2,1,
            2,2,0,0,0,1,1,2,2,1,1,0,0,0,2,2,
            2,0,0,0,1,2,2,0,0,2,2,1,0,0,0,2,
            0,0,0,1,2,0,0,0,0,0,0,2,1,0,0,0,
            0,0,0,2,0,1,2,0,0,2,1,0,2,0,0,0,
            0,0,0,0,0,1,2,0,0,2,1,0,0,0,0,0,
            0,0,0,0,1,1,2,0,0,2,1,1,0,0,0,0,
            0,0,0,0,1,1,2,0,0,2,1,1,0,0,0,0,
            0,0,0,0,2,2,2,1,1,2,2,2,0,0,0,0,
            0,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0,
            0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,
            0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,
            0,0,0,0,2,1,1,1,1,1,1,0,0,0,0,0,
            2,0,0,0,0,2,2,1,1,2,2,0,0,0,0,2,
            2,2,0,0,0,0,0,2,2,0,0,0,0,0,2,2,
            1,2,2,0,0,0,0,0,0,0,0,0,0,2,2,1
        ],
        [
            0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0
        ],
        [
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,1,1,1,2,0,1,1,1,2,0,0,0,
            0,0,0,0,0,2,2,1,1,2,2,2,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,1,1,0,2,1,1,0,0,0,0,0,
            0,0,0,1,1,1,1,0,2,1,1,1,1,2,0,0,
            0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,
            0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
            0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,
            0,0,0,0,0,1,2,0,0,2,1,0,0,0,0,0,
            0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        [
            0,1,2,1,0,1,0,1,0,1,0,1,0,1,0,1,
            1,0,1,2,1,0,1,0,1,0,1,0,1,0,1,0,
            0,1,0,1,2,1,0,1,0,1,0,1,0,1,0,1,
            1,0,1,0,1,2,1,0,1,0,1,0,1,0,1,2,
            0,1,0,1,2,1,0,1,0,1,0,1,0,1,2,1,
            1,0,1,2,1,0,1,0,1,0,1,0,1,2,1,0,
            0,1,0,1,2,1,0,1,0,1,0,1,2,1,0,1,
            1,2,1,2,1,0,1,0,1,0,1,0,1,2,1,0,
            2,1,0,1,0,1,0,1,0,1,0,1,0,1,2,1,
            1,0,1,0,1,0,1,0,1,0,1,0,1,2,1,0,
            0,1,0,1,0,1,0,1,0,1,0,1,2,1,0,1,
            1,0,1,0,1,0,1,0,1,0,1,2,1,0,1,0,
            0,1,0,1,0,1,0,1,0,1,2,1,0,1,0,1,
            1,0,1,0,1,0,1,0,1,2,1,0,1,0,1,0,
            0,1,0,1,0,1,0,1,0,1,2,1,0,1,0,1,
            1,0,1,0,1,0,1,0,1,0,1,2,1,0,1,0
        ]
    ];
    //-------- ----------
    // TEXTURES
    //-------- ----------
    const texture_rnd1 = datatex.seededRandom(32, 32, 1, 1, 1, [128, 255]);
    const texture_top = datatex.fromPXDATA([
        1,1,1,1,
        1,2,3,3,
        1,2,2,2,
        1,2,3,3
    ], 4);
    const texture_side1 = datatex.fromPXDATA([
        1,1,1,1,
        2,3,2,1,
        3,2,3,1,
        1,1,1,1
    ], 4);
    const texture_side2 = datatex.fromPXDATA([
        1,1,1,1,
        2,2,2,2,
        3,3,3,3,
        3,3,3,3
    ], 4);
    const texture_side3 = datatex.fromPXDATA([
        3,1,2,1,
        3,1,1,1,
        3,2,2,2,
        3,3,3,3
    ], 4);
    const texture_side4 = datatex.fromPXDATA([
        3,1,2,2,
        3,1,1,1,
        2,2,2,1,
        3,3,3,1
    ], 4);
    const texture_bottom = datatex.fromPXDATA([
        2,2,1,3,
        1,1,1,3,
        2,2,2,3,
        3,3,3,3
    ], 4);
    //-------- ----------
    // MESH OBJECTS
    //-------- ----------
    var mesh = new THREE.Mesh(
        // geometry as first argument
        new THREE.BoxGeometry(1, 1, 1),
        // array of materials as the second argument
        [
            mkMaterial(0xffffff, 1, texture_side1),
            mkMaterial(0xffffff, 1, texture_side3),
            mkMaterial(0xffffff, 1, texture_top),
            mkMaterial(0xffffff, 1, texture_bottom),
            mkMaterial(0xffffff, 1, texture_side2),
            mkMaterial(0xffffff, 1, texture_side4)
        ]
    );
    mesh.position.set(0, 1.5, 0);
    scene.add(mesh);
    // plane
    const plane = createPlaneMesh([
       mkMaterial(0xffffff, 1, texture_rnd1),
       mkMaterial(0x222222, 1, texture_rnd1),
       mkMaterial(0x008800, 1, texture_rnd1)
    ]);
    updatePlaneGeo(plane.geometry, images, 0);
    scene.add(plane);
    // sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(200, 30, 30),
        new THREE.MeshBasicMaterial({wireframe:true, wireframeLinewidth: 3}))
    scene.add(sphere);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 800;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const alpha = frame / frameMax;
        updatePlaneGeo(plane.geometry, images, [0,1,2,3,0,1,2,3][ Math.floor(alpha * 8)] );
        mesh.rotation.set(
            Math.PI * 2 * 1 * alpha, 
            Math.PI * 2 * 8 * alpha, 0);
        sphere.rotation.y = Math.PI * 2 * alpha;
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