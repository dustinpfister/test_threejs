
(function () {

    // ---------- ----------
    // SCENE CAMERA LIGHT, RENDERER, and CONTAINER
    // ---------- ----------
    var scene = new THREE.Scene();  // scene
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('cyan');
    var pl = new THREE.PointLight(0xffffff); // point light
    pl.position.set(2, 5, 3);
    scene.add(pl);
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);  // camera
    camera.position.set(-15, 15, -15);
    camera.add(pl);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer(); // render
    renderer.setSize(640, 480);
    var container = document.getElementById('demo');
    renderer.domElement.style.position = 'absolute';
    container.style.width = "940px";
    container.style.height = "480px";
    container.style.position='relative';
    container.appendChild(renderer.domElement);

    var div_sl = document.createElement('div');
    div_sl.id = 'source-layer-ui';
    container.appendChild(div_sl);

    // ---------- ----------
    // SOURCE LAYER UI
    // ---------- ----------

    var vm = new Vue({
        el:'#source-layer-ui',
        template: '<div style="background:#00afaf;position:relative;left:640px;width:280px;padding:10px;">'+
            '<h4>SOURCE LAYER 3D <span>{{ version }}</span> UI: </h4>' +
            '<span> zoom:  <input v-model="zoom" type="range" min="2" max="20" step="0.25"></span> {{ zoom }} <br> ' + 
            '<span> phi:   <input v-model="phi" type="range" min="0" max="360" step="1"></span> {{ phi }} <br>' + 
            '<span> theta: <input v-model="theta" type="range" min="0" max="360" step="1"></span> {{ theta }} <br>' + 
        '</div>',
        mounted: function () {
            this.setZoom();
            // creating dea objects
            this.$data.daeObjects = DAE.create({
                onItemProgress: function(per, n, d){},
                onFileLoad: function(result, allResults, daeObjects){},
                onLoad: function(daeObjects, results){
                    results.forEach(function(result, i){
                        var group = DAE.createGroup(daeObjects, result);
                        group.z = 0;
                        scene.add(group);
                    });
                    renderer.render(scene, camera);
                }
            });
            this.loadDEAFiles();
            console.log(div_sl.style.background);
        },
        updated: function () {
            this.setZoom();
        },
        data: {
            version: 'r0',
            zoom: 20,
            phi: 65,
            theta: 45,
            daeObjects: null
        },
        methods: {
            setZoom: function(){
                var dat = this.$data,
                phi = dat.phi / 360 * (Math.PI * 2),
                theta = dat.theta / 360 * (Math.PI * 2);
                camera.position.setFromSphericalCoords(dat.zoom, phi, theta);
                camera.lookAt(0,0,0);
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
