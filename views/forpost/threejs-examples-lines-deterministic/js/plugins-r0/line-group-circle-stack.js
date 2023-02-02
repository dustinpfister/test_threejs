//******** **********
// Lines Group circleStack plug-in for line-group.js r0 in the threejs-examples-lines-deterministic project
// By Dustin Pfister : https://dustinpfister.github.io/
LineGroup.load({
    key: 'circleStack',
    // default options such as the number of lines, and how many points per line
    opt: {
        lineCount: 5,
        pointsPerLine: 30
    },
    baseData:{
        radiusMax : 3,
        yDelta: 0.25,
        waveCount: 2
    },
    // called just once in LineGroup.create before lines are created
    create: function(opt, lineGroup){},
    // for frame method used to set the current 'state' with 'baseData', and 'frameData'
    forFrame : function(state, baseData, frameData, lineGroup){
        state.radius = [];
        state.yDelta = baseData.yDelta;
        // figure radius and other state values for each circle
        const ud = lineGroup.userData,len = ud.opt.lineCount;
        let i = 0;
        const rDiff = baseData.radiusMax - baseData.radiusMin;
        while(i < len){
            const radian = Math.PI * baseData.waveCount * ( ( 1 / len * i + frameData.per) % 1);
            state.radius[i] = Math.cos(radian) * baseData.radiusMax;
            i += 1;
        }
    },
    // create/update points of a line in the line group with 'current state' object
    forLine : function(points, state, lineIndex, lineCount, lineGroup){
         const ud = lineGroup.userData, len = ud.opt.pointsPerLine;
         let i = 0;
         while(i < len){
             const v1 = new THREE.Vector3();
             const cPer = i / (len - 1);
             const r = Math.PI * 2 * cPer; 
             v1.x = Math.cos(r) * state.radius[lineIndex];
             v1.z = Math.sin(r) * state.radius[lineIndex];
             v1.y = state.yDelta * lineIndex;
             points[i].copy(v1);
             i += 1;
         }
    }
});
