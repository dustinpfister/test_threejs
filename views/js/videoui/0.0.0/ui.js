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

    // set the current sequence, and set the proper frame index for the current sequence
    var setCurrentSequence = function(){
        var i = 0,
        frameTotal = 0,
        sequence,
        len = LoadedVideo.sequence.length;
        while(i < len){
           sequence = LoadedVideo.sequence[i];
           if(LoadedVideo.frame < frameTotal + sequence.maxFrame){
               LoadedVideo.currentSequence = i;
               sequence.frame = LoadedVideo.frame - frameTotal;
               sequence.per = sequence.frame / sequence.maxFrame;
               // secs
               sequence.secsTotal = sequence.maxFrame / FPS;
               sequence.secs = sequence.secsTotal * sequence.per;
               break;
           }
           frameTotal += sequence.maxFrame;
           i += 1;
        }
    };

    // set the current frame
    var setFrame = function(frame){
        LoadedVideo.frame = frame;
        // current sequence     
        setCurrentSequence();
        var sequence = LoadedVideo.sequence[LoadedVideo.currentSequence];
        // call for frame
        sequence.forFrame(sequence);
        // update info
        uiInfo.innerText = 'sequence: ' + LoadedVideo.currentSequence + '/' + LoadedVideo.sequence.length + 
            ', frame: ' + sequence.frame + '/' + sequence.maxFrame + 
            ', totalFrames: ' + LoadedVideo.frame + '/' + LoadedVideo.maxFrame;
    };

    // public api
    var api = {};

    // load a for frame method
    api.load = function (opt) {
        opt = opt || {};
        // push object to for frame array
        LoadedVideo = {
            sequence: opt.sequence || [],
            currentSequence: 0,
            frame: opt.frame === undefined ? 0 : opt.frame,
            maxFrame: 0,
            canvas: opt.canvas || null
        };
        // loop all sequences
        LoadedVideo.sequence.forEach(function(seqObj){
           LoadedVideo.maxFrame += seqObj.maxFrame;
           seqObj.frame = 0;
        });
        // set the frame and call forframe
        setFrame(LoadedVideo.frame);
    };


    // on frame+ button click
    var onFrameUp = function () {
        LoadedVideo.frame += 1;
        LoadedVideo.frame %= LoadedVideo.maxFrame;
        // set the frame and call forframe
        setFrame(LoadedVideo.frame);
    };

    // on frame+ button click
    var onFrameDown = function () {
        LoadedVideo.frame -= 1;
        LoadedVideo.frame = LoadedVideo.frame <= -1 ? LoadedVideo.maxFrame - 1 : LoadedVideo.frame;
        // set the frame and call forframe
        setFrame(LoadedVideo.frame);
    };

    // on create video
    var onCreateVideo = function () {
        console.log('create video');
        var frame = 0,
        maxFrame = LoadedVideo.maxFrame;
        LoadedVideo.play = false;
        while (frame < maxFrame) {
                LoadedVideo.frame = frame;
                setFrame(LoadedVideo.frame);
                // set the frame and call forframe
                console.log(LoadedVideo.frame + '/' + LoadedVideo.maxFrame);
                encoder.add(LoadedVideo.canvas.toDataURL('image/webp'));
            frame += 1;
        }
        console.log('encoder frames added');
        encoder.compile(false, function (output) {
            console.log('compile');
            exportVid(output);
        });
    };

    var onPlay = function () {
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
                    setFrame(LoadedVideo.frame);
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
