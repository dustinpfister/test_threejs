# threejs-torus todo list

## () - update group-camera-holes

* () use apply euler to set camera posiiton
```js
                    let sv = new THREE.Vector3(0,0,1);
                    let e1 = new THREE.Euler();
                    e1.y = Math.PI * 2 * partPer;
                    let e2 = new THREE.Euler();
                    e2.y = Math.PI * 2 * partPer - Math.PI / 180 * 5;
                    camera.position.copy(sv).applyEuler(e1).normalize().multiplyScalar(MAIN_RADIUS);
                    camera.lookAt( sv.clone().applyEuler(e2).normalize().multiplyScalar(MAIN_RADIUS) );
```

## () sx-normals-attribute
* () example in which I am mutating the normals

## () sx-position-attribute
* () have an example in which I am mutating the position attribute

## () s2-3-group-grid
* () have a 2d grid group exmaple where for each value of x and y there is a coresponding value for radial and tube segmnets 

## () sx-x-textures
* () start a collection of exmaples on textures

## () sx-x-materials
* () start a collection of exmaples on materials starting with one on the basic material
* () I will want one on array of materials
* () normal matreial example

## ( done 09/19/2022 ) s2-2-points-mesh-for-every
* (done) example where I make a mesh object using sphere geometry for every point in a toruse geometry

## ( done 09/19/2022 ) s3-points
* (done) have a points example

## ( done 09/19/2022 ) s1-2-geo-copy
* (done) start a basic loop exmaple in which I update a torus geometry with an additonal torus geomertry

## ( done 09/19/2022 ) - For post folder started with demo exmaples
* (done) For post folder started with examples from r127 demo folder
