/* seq-hooks.js - r2 - from threejs-examples-sequence-hooks
 *        * Made 'OTHER' publuc methods private helper
 *        * using this['seqHooks'] = {} in place of returning public api
 *        * using let and const
 *        * V3Paths
 */
(function (api) {
    //-------- ----------
    // SET PART FRAME FUNCTIONS
    //-------- ----------
    const partFrameFunctions = {
        // expressions used in r0
        r0: function(seq, per2, obj){
            seq.partFrameMax = Math.floor( (per2 - obj.per) * seq.frameMax );
            seq.partFrame = seq.frame - Math.floor( seq.frameMax * obj.per );
        },
        r0cap: function(seq, per2, obj){
            partFrameFunctions['r0'](seq, per2, obj);
            seq.partFrame = seq.partFrame >= seq.partFrameMax ? seq.partFrameMax - 1 : seq.partFrame;
        },
        // new expression for r1
        r1: function(seq, per2, obj){
            seq.partFrameMax = Math.round( (per2 - obj.per) * seq.frameMax );
            seq.partFrame = Math.floor(seq.frame - seq.frameMax * obj.per);
        }
    }
    //-------- ----------
    // HELPERS
    //-------- ----------
    // no operation
    const noop = function(){};
    // internal get per method
    const getPer = function(a, b){
        return a / b;
    };
    // internal get bias method
    const getBias = function(per){
        return 1 - Math.abs( 0.5 - per ) / 0.5;
    };
    // get total secs value helper
    const getTotalSecs = function(seq){
        return seq.objects.reduce(function(acc, obj){ return acc + (obj.secs || 0) }, 0);
    };
    // get sin bias helper
    const getSinBias = function(per){
        const b = getBias(per);
        return Math.sin( Math.PI * 0.5 * b );
    };
    // create and return a getPer method to be used as seq.getPer
    const createGetPerMethod = function(seq){
        return function(count, objectPer){
            // by default return current 1 count per value for the current sequence object
            count = count === undefined ? 1 : count;
            objectPer = objectPer === undefined ? true: objectPer;
            // if I want a objectPer value
            let a = seq.partFrame, b = seq.partFrameMax;
            // not object per
            if(!objectPer){
                a = seq.frame; 
                b = seq.frameMax;
            }
            // base p value
            let p = getPer(a, b);
            // return base p value effected by count
            return p * count % 1;
        };
    };
    // create a get bias method to be used for sm.getBias
    const createGetBiasMethod = function(seq){
        return function(count, objectPer){
            const per = seq.getPer(count, objectPer);
            return getBias(per);
        };
    };
    // create a get bias method to be used for sm.getBias
    const createGetSinBiasMethod = function(seq){
        return function(count, objectPer){
            const per = seq.getPer(count, objectPer);
            return getSinBias(per);
        };
    };
    // just get an array of per values based on sec values for each object, and DO NOT MUTATE the seq object
    const getPerValues = function(seq){
        const secsTotal = getTotalSecs(seq);
        const perValues = [];
        let i = 0, len = seq.objects.length;
        while(i < len){
            const per = perValues[i - 1];
            if( per === undefined ){
                perValues.push(0);
            }else{
                const perDelta = seq.objects[i - 1].secs / secsTotal;
                perValues.push( parseFloat( ( per + perDelta ).toFixed(4) ) );
            }
            i += 1;
        }
        return perValues;
    };
    // get a target frames value
    const getTargetFrames = function(seq, fps){
        fps = fps === undefined ? 30 : fps;
        const secsTotal = getTotalSecs(seq);
        return Math.ceil(secsTotal * fps);
    };
    // set per values
    const setPerValues = function(seq, fps){
        // set seq.totalSecs
        seq.totalSecs = getTotalSecs(seq);
        // set per values
        getPerValues(seq).forEach(function(per, i){
            seq.objects[i].per = per;
        });
        // set frameMax
        seq.frameMax = getTargetFrames(seq, fps);
        return seq;
    };
    //-------- ----------
    // CREATE - create and return a new seq object
    //-------- ----------
    // Parse a v3Paths object, filling in any blanks, anc convert forms other than v3array to v3array
    const parseV3PathsObject = (seq, v3Paths) => {
        // check each path object given
        v3Paths.forEach( (pathObj) => {
            // must have a key, array, and lerp bool
            pathObj.key = pathObj.key || 'unnamed_' + Object.keys(seq.v3Paths.paths).length;
            pathObj.array = pathObj.array || [];
            pathObj.lerp = pathObj.lerp === undefined ? false : pathObj.lerp; 
            // IF NUMBER ARRAY, convert to vector3 array
            if(typeof pathObj.array[0] === 'number'){
                let v3Array = [];
                let i = 0, len = pathObj.array.length;
                while(i < len){
                    v3Array.push(new THREE.Vector3(
                        pathObj.array[i],
                        pathObj.array[i + 1],
                        pathObj.array[i + 2]
                    ))
                    i += 3;
                }
                pathObj.array = v3Array;
            }
        });
    };
    // create new seq object method
    api.create = function(opt){
        opt = opt || {};
        opt.setPerValues = opt.setPerValues === undefined ? true : false;
        const seq = {};
        seq.objectIndex = 0;  // index of current sequence object in seq.objects
        seq.per = 0;          // main per and bias values
        seq.bias = 0;
        seq.frame = 0;        // frame and frameMax for the full video
        seq.frameMax = 100;
        seq.partFrameMax = 0; // partFrame and partFrame max are set by the Part Frame Function ( seq.pff )
        seq.partFrame = 0;
        seq.pff = opt.pff || 'r1';
        // parse hooks
        seq.beforeObjects = opt.beforeObjects || noop;
        seq.afterObjects = opt.afterObjects || noop;
        // setup sequence objects
        seq.objects = ( opt.objects || [] ).map(function(obj){
            obj.per = obj.per === undefined ? 0 : obj.per;
            obj.secs = obj.secs === undefined ? 0 : obj.secs;
            obj.data = obj.data || {};
            obj.update = obj.update || noop;
            obj.v3Paths = obj.v3Paths || [];
            // parse v3Paths into Vector3 objects if numbers are given
            parseV3PathsObject(seq, obj.v3Paths);
            return obj;
        });
        // set per values is part of the create process
        if(opt.setPerValues){
            setPerValues(seq, opt.fps === undefined ? 30: opt.fps);
        }
        // create get per method for this object
        seq.getPer = createGetPerMethod(seq);
        seq.getBias = createGetBiasMethod(seq);
        seq.getSinBias = createGetSinBiasMethod(seq);
        // MAIN seq.v3Paths object
        seq.v3Paths = {
            main: opt.v3Paths || [],
            paths: {}
        };
        // get pos helper
        seq.getPos = (key) => {
            return seq.v3Paths.paths[key];
        };
        // copy pos helper
        seq.copyPos = (key, target) => {
            target = target || {};
            const v3 = seq.v3Paths.paths[key];
            // if target is object3d assume copy to position
            if(target.isObject3D){
                target.position.copy(v3);
            }
            // if instance of Vector3 assume copy to that
            if(target instanceof THREE.Vector3){
                target.copy(v3)
            }
            return v3;
        };
        parseV3PathsObject(seq, seq.v3Paths.main );
        // CALL SET FRAME FOR FIRST TIME
        api.setFrame(seq, seq.frame, seq.frameMax);
        return seq;
    };
    //-------- ----------
    // SET FRAME
    //-------- ----------
    // set v3 paths for an object ( main seq object or a seq.objects object )
    const setV3PathsForObject = (seq, mainObj) => {
        const obj = mainObj ? seq : seq.objects[seq.objectIndex];
        const per = mainObj ? seq.per : seq.partPer;
        const v3Paths = mainObj ? seq.v3Paths.main : obj.v3Paths;
        const maxFrame = mainObj ? seq.frameMax: seq.partFrameMax;
        if(v3Paths){
            let i = 0, len = v3Paths.length;
             while(i < len){
                 const pathObj = v3Paths[i];
                 const array = pathObj.array;
                 const cv = new THREE.Vector3(); // current vector
                 const len = array.length - 1;
                 let vi1 = Math.floor( len * per );
                 let vi2 = vi1 + 1;
                 vi2 = vi2 > len ? len : vi2;
                 // if lerp mode is true I will want to have a Vector3 that
                 // is between two as there is not one on a frame by frame basic
                 if(pathObj.lerp && array.length < maxFrame){
                     const alpha =  len * per % 1;
                     cv.copy( array[ vi1 ] ).lerp( array[ vi2 ], alpha );
                 }else{
                     // if not lerp mode just copy a vector3 from
                     // the array is it is equal to or greater than
                     // the count of frames
                     let vi1 = Math.floor( array.length * per );
                     vi1 = vi1 > len ? len : vi1;
                     cv.copy( array[ vi1 ] );
                 }
                 // key in to seq.v3Paths
                 seq.v3Paths.paths[ pathObj.key ] = cv;
                 i += 1;
             }
        }
    };
    // set v3 paths for main seq and current object in seq.objects
    const setV3Paths = (seq) => {
        seq.v3Paths.paths = []; // clear paths to empty array
        setV3PathsForObject(seq, true);
        setV3PathsForObject(seq, false);
    };
    // update the given seq object by way of a frame, and maxFrame value
    api.setFrame = function(seq, frame, frameMax){
        seq.frame = frame === undefined ? 0 : frame;
        seq.frameMax = frameMax === undefined ? 100 : frameMax;
        // just making sure frame value is vaild
        seq.frame = seq.frame % frameMax;
        // set main per and bias values
        seq.per = getPer(seq.frame, seq.frameMax);
        seq.bias = getBias(seq.per);
        // update object index
        seq.objectIndex = 0;
        let i = 0, len = seq.objects.length;
        while(i < len){
            const obj = seq.objects[i];
            let per2 = 1;
            if(seq.objects[i + 1] != undefined){
                per2 = seq.objects[i + 1].per;
            }
            // if this is the current object update object 
            // index as well as other relevant values
            if(seq.per >= obj.per && seq.per < per2){
                seq.objectIndex = i;
                // fix for #0 still allows for using old methid for setting partFrame values if needed
                // while also allowing for addtional custom fix if needed by setting seq.pff to a function
                // see partFrameFunctions above for examples
                if(typeof seq.pff === 'function'){
                    seq.pff(seq, per2, obj);
                }else{
                    partFrameFunctions[seq.pff](seq, per2, obj);
                }
                // set partPer and partBias
                seq.partPer = getPer(seq.partFrame, seq.partFrameMax);
                seq.partBias = getBias(seq.partPer);
                seq.partSinBias = getSinBias(seq.partPer);
                break;
            }
            i += 1;
        }
        // V3 PATHS
        setV3Paths(seq);
        // call before hook
        seq.beforeObjects(seq);
        // call update for current object
        const obj = seq.objects[seq.objectIndex];
        if(obj){
            seq.obj = obj;
            obj.update(seq, seq.partPer, seq.partBias, seq.partSinBias, obj);
        }
        // call after objects hook
        seq.afterObjects(seq);
    };
    //-------- ----------
    // PUBLIC GET PER AND BIAS METHODS
    //-------- ----------
    api.getPer = function(a, b, count){
        a = a === undefined ? 0 : a;
        b = b === undefined ? 1 : b;
        count = count === undefined ? 1 : count;
        const per = a / b;
        return per * count % 1;
    };
    api.getBias = function(a, b, count){
        const per = api.getPer(a, b, count);
        return getBias(per);
    };
    api.getSinBias = function(a, b, count){
        const per = api.getPer(a, b, count);
        return getSinBias(per);
    };
}( this['seqHooks'] = {} ));
