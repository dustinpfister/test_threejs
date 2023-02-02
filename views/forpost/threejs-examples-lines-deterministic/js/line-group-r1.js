//-------- ----------
// Lines Grpoup module - ( r1 )
// By Dustin Pfister : https://dustinpfister.github.io/
//-------- ----------
const LineGroup = (function(){
    const DEFAULT_FORLINESTYLE = function(m, i){
        m.linewidth = 4;
        m.color = new THREE.Color( ['red', 'lime', 'white', 'blue', 'purple'][ i % 5] );
    };
    //-------- ----------
    // BUILT IN TYPE(S)
    //-------- ----------
    const TYPES = {};
    // just a 'tri' built in type will be built in for now to mainly serve as an example
    // on how to make custom types built into the module itself
    TYPES.tri = {
        key: 'tri',
        // default options such as the number of lines, and how many points per line
        // these are options that should be given just once when creating the line group
        opt: {
            lineCount: 3,
            pointsPerLine: 80,
            forLineStyle: function(m, i){
                m.linewidth = 4;
                m.color = new THREE.Color( 'lime' );
            }
        },
        // base data for the lines that can be changed when calling set method these are then
        // values that define starting conditions for a determinstic animation
        baseData:{
            // the three home vectors to use that define the starting positions
            // of the three Vectors of the triangle
            homeVectors: [
                new THREE.Vector3(3, 0, 0),
                new THREE.Vector3(-3, 0, 3),
                new THREE.Vector3(-3, 0, -3)
            ],
            lerpVectors: [],
            rBase: 2,
            rDelta: 8
        },
        // called just once in LineGroup.create before lines are created, this can be used to
        // generate options once rather than on a frame by frame basis
        create: function(opt, lineGroup){},
        // for frame method used to set the current 'state' with 'baseData', and 'frameData' objects
        forFrame : function(state, baseData, frameData, lineGroup){
            const ud = lineGroup.userData, len = ud.opt.lineCount;
            let i = 0;
            // for this tri type I want to create an array of three Vectors
            // based on the home vectors of the base data
            state.vectors = [];
            state.t = 1 - frameData.bias;
            state.rCount = baseData.rBase + baseData.rDelta * frameData.bias;
            while(i < len){
                const v = state.vectors[i] = new THREE.Vector3();
                const hv = baseData.homeVectors[i] || new THREE.VEctor3();
                const lv = baseData.lerpVectors[i] || new THREE.Vector3();
                v.copy(hv).lerp(lv, frameData.bias)
                i += 1;
            }
        },
        // create/update points of a line in the line group with 'current state' object
        forLine : function(points, state, lineIndex, lineCount, lineGroup){
            const ud = lineGroup.userData, len = ud.opt.pointsPerLine;
            let i = 0;
            // start and end points
            const vs = state.vectors[lineIndex],
            ve = state.vectors[ (lineIndex + 1) % 3 ];
            while(i < len){
                let pPer = i / (len - 1),
                pBias = 1 - Math.abs(0.5 - pPer) / 0.5;
                const v1 = new THREE.Vector3();
                const dx = 0,
                dy = 3 * Math.cos( Math.PI * state.rCount *  pBias) * state.t,
                dz = 0;
                v1.copy(vs).lerp( ve, i / ( len - 1 ) ).add(new THREE.Vector3(dx, dy, dz));
                points[i].copy(v1);
                i += 1;
            }
        }
    };
    //-------- ----------
    // PUBLIC API START
    //-------- ----------
    const api = {};
    //-------- ----------
    // CREATE METHOD
    //-------- ----------
    // create a type
    api.create = function(typeKey, opt){
        typeKey = typeKey || 'tri';
        typeObj = TYPES[typeKey];
        // make the line group
        const lineGroup = new THREE.Group();
        // the opt object
        // use given option, or default options to create an opt object
        opt = opt || {};
        Object.keys( typeObj.opt ).forEach(function(key){
            opt[key] = opt[key] || typeObj.opt[key]; 
        });
        // create blank points
        const groupPoints = [];
        let lineIndex = 0;
        while(lineIndex < opt.lineCount){
            let pointIndex = 0;
            const points = [];
            while(pointIndex < opt.pointsPerLine){
                points.push( new THREE.Vector3() )
                pointIndex += 1;
            }
            groupPoints.push(points);
            lineIndex += 1;
        }
        // user data object
        const ud = lineGroup.userData; 
        ud.typeKey = typeKey;
        ud.opt = opt;
        ud.groupPoints = groupPoints;
        ud.forLineStyle = opt.forLineStyle || DEFAULT_FORLINESTYLE;
        // call create hook
        typeObj.create(opt, lineGroup);
        // call set for first time
        api.set(lineGroup, 0, 30, {});
        return lineGroup;
    };
    //-------- ----------
    // LOAD METHOD
    //-------- ----------
    // load a type
    api.load = function(typeObj){
        typeObj.baseData = typeObj.baseData || {}; 
        TYPES[typeObj.key] = typeObj;
    };
    //-------- ----------
    // SET METHOD
    //-------- ----------
    // get frameData object helper
    const getFrameData = function(frame, frameMax){
        const frameData = {
            frame: frame,
            frameMax: frameMax
        };
        frameData.per = frameData.frame / frameData.frameMax;
        frameData.bias = 1 - Math.abs(0.5 - frameData.per) / 0.5;
        return frameData;
    };
    // set a line group with the given frame, maxFrame, and initState
    api.set = function(lineGroup, frame, frameMax, baseData){
        const ud = lineGroup.userData,
        typeKey = ud.typeKey,
        typeObj = TYPES[typeKey];
        // parse baseData
        baseData = ud.baseData = baseData || {};
        Object.keys( typeObj.baseData ).forEach(function(key){
            baseData[key] = baseData[key] === undefined ? typeObj.baseData[key]: baseData[key]; 
        });
        // start with clean state object
        const state = {};
        // frame data object
        const frameData = getFrameData(frame, frameMax);
        // call for frame method of type to update state object
        typeObj.forFrame(state, baseData, frameData, lineGroup);
        // create or update lines
        ud.groupPoints.forEach(function(points, lineIndex){
            const lineCount = ud.opt.lineCount;
            // call for line to update points
            typeObj.forLine(points, state, lineIndex, lineCount, lineGroup);
            // get current line            
            let line = lineGroup.children[lineIndex];
            // no line? create and add it
            if( !line ){
                // create and add the line
                const geo = new THREE.BufferGeometry();
                // calling set from points once, when making the line
                // for the first time should work okay
                geo.setFromPoints(points);
                // create the line for the first time
                line = new THREE.Line(geo, new THREE.LineBasicMaterial());
                // Using the add method is needed, but I might still need to make sure
                lineGroup.add(line);
            }
            // so then I have a line and I just need to update the position attribute
            // but I can not just call the set from points method as that will result in
            // a loss of context error
            const geo = line.geometry,
            pos = geo.getAttribute('position');
            points.forEach(function(v, i){
                pos.array[i * 3] = v.x;
                pos.array[i * 3 + 1] = v.y;
                pos.array[i * 3 + 2] = v.z;
            });
            pos.needsUpdate = true;
            // update line style
            ud.forLineStyle(line.material, lineIndex, lineCount, lineGroup, frameData, baseData);
        });
    };
    // return public API
    return api;
}());
