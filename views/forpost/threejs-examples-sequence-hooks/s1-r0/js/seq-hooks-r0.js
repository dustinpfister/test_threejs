// seq-hooks-r0.js
// seqeunce hooks librrary from threejs-examples-sequence-hooks
var seqHooks = (function () {

    var api = {};

    // HELPERS
    var getPer = function(a, b){
        return a / b;
    };
    var getBias = function(per){
        return 1 - Math.abs( 0.5 - per ) / 0.5;
    };

    // update the given seq object by way of a frame, and maxFrame value
    api.setFrame = function(seq, frame, frameMax){
        seq.frame = frame === undefined ? 0 : frame;
        seq.frameMax = frameMax === undefined ? 100 : frameMax;
        // set main per and bias values
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
        // call before hook
        seq.beforeObjects(seq);
        // call update for current object
        var obj = seq.objects[seq.objectIndex];
        obj.update(seq, seq.partPer, seq.partBias);
        // call after objects hook
        seq.afterObjects(seq);
    };

/*
var array = [3,2,2,5,2,3,3,10];
var secsTotal = array.reduce(function(acc, secs){ return acc + secs }, 0);
var perValues = [];
var i = 0, len = array.length;
while(i < len){
    var per = perValues[i - 1];
    if( per === undefined ){
        perValues.push(0);
    }else{
        var perDelta = array[i - 1] / secsTotal;
        perValues.push( parseFloat( ( per + perDelta ).toFixed(4) ) );         
    }
    i += 1;
}
console.log(perValues);
[0, 0.1, 0.1667, 0.2334, 0.4001, 0.4668, 0.5668, 0.6668]
*/

    // set per values for each seq object by way of a secs propery for each object
    api.setPerValues = function(seq){

        seq.secsTotal = seq.objects.reduce(function(acc, obj){ return acc + (obj.secs || 0) }, 0);

console.log(seq.secsTotal);

    };

    return api;

}
    ());