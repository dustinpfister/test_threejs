# threejs-cube-texture

This is what I have together in terms of source code examples when it comes to using the Cube texture constructor in threejs. Like my many other examples in the for post folder of this repository there is a [blog post that I have wrote on the source code that can be found here](https://dustinpfister.github.io/2018/04/22/threejs-cube-texture/).

There are two general ways of adding cube textures, loading textures that have been made before hand, and generating textures with javaScript code. I have two general sets of examples that cover both of these ways of adding cube textures.


## Getting the alphas

One part of the process of remaping as i see it is to get alpha values for each pixle. these alpha values are then used with a max radius value and angle to the center to get the pixle location to remap to the current pixle location.

### First remap method

This is some code that shows the general idea with these alpha values for the first distort function that I made. Simply put the max distore happens for pixles that are at the very corners of the image.

```js
// This is how I am getting the alphas for re-mapping
// with the first distort function
let x = 0, y = 0, size = 8;
let row = [];
let grid = [];
let halfV = new THREE.Vector2(size / 2 - 0.5, size / 2 - 0.5);
let mDist = halfV.distanceTo( new THREE.Vector2(0, 0) );
while(y < size){
    x = 0;
    row = [];
    while(x < size){
        let v = new THREE.Vector2(x, y),
        d = v.distanceTo(halfV),
        alpha = d / mDist;
        row.push(alpha.toFixed(2));
        x += 1;
    }
    grid.push(row)
    y += 1;
}
console.log(grid);
//0: (8) ["1.00", "0.87", "0.77", "0.71", "0.71", "0.77", "0.87", "1.00"]
//1: (8) ["0.87", "0.71", "0.59", "0.52", "0.52", "0.59", "0.71", "0.87"]
//2: (8) ["0.77", "0.59", "0.43", "0.32", "0.32", "0.43", "0.59", "0.77"]
//3: (8) ["0.71", "0.52", "0.32", "0.14", "0.14", "0.32", "0.52", "0.71"]
//4: (8) ["0.71", "0.52", "0.32", "0.14", "0.14", "0.32", "0.52", "0.71"]
//5: (8) ["0.77", "0.59", "0.43", "0.32", "0.32", "0.43", "0.59", "0.77"]
//6: (8) ["0.87", "0.71", "0.59", "0.52", "0.52", "0.59", "0.71", "0.87"]
//7: (8) ["1.00", "0.87", "0.77", "0.71", "0.71", "0.77", "0.87", "1.00"]
```

