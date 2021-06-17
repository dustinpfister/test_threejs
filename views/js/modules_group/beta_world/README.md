# beta_world.js

The idea here is to create a module that will create and return a sphere that will act as a kind of word in which I will place other objects on top of. This module will then be a core module that will be used in all of my 'beta_world' series of videos.

## BetaWorld.create

The BetaWorld.create method is what can be called in a video javaScript file to create an instance of the beta world.
```js
    var world = BetaWorld.create();
    world.userData.worldSphere.material = MATERIAL_WORLD;
    scene.add(world);
```

## BetaWorld.positionObject

This is the method that I will want to use when it comes to position an object relative to the surface of the beta word.

```js
    var camera = new THREE.PerspectiveCamera(40, 8 / 6, 0.05, 150);
    scene.add(camera);
    BetaWorld.positionObject(world, camera, 0.15, 0.5, 7.5);
    camera.lookAt(world.position);
```

## BetaWorld.createObjectWrapper

This is the method to call in order to create and return an object wrapper for a mesh or group. The idea here is that this is a standard group to use when it comes to positing something relative to the surface of the beta world. I can use methods like the look at method on this wrapper group to set a standard facing direction that will typically always be pointing down to the center of the beta world. The rotation values of the contents inside the wrapper can then be adjusted relative to this group.

```js
    var guy1 = GuyMod.create();
    guy1.group.scale.set(0.5, 0.5, 0.5);
    guy1.group.lookAt(0, 1.55, 0);
    guy1.group.rotateY(Math.PI * 0.5);
    var guy1_wrap = BetaWorld.createObjectWrapper(world, guy1.group);
    BetaWorld.positionObject(world, guy1_wrap, 0.05, 0.02, 1.55);
    guy1_wrap.lookAt(world.position);
    scene.add(guy1_wrap);
```