import * as THREE from 'three';

class MultifocalEllipseCurve extends THREE.Curve {
    constructor(  ) {
        super();
        this.isMultifocalEllipseCurve = true;
        this.type = 'QMultifocalEllipseCurve';
    }

    getPoint( t, optionalTarget = new Vector2() ) {

    }
}

export { MultifocalEllipseCurve };