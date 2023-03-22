// breath.js - r1 - from threejs-examples-breath-module
(function(api){
    const BREATH_KEYS = 'restLow,breathIn,restHigh,breathOut'.split(',');
    //-------- ----------
    // DEFAULTS
    //-------- ----------
    const DEFAULT_BREATH_PARTS = {restLow: 1, breathIn: 5, restHigh: 1, breathOut: 5};
    const DEFAULT_HOOKS = {
        restLow : (group, a_breathPart, a_fullvid, gud) => {},
        restHigh : (group, a_breathPart, a_fullvid, gud) => {},
        breathIn : (group, a_breathPart, a_fullvid, gud) => {},
        breathOut : (group, a_breathPart, a_fullvid, gud) => {}
    };
    //-------- ----------
    // HELPERS
    //-------- ----------
    // get the sum of a breath parts object
    const getBreathPartsSum = (breathParts) => {
        return Object.keys( breathParts ).reduce( ( acc, key ) => { return acc + breathParts[key]; }, 0);
    };
    // get the alpha value targets for each breath part
    const getBreathAlphaTargets = (breathParts) => {
        return BREATH_KEYS.reduce((acc, key, i, arr) => {
            let a = breathParts[ key ];
            if(i > 0){
                a += acc[i - 1]
            }
            acc.push( a );
            return acc;
        }, []).map((n)=>{
            return n / getBreathPartsSum(breathParts);
        });
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // main update method
    api.update = (group, a_fullvid) => {
        const gud = group.userData;
        gud.a_fullvid = a_fullvid;
        gud.sec = gud.totalBreathSecs * gud.a_fullvid;
        gud.a1 = (gud.sec % 60 / 60) * gud.breathsPerMinute % 1;
        let ki = 0;
        while(ki < BREATH_KEYS.length){
            if(gud.a1 < gud.breathAlphaTargts[ki]){
                gud.a_base = ki > 0 ? gud.breathAlphaTargts[ki - 1] : 0;
                gud.a_breathPart = (gud.a1 - gud.a_base) / (gud.breathAlphaTargts[ki] - gud.a_base);
                gud.currentBreathKey = BREATH_KEYS[ki];
                gud.a2 = gud.currentBreathKey === 'restLow' ? 0 : 1;
                if( gud.currentBreathKey === 'breathIn'){
                    gud.a2 = Math.sin(Math.PI * 0.5 * gud.a_breathPart);
                }
                if( gud.currentBreathKey === 'breathOut'){
                    gud.a2 = 1 - Math.sin(Math.PI * 0.5 * gud.a_breathPart);
                }
                // call before hook
                gud.before(group, gud.a1, gud.a2, gud.a_fullvid, gud.a_breathPart, gud.currentBreathKey, gud);
                // call the current breath hook
                const hook = gud.hooks[ gud.currentBreathKey ];
                hook(group, gud.a_breathPart, gud.a_fullvid, gud);
                break;
            }
            ki += 1;;
        }
    };
    // main create method
    api.create = (opt) => {
        opt = opt || {};
        const group = new THREE.Group();
        const gud = group.userData;
        gud.totalBreathSecs = opt.totalBreathSecs === undefined ? 300 : opt.totalBreathSecs;
        gud.breathsPerMinute = opt.breathsPerMinute === undefined ? 5 : opt.breathsPerMinute;
        gud.breathParts = opt.breathParts || DEFAULT_BREATH_PARTS;
        gud.breathAlphaTargts = getBreathAlphaTargets(gud.breathParts);
        gud.before = opt.before || function(){};
        gud.hooks = Object.assign({}, DEFAULT_HOOKS , opt.hooks );
        gud.id = opt.id || '1';
        // set in api.update
        gud.currentBreathKey = '';
        gud.a_fullvid = 0;
        gud.a_base = 0;
        gud.a_breathPart = 0;  // alpha value of the current breath part
        api.update(group, 0);
        return group;
    };
}(this['BreathMod'] = {} ));