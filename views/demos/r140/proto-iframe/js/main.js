//-------- ----------
// HELPERS
//-------- ---------
const loadScript = (src, domElement ) => {
    let script = document.createElement('script');
    domElement.appendChild(script);
    return new Promise((resolve, reject) => {
        script.addEventListener('load', (e) => {
            resolve();
        });
        script.addEventListener('error', (e, b) => {
            reject();
        });
        script.src = src;
    });
};
//-------- ----------
// WINDOW
//-------- ---------
const container = (document.getElementById('demo') || document.body);
let iBody = null, iframe = null;
loadScript('/demos/r140/proto-iframe/js/app.js', container )
.then( () => {
    //-------- ----------
    // IFRAME
    //-------- ---------
    iframe = document.createElement('iframe');
    iframe.width = 640;
    iframe.height = 240;
    iframe.style.border = '0';
    container.appendChild( iframe );
    iBody = iframe.contentWindow.document.body;
    iBody.style.margin = '0px';
    iBody.style.padding = '0px';
    return loadScript('/js/threejs/0.127.0/three.min.js', iBody);
})
.then( () => {
    return loadScript('/demos/r140/proto-iframe/js/app.js', iBody);
});
