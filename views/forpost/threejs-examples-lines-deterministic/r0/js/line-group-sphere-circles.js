//******** **********
// Lines Group sphereCircles plug-in for line-group.js in the threejs-examples-lines-deterministic project
// By Dustin Pfister : https://dustinpfister.github.io/
LineGroup.load({
    key: 'sphereCircles',
    // default options such as the number of lines, and how many points per line
    opt: {
        lineCount: 15,
        pointsPerLine: 30,
        forLineStyle: function(m, i){
            m.linewidth = 4;
            m.color = new THREE.Color( ['red', 'lime', 'white', 'blue', 'purple'][ i % 5] )
        }
    },
    baseData:{
        maxRadius: 4,
        yAdjust: 1,
        radiusAdjust: 0.25,
        r1: 1,
        r2: 1
    },
    // called just once in LineGroup.create before lines are created
    create: function(opt, lineGroup){

    },
    // for frame method used to set the current 'state' with 'baseData', and 'frameData'
    forFrame : function(state, baseData, frameData, lineGroup){

        state.circleCount = lineGroup.userData.opt.lineCount;
        state.maxRadius = baseData.maxRadius - baseData.maxRadius * baseData.radiusAdjust * frameData.bias;
        state.r1 = baseData.r1;
        state.r2 = baseData.r2;
        state.yAdjust = baseData.yAdjust * frameData.bias;

        // figure radius and other state values for each circle
        var ud = lineGroup.userData;
        var i = 0, len = ud.opt.lineCount;
        while(i < len){
            i += 1;
        }
    },
    // create/update points of a line in the line group with 'current state' object
    forLine : function(points, state, lineIndex, lineCount, lineGroup){
         var ud = lineGroup.userData;
         var i = 0, len = ud.opt.pointsPerLine;


        var s = {};
        s.sPer = (lineIndex + 0) / state.circleCount;
        s.radius = Math.sin( Math.PI * state.r1 * s.sPer ) * state.maxRadius;
        s.y = Math.cos( Math.PI * state.r2 * s.sPer ) * state.maxRadius * state.yAdjust;
        s.i = 0;

         while(i < len ){
            s.cPer =  i / ( len - 1 );
            s.radian = Math.PI * 2 * s.cPer;
            s.v = new THREE.Vector3();
            s.v.x = Math.cos(s.radian) * s.radius;

            s.v.y = s.y;

            s.v.z = Math.sin(s.radian) * s.radius;

             points[i].copy(s.v);
             i += 1;
         }

    }
});
