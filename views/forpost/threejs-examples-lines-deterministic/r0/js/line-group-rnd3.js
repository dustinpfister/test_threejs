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
    baseData:{},
    // called just once in LineGroup.create before lines are created for first time
    // this can be used to add generated options that are not part of the
    // start state object
    create: function(opt, lineGroup){
        opt.rndPoints = [];
        // lerp to points for each point as option
        opt.lerpTo = [];
        var li = 0;
        while(li < opt.lineCount){
            var v = new THREE.Vector3();
            v.x = -3 + THREE.MathUtils.seededRandom() * 6;
            v.y = -3 + THREE.MathUtils.seededRandom() * 6;
            v.z = -3 + THREE.MathUtils.seededRandom() * 6;
            opt.rndPoints.push(v);
            // lerp to points
            var lerpToPoints = [];
            var lt = 0;
            while(lt < opt.pointsPerLine){
                var v2 = new THREE.Vector3();
                v2.x = -3 + THREE.MathUtils.seededRandom() * 6;
                v2.y = -3 + THREE.MathUtils.seededRandom() * 6;
                v2.z = -3 + THREE.MathUtils.seededRandom() * 6;
                lerpToPoints.push(v2);  
                lt += 1;
            }
            opt.lerpTo.push(lerpToPoints);
            li += 1;
        }
    },
    // for frame method used to set the current 'state' with 'baseData', and 'frameData'
    forFrame : function(state, baseData, frameData, lineGroup){
        state.vDeltas = [];
        lineGroup.userData.opt.lerpTo.forEach(function(lerpToPoints){
            var deltas = [];
            lerpToPoints.forEach(function(newPoint){
                deltas.push( newPoint );
            });
            state.vDeltas.push(deltas)
        });
        state.lerpPer = frameData.bias;
    },
    // create/update points of a line in the line group with 'current state' object
    forLine : function(points, state, lineIndex, lineCount, lineGroup){
         var ud = lineGroup.userData,
         rndPoints = ud.opt.rndPoints;
         var sp = rndPoints[lineIndex],
         ep = rndPoints[ (lineIndex + 1) % lineCount];
         var i = 0;
         var vDeltas = state.vDeltas[lineIndex] || [];
         while(i < ud.opt.pointsPerLine){
             var vd = vDeltas[i] || new THREE.Vector3();
             var v1 = sp.clone().lerp(ep, i / ( ud.opt.pointsPerLine - 1 ) );
             var v2 = v1.clone().lerp(vd, state.lerpPer);
             points[i].copy( v2 );
             i += 1;
         }
    }
});