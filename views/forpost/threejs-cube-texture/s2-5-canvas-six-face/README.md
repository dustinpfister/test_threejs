# s2-5-canvas-six

There is now working out a system that involves having six differing images, or at least top, bottom, and side. The goal here is to further test what I have made thus far, find things that are wrong with it, and see if I can work out a better solution.


## Getting the alphas

One part of the process of remaping as i see it is to get alpha values for each pixle. these alpha values are then used with a max radius value and angle to the center to get the pixle location to remap to the current pixle location.

### First remap method

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