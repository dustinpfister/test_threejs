
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

    var adjustPositions = function(positions, cutLen, dist){
        dist = dist === undefined ? 4: dist;
        // sides x and z adjust
        positions[1][2] = board.width / 2 - board.height / 2 + dist;
        positions[2][2] = (board.width / 2 - board.height / 2 + dist) * -1;
        positions[3][0] = cutLen / 2 - board.height / 2 + dist;
        positions[4][0] = (cutLen / 2 - board.height / 2 + dist) * -1;
        // sides y adjust
        positions[1][1] = board.width / 2 - board.height / 2;
        positions[2][1] = board.width / 2 - board.height / 2;
        positions[3][1] = cutLen / 2 - board.height / 2;
        positions[4][1] = cutLen / 2 - board.height / 2;
    };

    var setPositions = function(box, positions){
        var i = 0,
        len = 5;
        while(i < len){
            box.children[i].position.set(
                positions[i][0], 
                positions[i][1], 
                positions[i][2]);
           i += 1; 
        }
    };

    // update
    api.update = function(box, dist, per){
        var positions = JSON.parse(JSON.stringify(default_positions));
        adjustPositions(positions, box.userData.cutLen, dist * per);
        setPositions(box, positions);
    };

    // create a box group
    api.create = function(){
        var box = new THREE.Group(),
        positions = JSON.parse(JSON.stringify(default_positions));
        var i = 0,
        len = 5,
        cutLen = box.userData.cutLen = board.len / (len * 1);
        while(i < len){       
            var boardCut = new THREE.Mesh(
                new THREE.BoxGeometry(cutLen, board.height, board.width),
                new THREE.MeshNormalMaterial({
                    side: THREE.DoubleSide
                })
            );
            boardCut.rotation.set(rotations[i][0], rotations[i][1], rotations[i][2]);
            box.add(boardCut);
            i += 1;
        }
        api.update(box, 0, 0);
        return box;
    };


}(this['buildBox'] = {}));
