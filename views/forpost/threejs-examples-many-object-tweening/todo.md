﻿# threejs-examples-many-object-tweening todo list

## () r1-1-timeline
* () work out an exmaple that involves a timeline array to define what the states array should be when calling tween

## () r1 - normales and uvs
* (done) fix loader to make it resolve when all loading is done
* () see about updating uv attrbute as well
* () see about updaing normal attribute as well


<!-- DONE -->

# ( done 09/13/2023 ) - r146 style update for demos
* (done) use r146 for r0 demos
* (done) style update, but for demos only

## ( done 08/26/2022 ) r0-2-many-box
* (done) demo the involves trasitions between box1, 2, and 3

## ( done 08/26/2022 ) r0 of tween-many.js and r0-1-basic demo
* (done) start r0-tween-many.js
* (done) start the first basic demo
* (done) have a built in DAE loader for tween-many.js
* (done) make it so that the dae loader will also process and return a sourceObjects collection
* (done) tweenMany.load will process all child objects of scene that are mesh objects with a vaild name string
* (done) tweenMany.load will reject if an error happens while loading
* (done) tweenMany.createMesh function
* (done) tweenMany.createSourceObj method so I can just pass a result object when making a video
* (done) tweenMany.load uses tweenMany.createSourceObj
* (done) the basic demo can just be a simple transtion between box1 and box2
