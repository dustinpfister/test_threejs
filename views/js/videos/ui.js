var videoUI = (function(){

    var forFrame = [];

    var api = {};

    // load a for frame method
    api.load = function(opt){
        opt = opt || {};
        // push object to for frame array
        var ffObj = {
            frame: opt.frame === undefined ? 0 : opt.frame,
            maxFrame: opt.maxFrame === undefined ? 50 : opt.maxFrame,
            forFrame: opt.forFrame || function(){}
        };
        ffObj.forFrame(opt.frame, opt.maxFrame);
        forFrame.push(ffObj);
    };

    // on frame+ button click
    var onFrameUp = function () {
        console.log('frame+');
        console.log(forFrame);
        forFrame.forEach(function(obj){
              obj.frame += 1;
              obj.frame %= obj.maxFrame;
              obj.forFrame(obj.frame, obj.maxFrame);
        });
    };

    document.getElementById('ui_frame_+').addEventListener('click', onFrameUp);

    return api;

}());