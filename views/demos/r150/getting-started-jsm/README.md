# Getting-started demo for r150

The examples/js folder is now gone, so I need to start using JSM Modules for addons. Also it looks like three.min.js is on the chopping block as well so I will need to start using three.module.js and import maps. Also with r150 it looks like breaking changes where made to the common-glsl.js that results in threejs not workng on my raspberry pi 4. However I was able to make my own custom build of threejs r150 by just using the state of the file one commit back from the breaking point.

```html
<h1>Getting started with r150 </h1>

<div id="demo"></div>

<script type="importmap">
    {
        "imports": {
            "three": "/js/threejs/0.150.0/three.module.r150-old-common-glsl.js",
            "OrbitControls": "/js/threejs/0.150.0/jsm/controls/OrbitControls.js"
        }
    }
</script>

<script type="module" src="/demos/r150/getting-started/main.js"></script>
```