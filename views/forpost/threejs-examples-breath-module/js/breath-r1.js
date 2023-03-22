// breath.js - r1 - from threejs-examples-breath-module
(function(api){
    const BREATH_KEYS = 'restLow,breathIn,restHigh,breathOut'.split(',');
    const BREATH_DISP_NAMES = 'rest low, breath in, rest high, breath out'.split(',');
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
    // get a breath parts string for display
    const getBreathPartsString = (group) => {
        const gud = group.userData;
        return Object.keys(gud.breathParts).reduce( (acc, key, i) => {
            const n = gud.breathParts[key];
            const a = n / gud.breathPartsSum;
            const s = gud.secsPerBreathCycle * a;
            acc += s.toFixed(2) + 's ' + BREATH_DISP_NAMES[i] + (i === 3 ? '' : ', ');
            return acc;
        }, '');
    };
    const secsToTimeStr = (totalSecs) => {
        const minutes = Math.floor( totalSecs / 60 );
        const secs = Math.floor(totalSecs % 60);
        return String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0')
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // main update method
    api.update = (group, a_fullvid) => {
        const gud = group.userData;
        gud.a_fullvid = a_fullvid;
        gud.sec = gud.totalBreathSecs * gud.a_fullvid;
        gud.timeString = secsToTimeStr(gud.sec);
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
        gud.sec = 0;
        // set in api.update
        gud.currentBreathKey = '';
        gud.a_fullvid = 0;
        gud.a_base = 0;
        gud.a_breathPart = 0;  // alpha value of the current breath part
        gud.a1 = 0;
        gud.a2 = 0;
        // display values
        gud.breathPartsSum = getBreathPartsSum(gud.breathParts);
        gud.secsPerBreathCycle = 60 / gud.breathsPerMinute;
        gud.breathPartsString = getBreathPartsString(group);
        gud.totalTimeString = secsToTimeStr(gud.totalBreathSecs);
        gud.timeString = secsToTimeStr(gud.sec);
        // update and return
        api.update(group, 0);
        return group;
    };

}(this['BreathMod'] = {} ));