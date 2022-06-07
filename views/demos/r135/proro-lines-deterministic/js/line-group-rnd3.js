//******** **********
// Lines Group rnd3 plug-in
// By Dustin Pfister : https://dustinpfister.github.io/
LineGroup.load({
    key: 'rnd3',
    // default options such as the number of lines, and how many points per line
    opt: {
        lineCount: 3,
        pointsPerLine: 5
    },
    // called just once in LineGroup.create before lines are created for first time
    // this can be used to add generated options that are not part of the
    // start state object
    create: function(opt, lineGroup){
        opt.rndPoints = [];
        var i = 0;
        while(i < opt.lineCount){
            var v = new THREE.Vector3();
            v.x = -3 + THREE.MathUtils.seededRandom() * 6;
            v.y = -3 + THREE.MathUtils.seededRandom() * 6;
            v.z = -3 + THREE.MathUtils.seededRandom() * 6;
            opt.rndPoints.push(v);
            i += 1;
        }
    },
    // for frame method used to set the current 'state' with 'startState', and 'frameData'
    forFrame : function(state, baseData, frameData, lineGroup){

        baseData.v = baseData.v || new THREE.Vector3(0, 3, 0);
        state.v = new THREE.Vector3();
        state.v.set(0, 0, 0).lerp(baseData.v, frameData.bias);

        state.deltas = [];

    },
    // create/update points of a line in the line group with 'current state' object
    forLine : function(points, state, lineIndex, lineCount, lineGroup){
         var ud = lineGroup.userData,
         rndPoints = ud.opt.rndPoints;
         var sp = rndPoints[lineIndex],
         ep = rndPoints[ (lineIndex + 1) % lineCount];
         var i = 0;
         while(i < ud.opt.pointsPerLine){
             var v = sp.clone().lerp(ep, i / ( ud.opt.pointsPerLine-1 ) ).add(state.v)
             points[i].copy( v );
             i += 1;
         }
    }
});