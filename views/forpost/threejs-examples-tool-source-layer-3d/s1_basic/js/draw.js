
(function () {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d')

 
    // source later UI
    var vm = new Vue({
        el:'#draw-layer-ui',
        template: '<div>'+
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
