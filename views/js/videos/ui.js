console.log('I am the video ui');

var videoUI = {};

videoUI.onFrameUp

var onFrameUp = function () {
    console.log('frame+');
};

document.getElementById('ui_frame_+').addEventListener('click', onFrameUp);
