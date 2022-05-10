var seqHooks = (function () {

    var api = {};

    // HELPERS
    var getPer = function(a, b){
        return a / b;
    };
    var getBias = function(per){
        return 1 - Math.abs( 0.5 - per ) / 0.5;
    };

    // set frame method
    api.setFrame = function(seq, frame){
        seq.frame = frame;
        seq.per = getPer(seq.frame, seq.frameMax);
        seq.bias = getBias(seq.per);
        // update object index
        seq.objectIndex = 0;
        var i = 0, len = seq.objects.length;
        while(i < len){
            var obj = seq.objects[i];
            var per2 = 1;
            if(seq.objects[i + 1] != undefined){
                per2 = seq.objects[i + 1].per;
            }
            // if this is the current object update object 
            // index as well as other relavent values
            if(seq.per >= obj.per && seq.per < per2){
                seq.objectIndex = i;
                seq.partFrameMax = Math.floor( (per2 - obj.per) * seq.frameMax );
                seq.partFrame = seq.frame - Math.floor(seq.frameMax * obj.per);
                seq.partPer = getPer(seq.partFrame, seq.partFrameMax);
                seq.partBias = getBias(seq.partPer);
                break;
            }
            i += 1;
        }
        // call update for current object
        var obj = seq.objects[seq.objectIndex];
        obj.update(seq, seq.partPer, seq.partBias);
    };

    return api;

}
    ());