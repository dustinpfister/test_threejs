
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
            '<h5>Model</h5>' +
            '<span> <input type="button" value="clear" v-on:click="clear"> </span><br> ' + 
            '<span> <input type="file" v-on:change="loadFile"> </span><br> ' + 
            '<h5>Zoom and Rotate</h5>' +
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
        },
        updated: function () {
            this.setZoom();
        },
        data: {
            version: 'r1',
            zoom: 20,
            phi: 65,
            theta: 45,
            daeObjects: null
        },
        methods: {
            // set zoom and rotation
            setZoom: function(){
                var dat = this.$data,
                phi = dat.phi / 360 * (Math.PI * 2),
                theta = dat.theta / 360 * (Math.PI * 2);
                camera.position.setFromSphericalCoords(dat.zoom, phi, theta);
                camera.lookAt(0,0,0);
                renderer.render(scene, camera);
            },
            // clear the source layer
            clear: function(){
                console.log('clear');
                this.$data.daeObjects = DAE.create({});
                scene.children.forEach(function(obj3d){
                    console.log(obj3d.type)
                    if(obj3d.type === 'Group'){
                        scene.remove(obj3d);
                    }
                })
                renderer.render(scene, camera);
            },
			// load a single file by file input element
            loadFile: function(e){
				e.target.files[0].text()
				.then(function(text){
					
					
				console.log(text);
				//var obj = THREE.ColladaLoader.parse(text)
					
					        var manager = new THREE.LoadingManager();
        // the collada loader instance
        var loader = new THREE.ColladaLoader(manager);
		
		//console.log(e.target.files[0])
		var path = '/dae/rpi4/';
		var obj = loader.parse(text, path)
		
		console.log(obj)
					
					
				})
			},
            // load dea files
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
