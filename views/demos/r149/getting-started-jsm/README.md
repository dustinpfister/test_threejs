# getting-started demo for r149

The examples/js folder is now gone, so I need to start using JSM Modules for addons. Also it looks like three.min.js is on the chopping block as well so I will need to start using three.module.js and import maps. 

```html
<h1>Getting started with r150 </h1>

<div id="demo"></div>

<script type="importmap">
    {
        "imports": {
            "three": "/js/threejs/0.146.0/three.module.js",
            "OrbitControls": "/js/threejs/0.146.0/jsm/controls/OrbitControls.js"
        }
    }
</script>

<script type="module" src="/demos/r150/getting-started/main.js"></script>
```