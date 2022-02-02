
(function () {

    var container = document.getElementById('demo');
    var canvas = document.createElement('canvas'),
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
            '<span> Color: <input v-model="color" type="color" ></span>' + 
        '</div>',
        mounted: function () {
            
        },
        updated: function () {
         
        },
        data: {
            color: '#000000'
        },
        methods: {
            draw: function(){
            }
        }
    });

}
    ());
