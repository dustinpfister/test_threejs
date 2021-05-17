
(function(api){

    // the board to work with
    var board = {
        len: 24.25,
        height: 0.75,
        width : 7.25
    };

    var rotations = [
       [0,0,0],
       [1.57,0,0],
       [1.57,0,0],
       [0,0,1.57],
       [0,0,1.57]
    ];

    var default_positions = [
       [0, 0, 0],
       [0, 0, 1],
       [0, 0, -1],
       [1, 0, 0],
       [-1, 0, 0]
    ];

/*
    var default_positions = [
       '',
       'z_1',
       'z_-1',
       'x_1',
       'x_-1',
    ];
*/
    // create a box group
    api.create = function(){
        var box = new THREE.Group(),
        positions = default_positions;

        var i = 0,
        len = 5,
        cutLen = board.len / len;

        // sides
        positions[1][2] = board.width / 2 - board.height / 2;
        positions[2][2] = (board.width / 2 - board.height / 2) * -1;

        positions[3][0] = cutLen / 2 - board.height / 2;
        positions[4][0] = (cutLen / 2 - board.height / 2) * -1;


        while(i < len){       
            var boardCut = new THREE.Mesh(
                new THREE.BoxGeometry(cutLen, board.height, board.width),
                new THREE.MeshNormalMaterial({
                    side: THREE.DoubleSide
                })
            );
            boardCut.rotation.set(rotations[i][0], rotations[i][1], rotations[i][2]);
            boardCut.position.set(
                positions[i][0], 
                positions[i][1], 
                positions[i][2]);
            box.add(boardCut);
            i += 1;
        }
        return box;
    };

}(this['buildBox'] = {}));

var scene = new THREE.Scene();
scene.add(buildBox.create());

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

// controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// loop
var lt = new Date(),
frame = 0,
maxFrame = 600,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
