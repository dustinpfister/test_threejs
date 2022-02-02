
(function () {

    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');

    // point light
    var pl = new THREE.PointLight(0xffffff);
    pl.position.set(2, 5, 3);
    scene.add(pl);

    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-15, 15, -15);
    camera.add(pl);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    var container = document.getElementById('demo');

    renderer.domElement.style.position = 'absolute';


    container.style.width = "320px";
    container.style.height = "240px";
    container.appendChild(renderer.domElement);

    // source later UI
    var vm = new Vue({
        el:'#source-layer-ui',
        template: '<div>'+
            '<h4>SOURCE LAYER UI: </h4>'+
            '<span> zoom: <input v-model="zoom" type="range" min="2" max="20" step="0.25"></span>' + 
        '</div>',
        mounted: function () {
            this.setZoom();
            // cretaing dea objects
            this.$data.daeObjects = DAE.create({
                onItemProgress: function(per, n, d){},
                onFileLoad: function(result, allResults, daeObjects){},
                onLoad: function(daeObjects, results){
                    results.forEach(function(result, i){
                        var group = DAE.createGroup(daeObjects, result);
                        //group.position.z = 3 - 6 * i;
                        group.z = 0;
                        scene.add(group);
                    });
                    renderer.render(scene, camera);
                }
            });
            this.loadDEAFiles();
        },
        updated: function () {
            this.setZoom();
        },
        data: {
            zoom: 20,
            r1: Math.PI / 180 * 120,
            r2: Math.PI / 180 * 45,
            daeObjects: null
        },
        methods: {
            setZoom: function(){
                //var dat = this.$data,
                //x = dat.zoom * -1,
                //y = dat.zoom,
               // z = dat.zoom * -1;
                //camera.position.set(x, y, z);

var dat = this.$data;
camera.position.setFromSphericalCoords(dat.zoom, dat.r1, dat.r2);
camera.lookAt(0,0,0)

                renderer.render(scene, camera);
            },
            loadDEAFiles: function(){
                DAE.loadAll(this.$data.daeObjects, {
                    baseUrl: '/dae',
                    relUrls: [
                        //'rpi4/rpi4_start_box.dae',
                       'obj/obj.dae'
                    ]
                });
            }
        }
    });


}
    ());
