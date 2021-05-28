var videoUI = (function () {

    // the single main For Frame Object loaded with the videoUI.load method
    var ForFrameObj = [];

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
    var setFrame = function(frame, maxFrame){
        ForFrameObj.frame = frame;
        ForFrameObj.maxFrame = maxFrame;
        ForFrameObj.forFrame(frame, maxFrame);
        uiInfo.innerText = 'frame: ' + ForFrameObj.frame + '/' + ForFrameObj.maxFrame;
    };

    // public api
    var api = {};

    // load a for frame method
    api.load = function (opt) {
        opt = opt || {};
        // push object to for frame array
        ForFrameObj = {
            frame: opt.frame === undefined ? 0 : opt.frame,
            maxFrame: opt.maxFrame === undefined ? 50 : opt.maxFrame,
            forFrame: opt.forFrame || function () {},
            canvas: opt.canvas || null
        };
        // set the frame and call forframe
        setFrame(ForFrameObj.frame, ForFrameObj.maxFrame);
    };


    // on frame+ button click
    var onFrameUp = function () {
        //forFrame.forEach(function (obj) {
           ForFrameObj.frame += 1;
            ForFrameObj.frame %= ForFrameObj.maxFrame;
            // set the frame and call forframe
            setFrame(ForFrameObj.frame, ForFrameObj.maxFrame);
        //});
    };

    // on frame+ button click
    var onFrameDown = function () {
        //forFrame.forEach(function (obj) {
            ForFrameObj.frame -= 1;
            ForFrameObj.frame = ForFrameObj.frame <= -1 ? ForFrameObj.maxFrame - 1 : ForFrameObj.frame;
            // set the frame and call forframe
            setFrame(ForFrameObj.frame, ForFrameObj.maxFrame);
        //});
    };

    // on create video
    var onCreateVideo = function () {
        console.log('create video');
        var frame = 0,
        maxFrame = ForFrameObj.maxFrame;
        ForFrameObj.play = false;
        while (frame < maxFrame) {
            //forFrame.forEach(function (ffObj) {
                ForFrameObj.frame = frame;
                setFrame(ForFrameObj.frame, ForFrameObj.maxFrame);
                // set the frame and call forframe
                console.log(ForFrameObj.frame + '/' + ForFrameObj.maxFrame);
                encoder.add(ForFrameObj.canvas.toDataURL('image/webp'));
            //});
            frame += 1;
        }
        console.log('encoder frames added');
        encoder.compile(false, function (output) {
            console.log('compile');
            exportVid(output);
        });
    };

    var onPlay = function () {
        //var ffObj = forFrame[0];
        console.log('play');
        if (ForFrameObj) {
            ForFrameObj.play = !ForFrameObj.play;
        }
    };

    // loop
    var lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS){
            if(ForFrameObj){
                if(ForFrameObj.play){
                    ForFrameObj.frame += 1;
                    ForFrameObj.frame %= ForFrameObj.maxFrame;
                    // set the frame and call forframe
                    setFrame(ForFrameObj.frame, ForFrameObj.maxFrame);
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
