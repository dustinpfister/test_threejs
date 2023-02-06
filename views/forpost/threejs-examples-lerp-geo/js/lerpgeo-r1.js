// lerpgeo.js - r1 - from threejs-examples-lerp-geo
(function (global) {
    //-------- ----------
    // THE OLD R0 LERP GEO FUNCTION as the global API object ( for now )
    //-------- ----------
    const api = global['lerpGeo'] = function(geo, geoA, geoB, alpha){
        alpha = alpha || 0;
        // get refs to position attributes
        const pos = geo.getAttribute('position');
        const posA = geoA.getAttribute('position');
        const posB = geoB.getAttribute('position');
        // loop over pos and lerp between posA and posB
        let i = 0; 
        const len = pos.array.length;
        while(i < len){
            const v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
            const v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
            v.lerp(v2, alpha);
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;
            i += 3;
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();
    };
    //-------- ----------
    // THE NEW R1+ CREATE FUNCTION
    //-------- ----------
    // sort by count helper
    const sortByCount = (sourceGeos) => {
        return sourceGeos.map((geo) => { return geo; }).sort( (a, b) => {
            const aPos = a.getAttribute('position'),
            bPos = b.getAttribute('position');
            if(!aPos || !bPos){
                return 1;
            }
            if(aPos.count > bPos.count){
                return -1;
            }
            if(aPos.count < bPos.count){
                return 1;
            }
            return 0;
        });
    };
    // new buffer attribute for the given geo, based on a given source geo
    // placing 0,0,0 for any item not there
    const newAttributeFromGeo = (type, geo, geo_source) => {
        const att_source = geo_source.getAttribute(type);
        const att_geo = geo.getAttribute(type);
        const data_array = [];
        let i = 0;
        while(i < att_geo.count){

             //console.log( att_source.array[i] )

             i += att_geo.itemSize;
        }
        return att_source;
    };

    api.create = (sourceGeos) => {
        const geo_array = sortByCount(sourceGeos);
        // make new geo as clone of geo_array[0] which should have the largest count
        const geo = geo_array[0].clone();

        geo.morphAttributes.position = [];
        geo_array.forEach( (geo_source, i) => {
             geo.morphAttributes.position[ i ] = newAttributeFromGeo('position', geo, geo_source);
        });
        return geo;
    };
}( this ));
