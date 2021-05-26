var videoUI = (function(){

    // the array of forFrame objects ( see the api.load method)
    var forFrame = [];

    // single whammy encoder
    var FPS = 30;
    var encoder = new Whammy.Video(FPS);

    // encoder.add(obj.canvas.toDataURL('image/webp'));

    // else compile, and export
    //encoder.compile(false, function (output) {
    //    exportVid(output);
    //});

    // export video helper
    var exportVid = function (blob) {
        var vid = document.createElement('video');
        vid.src = URL.createObjectURL(blob);
        vid.loop = true;
        vid.controls = true;
        document.body.appendChild(vid);
    };


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

    // on frame+ button click
    var onFrameDown = function () {
        forFrame.forEach(function(obj){
              obj.frame -= 1;
              obj.frame = obj.frame <= -1 ? obj.maxFrame - 1 : obj.frame;
              obj.forFrame(obj.frame, obj.maxFrame);
        });
    };

    // on create video
    var onCreateVideo = function(){
        console.log('create video');
        var frame = 0,
        maxFrame = forFrame[0].maxFrame;
        while(frame < maxFrame){
            forFrame.forEach(function(ffObj){
                ffObj.frame = frame;
                ffObj.forFrame(ffObj.frame, ffObj.maxFrame);
                encoder.add(ffObj.canvas.toDataURL('image/webp'));
            });
            frame += 1;
        }
        console.log('okay');
        encoder.compile(false, function (output) {
        console.log('yeah');
            exportVid(output);
        });
    };

    document.getElementById('ui_frame_+').addEventListener('click', onFrameUp);
    document.getElementById('ui_frame_-').addEventListener('click', onFrameDown);

    document.getElementById('ui_create_video').addEventListener('click', onCreateVideo);

    return api;

}());