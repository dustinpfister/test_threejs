//******** **********
// Lines Group sinGrid plug-in for line-group.js r1 in the threejs-examples-lines-deterministic project
// By Dustin Pfister : https://dustinpfister.github.io/
LineGroup.load( (function(){
    // get grid vector helper
    const getGridVector = function(state, lineIndex, lineCount, pointIndex, pointCount, mapping){
        const v = new THREE.Vector3();
        mapping = mapping || 'xz'; // 'xz' of zx mapping
        const ma = mapping.split('');
        const wh = {
           x: state.sizeWidth * 2,
           z: state.sizeHeight * 2
        }
        const pointPer = pointIndex / (pointCount - 1);
        v[ ma[0] ] = ( wh[ ma[0] ] / ( lineCount - 1 ) ) * lineIndex;
        v[ ma[1] ] = wh[ ma[1] ] * pointPer;
        return v;
    };
    // the type object
    return {
        key: 'sinGrid',
        // default options such as the number of lines, and how many points per line
        opt: {
            lineCount: 32,
            pointsPerLine: 40,
            forLineStyle: function(m, i){
                m.linewidth = 4;
                const arr = ['red', 'lime', 'cyan', 'purple', 'blue', 'yellow']
                m.color = new THREE.Color( arr[ i % arr.length] );
                m.transparent = true;
                m.opacity = 1.0;
            }
        },
        baseData:{
            waveHeight: 1,
            simpleWave: false,
            waveCount: 1,
            radianOffsetLoops: 1,
            sizeWidth : 8,
            sizeHeight: 8
        },
        // called just once in LineGroup.create before lines are created
        create: function(opt, lineGroup){
            
        },
        // for frame method used to set the current 'state' with 'baseData', and 'frameData'
        forFrame : function(state, baseData, frameData, lineGroup){
            const opt = lineGroup.userData.opt;
            state.countWidth = opt.lineCount / 2;
            state.sizeWidth = baseData.sizeWidth;
            state.sizeHeight = baseData.sizeHeight;
            // wave height should be adjustable
            state.waveHeight = baseData.waveHeight;
            // can use simple wave expression or not
            state.simpleWave = baseData.simpleWave;
            // I should be able to set wave count
            state.waveCount = baseData.waveCount;
            // have frame data effect radian offset
            state.radianOffset = Math.PI * 2 * baseData.radianOffsetLoops * frameData.per;
        },
        // create/update points of a line in the line group with 'current state' object
        forLine : function(points, state, lineIndex, lineCount, lineGroup){
            const ud = lineGroup.userData, len = ud.opt.pointsPerLine;
            // for each point of each line
            let i = 0;
            // is this the first or second set of lines?
            const a = lineIndex < lineCount / 2 ? 0 : 1;
            const mapping = a == 0 ? 'xz': 'zx';
            const h = state.countWidth;
            const li = lineIndex % h;
            const linePer = li / (h - 1);
            // for each point in the current line 
            while(i < len ){
                const v = getGridVector(state, li, h, i, len, mapping );
                const pointPer = i / (len - 1);
                const radian = state.radianOffset + Math.PI * state.waveCount * linePer * pointPer;
                // set y
                if(state.simpleWave){
                    // simple wave height
                    v.y = Math.sin(radian) * state.waveHeight;
                }else{
                    // variable wave height based on position
                    v.y = Math.sin(radian) * state.waveHeight * ( ( linePer + pointPer ) / 2 );
                }
                points[i].copy(v);
                i += 1;
            }
        }
    };
}()) );
