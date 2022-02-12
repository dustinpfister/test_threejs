(function () {

    // ---------- ----------
    // CANVAS
    // ---------- ----------
    var container = document.getElementById('demo'),
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.width = '640px';
    canvas.style.height = '480px';

    //ctx.fillRect(0,0, canvas.width, canvas.height);

    canvas.onselectstart = function () { return false; }
    container.appendChild(canvas);

    var div_dl = document.createElement('div');
    div_dl.id = 'draw-layer-ui';
    container.appendChild(div_dl);


    // ---------- ----------
    // DRAW LAYER UI
    // ---------- ----------
    var vm = new Vue({
        el:'#draw-layer-ui',
        template: '<div style="background:#4faf00;position:relative;left:640px;width:280px;padding:10px;">'+
            '<h4>DRAW UI: </h4>'+
            '<span> Color: <input v-model="color" type="color" ></span><br>' +
            '<span> Size:  <input v-model="size" type="range" min="0.5" max="20" step="0.25"></span> {{ size }} <br>' +
            '<span> Clear: <input type="button" value="Clear" v-on:click="clear" ></span><br>' +
        '</div>',
        mounted: function () {
            
        },
        updated: function () {
         
        },
        data: {
            color: '#000000',
            size: 1
        },
        methods: {
            clear: function(){
                ctx.clearRect(-1, -1, canvas.width + 2, canvas.height + 2);
            }
        }
    });
 
    // ---------- ----------
    // DRAW LAYER EVENTS
    // ---------- ----------
    var drawState = {
       down: false
    };
    canvas.addEventListener('pointerdown', (e) => {
        if(e.pointerType === 'mouse'){
            if(e.button === 0){
                drawState.down = true;
            }
        }else{
            drawState.down = true;
        }
    });
    canvas.addEventListener('pointerup', (e) => {
        drawState.down = false;
    });
    canvas.addEventListener('pointerout', (e) => {
        drawState.down = false;
    });
    canvas.addEventListener('pointermove', (e) => {
        e.preventDefault();
        if(drawState.down){
            var bx = canvas.getBoundingClientRect(),
            dat = vm.$data,
            x = e.clientX - bx.left,
            y = e.clientY - bx.top;
            ctx.fillStyle = dat.color;
            ctx.beginPath();
            ctx.arc(x, y, dat.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });

}
    ());
