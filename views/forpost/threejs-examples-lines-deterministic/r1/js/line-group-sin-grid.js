//******** **********
// Lines Group sinGrid plug-in for line-group.js r1 in the threejs-examples-lines-deterministic project
// By Dustin Pfister : https://dustinpfister.github.io/
LineGroup.load( (function(){


    var getGridVector = function(state, lineIndex, lineCount, pointIndex, pointCount, mapping){
        var v = new THREE.Vector3();
        mapping = mapping || 'xz'; // 'xz' of zx mapping
        ma = mapping.split('');
        var wh = {
           x: state.sizeWidth * 2,
           z: state.sizeHeight * 2
        }
        var pointPer = pointIndex / (pointCount - 1);
        v[ ma[0] ] = ( wh[ ma[0] ] / ( lineCount - 1 ) ) * lineIndex;
        v[ ma[1] ] = wh[ ma[1] ] * pointPer;
        return v;        
    };



    return {
        key: 'sinGrid',
        // default options such as the number of lines, and how many points per line
        opt: {
            lineCount: 32,
            pointsPerLine: 40,
            forLineStyle: function(m, i){
                m.linewidth = 4;
                var arr = ['red', 'lime', 'cyan', 'purple', 'blue', 'yellow']
                m.color = new THREE.Color( arr[ i % arr.length] );
            }
        },
        baseData:{
            waveHeight: 1
        },
        // called just once in LineGroup.create before lines are created
        create: function(opt, lineGroup){
            
        },
        // for frame method used to set the current 'state' with 'baseData', and 'frameData'
        forFrame : function(state, baseData, frameData, lineGroup){

            var opt = lineGroup.userData.opt;
            state.countWidth = opt.lineCount / 2;

            state.sizeWidth = 16;
            state.sizeHeight = 16;

            // wave height should be adjustable
            state.waveHeight = baseData.waveHeight;

            // have frame data effect radian offset
            state.radianOffset = Math.PI * 2 * 4 * frameData.per;


            // figure state values for each line
            //var ud = lineGroup.userData;
            //var i = 0, len = ud.opt.lineCount;
            //while(i < len){
            //    i += 1;
            //}
        },
        // create/update points of a line in the line group with 'current state' object
        forLine : function(points, state, lineIndex, lineCount, lineGroup){
            var ud = lineGroup.userData;
            // for each point of each line
            var i = 0, len = ud.opt.pointsPerLine;
            // is this the first or second set of lines?
            var a = lineIndex < lineCount / 2 ? 0 : 1;
            var mapping = a == 0 ? 'xz': 'zx';
            var h = state.countWidth;
            var li = lineIndex % h;
            var linePer = li / (h - 1);
            // for each point in the current line 
            while(i < len ){
                var v = getGridVector(state, li, h, i, len, mapping );

                var pointPer = i / (len - 1);

                var radian = state.radianOffset + Math.PI * 8 * linePer * pointPer;

                // simple wave height
                //v.y = Math.sin(radian) * state.waveHeight;

                // variable wave height based on position
                v.y = Math.sin(radian) * state.waveHeight * ( ( linePer + pointPer ) / 2 );


                //if(a === 0){
                //  v.y = Math.sin( Math.PI * 2 * 4 * pointPer ) * 0.1;
                //}


               //var x = li % h / h;
               //v.y = (x + 0.78 * pointPer ) * 0.5;

                points[i].copy(v);
                i += 1;
            }
        }
    };
}()) );
