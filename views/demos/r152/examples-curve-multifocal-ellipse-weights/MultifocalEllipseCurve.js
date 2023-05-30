import * as THREE from 'three';

const FOCI_DEFAULT = [
    new THREE.Vector2( 0,  1), 
    new THREE.Vector2(-0.2,  0), 
    new THREE.Vector2( 1.2,  0)
];

class MultifocalEllipseCurve extends THREE.Curve {

    constructor( foci = FOCI_DEFAULT ) {
        super();
        this.isMultifocalEllipseCurve = true;
        this.foci = foci;
        this.type = 'QMultifocalEllipseCurve';
    }

    getPoint( t, optionalTarget ) {
         const point = optionalTarget || new THREE.Vector2();
         // there is trying something where I just start out with a circle
         const radian = Math.PI * 2 * t;
         // start with a circle
         const v_circle = new THREE.Vector2();
         v_circle.x = Math.cos(radian);
         v_circle.y = Math.sin(radian);
         // then figure a vector unit length delta based on each foci
         let unit_length_delta = 0;
         let i = 0;
         const len = this.foci.length;
         let d = 0;
         while(i < len){
             const v_foci = this.foci[i];
             const d = v_foci.distanceTo( v_circle );
             unit_length_delta += d / len;
             i += 1;
         }
         return point.set(v_circle.x, v_circle.y).multiplyScalar(unit_length_delta);
    }

}

export { MultifocalEllipseCurve };