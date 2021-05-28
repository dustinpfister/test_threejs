var videoUI = (function () {

    // the single main LoadedVideo Object loaded with the videoUI.load method
    var LoadedVideo = [];

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
        LoadedVideo.frame = frame;
        LoadedVideo.maxFrame = maxFrame;
        LoadedVideo.forFrame(frame, maxFrame);
        uiInfo.innerText = 'frame: ' + LoadedVideo.frame + '/' + LoadedVideo.maxFrame;
    };

    // public api
    var api = {};

    // load a for frame method
    api.load = function (opt) {
        opt = opt || {};
        // push object to for frame array
        LoadedVideo = {
            frame: opt.frame === undefined ? 0 : opt.frame,
            maxFrame: opt.maxFrame === undefined ? 50 : opt.maxFrame,
            forFrame: opt.forFrame || function () {},
            canvas: opt.canvas || null
        };
        // set the frame and call forframe
        setFrame(LoadedVideo.frame, LoadedVideo.maxFrame);
    };


    // on frame+ button click
    var onFrameUp = function () {
        //forFrame.forEach(function (obj) {
           LoadedVideo.frame += 1;
            LoadedVideo.frame %= LoadedVideo.maxFrame;
            // set the frame and call forframe
            setFrame(LoadedVideo.frame, LoadedVideo.maxFrame);
        //});
    };

    // on frame+ button click
    var onFrameDown = function () {
        //forFrame.forEach(function (obj) {
            LoadedVideo.frame -= 1;
            LoadedVideo.frame = LoadedVideo.frame <= -1 ? LoadedVideo.maxFrame - 1 : LoadedVideo.frame;
            // set the frame and call forframe
            setFrame(LoadedVideo.frame, LoadedVideo.maxFrame);
        //});
    };

    // on create video
    var onCreateVideo = function () {
        console.log('create video');
        var frame = 0,
        maxFrame = LoadedVideo.maxFrame;
        LoadedVideo.play = false;
        while (frame < maxFrame) {
            //forFrame.forEach(function (ffObj) {
                LoadedVideo.frame = frame;
                setFrame(LoadedVideo.frame, LoadedVideo.maxFrame);
                // set the frame and call forframe
                console.log(LoadedVideo.frame + '/' + LoadedVideo.maxFrame);
                encoder.add(LoadedVideo.canvas.toDataURL('image/webp'));
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
        if (LoadedVideo) {
            LoadedVideo.play = !LoadedVideo.play;
        }
    };

    // loop
    var lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS){
            if(LoadedVideo){
                if(LoadedVideo.play){
                    LoadedVideo.frame += 1;
                    LoadedVideo.frame %= LoadedVideo.maxFrame;
                    // set the frame and call forframe
                    setFrame(LoadedVideo.frame, LoadedVideo.maxFrame);
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
