//-------- ----------
// WINDOW
//-------- ---------
let script = document.createElement('script');
document.body.appendChild(script);
script.src = '/demos/r140/proto-iframe/js/app.js';
// on load
script.addEventListener('load', ()=>{  
    //-------- ----------
    // IFRAME
    //-------- ----------
    const iframe = document.createElement('iframe');
    iframe.width = 640;
    iframe.height = 240;
    (document.getElementById('demo') || document.body).appendChild(iframe);

    let script = document.createElement('script');
    script.src = '/js/threejs/0.127.0/three.min.js';
    iframe.contentWindow.document.body.appendChild(script);

    script.addEventListener('load', ()=>{  

    let script = document.createElement('script');
    script.src = '/demos/r140/proto-iframe/js/app.js';
    iframe.contentWindow.document.body.appendChild(script);

});

/*
    var p = document.createElement('p');
    p.innerText = 'hello';
    iframe.contentWindow.document.body.appendChild(p)
    console.log()
*/
});
