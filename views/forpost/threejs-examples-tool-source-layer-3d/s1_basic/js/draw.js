
(function () {

    // create and append canvae element
    var container = document.getElementById('demo'),
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 320;
    canvas.height = 240;
    canvas.style.position = 'absolute';
    canvas.style.width = '320px';
    canvas.style.height = '240px';
    ctx.fillStyle = 'rgba(0,0,0, 0.5)'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    container.appendChild(canvas);
 
    // source later UI
    var vm = new Vue({
        el:'#draw-layer-ui',
        template: '<div>'+
            '<h4>DRAW UI: </h4>'+
            ' Color: <span> Color: <input v-model="color" type="color" ></span><br>' +
            ' Size: <span> Size: <input v-model="size" type="range" min="0.5" max="20" step="0.25"></span> {{ size }} <br>' +
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
            draw: function(){
            }
        }
    });

    // draw later events
    var drawState = {
       down: false
    };
    canvas.addEventListener('pointerdown', (e) => {
        drawState.down = true;
    });
    canvas.addEventListener('pointerup', (e) => {
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
