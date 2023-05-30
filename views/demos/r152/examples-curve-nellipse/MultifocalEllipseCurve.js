import * as THREE from 'three';

class MultifocalEllipseCurve extends THREE.Curve {

    constructor( foci = [ new THREE.Vector2(-1, 1), new THREE.Vector2(1,-1), new THREE.Vector2(0.25, 0.75) ], radius = 0.75 ) {
        super();
        this.isMultifocalEllipseCurve = true;
        this.foci = foci;
        this.radius = radius
        this.type = 'QMultifocalEllipseCurve';
    }

    getPoint( t, optionalTarget ) {
         const point = optionalTarget || new THREE.Vector2();
         // there is trying something where I just start out with a circle
         const radian = Math.PI * 2 * t;
         let x = Math.cos(radian) * this.radius;
         let y = Math.sin(radian) * this.radius;
         // I then just need to find some way to adjust from there based on the foci
         let i = 0;
         const len = this.foci.length;
         let d = 0;
         while(i < len){
             const u = this.foci[i].x;
             const v = this.foci[i].y;
             d += Math.sqrt( Math.pow( x - u, 2) + Math.pow( y - v, 2)  );
             i += 1;
         }
         return point.set(x, y).multiplyScalar(d);
    }
}

export { MultifocalEllipseCurve };