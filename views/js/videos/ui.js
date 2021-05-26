var videoUI = (function(){

    // the array of forFrame objects ( see the api.load method)
    var forFrame = [];

    // single whammy encoder
    var FPS = 30;
    var encoder = new Whammy.Video(FPS);

    // encoder.add(obj.canvas.toDataURL('image/webp'));


    var api = {};

    // load a for frame method
    api.load = function(opt){
        opt = opt || {};
        // push object to for frame array
        var ffObj = {
            frame: opt.frame === undefined ? 0 : opt.frame,
            maxFrame: opt.maxFrame === undefined ? 50 : opt.maxFrame,
            forFrame: opt.forFrame || function(){},
            canvas: opt.canvas || null
        };
        ffObj.forFrame(opt.frame, opt.maxFrame);
        forFrame.push(ffObj);
    };

    // on frame+ button click
    var onFrameUp = function () {
        forFrame.forEach(function(obj){
              obj.frame += 1;
              obj.frame %= obj.maxFrame;
              obj.forFrame(obj.frame, obj.maxFrame);
        });
    };

    document.getElementById('ui_frame_+').addEventListener('click', onFrameUp);

    return api;

}());