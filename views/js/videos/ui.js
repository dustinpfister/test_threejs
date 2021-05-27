var videoUI = (function () {

    // the array of forFrame objects ( see the api.load method)
    var forFrame = [];

    // single whammy encoder
    var FPS = 30;
    var encoder = new Whammy.Video(FPS);

    // ui info div
    var uiInfo = document.getElementById('ui_info');

    // export video helper
    var exportVid = function (blob) {
        var vid = document.createElement('video');
        vid.src = URL.createObjectURL(blob);
        vid.loop = true;
        vid.controls = true;
        document.body.appendChild(vid);
    };

    // set the current frame
    var setFrame = function(ffObj, frame, maxFrame){
        ffObj.frame = frame;
        ffObj.maxFrame = maxFrame;
        ffObj.forFrame(frame, maxFrame);
        uiInfo.innerText = 'frame: ' + ffObj.frame + '/' + ffObj.maxFrame;
    };

    // public api
    var api = {};

    // load a for frame method
    api.load = function (opt) {
        opt = opt || {};
        // push object to for frame array
        var ffObj = {
            frame: opt.frame === undefined ? 0 : opt.frame,
            maxFrame: opt.maxFrame === undefined ? 50 : opt.maxFrame,
            forFrame: opt.forFrame || function () {},
            canvas: opt.canvas || null
        };
        // set the frame and call forframe
        setFrame(ffObj, ffObj.frame, ffObj.maxFrame);
        forFrame.push(ffObj);
    };


    // on frame+ button click
    var onFrameUp = function () {
        forFrame.forEach(function (obj) {
            obj.frame += 1;
            obj.frame %= obj.maxFrame;
            // set the frame and call forframe
            setFrame(obj, obj.frame, obj.maxFrame);
        });
    };

    // on frame+ button click
    var onFrameDown = function () {
        forFrame.forEach(function (obj) {
            obj.frame -= 1;
            obj.frame = obj.frame <= -1 ? obj.maxFrame - 1 : obj.frame;
            // set the frame and call forframe
            setFrame(obj, obj.frame, obj.maxFrame);
        });
    };

    // on create video
    var onCreateVideo = function () {
        console.log('create video');
        var frame = 0,
        maxFrame = forFrame[0].maxFrame;
        forFrame[0].play = false;
        while (frame < maxFrame) {
            forFrame.forEach(function (ffObj) {
                ffObj.frame = frame;
                setFrame(ffObj, ffObj.frame, ffObj.maxFrame);
                // set the frame and call forframe
                console.log(ffObj.frame + '/' + ffObj.maxFrame);
                encoder.add(ffObj.canvas.toDataURL('image/webp'));
            });
            frame += 1;
        }
        console.log('encoder frames added');
        encoder.compile(false, function (output) {
            console.log('compile');
            exportVid(output);
        });
    };

    var onPlay = function () {
        var ffObj = forFrame[0];
        console.log('play');
        if (ffObj) {
            ffObj.play = !ffObj.play;
        }
    };

    // loop
    var lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        ffObj = forFrame[0];
        requestAnimationFrame(loop);
        if(secs > 1 / FPS){
            if(ffObj){
                if(ffObj.play){
                    ffObj.frame += 1;
                    ffObj.frame %= ffObj.maxFrame;
                    // set the frame and call forframe
                    setFrame(ffObj, ffObj.frame, ffObj.maxFrame);
                }
            }
            lt = now;
        }
    };
    loop();

    document.getElementById('ui_frame_+').addEventListener('click', onFrameUp);
    document.getElementById('ui_frame_-').addEventListener('click', onFrameDown);
    document.getElementById('ui_play').addEventListener('click', onPlay);
    document.getElementById('ui_create_video').addEventListener('click', onCreateVideo);

    return api;

}
    ());
