// timeline.js - r0 - r146 prototype
(function(api){
    
    // SOME FUN FACTS
    // 86,400,000  ms/day

    // get a time of day in millieseconds
    const getMS = (str) => {
        const arr = str.split(':');
        const h = parseInt(arr[0]) * 60 * 60 * 1000;
        const m = parseInt(arr[1]) * 60 * 1000;
        const s = parseInt(arr[2].split('.')[0]) * 1000;
        const r = parseInt(arr[2].split('.')[1]);
        return  h + m + s + r;
    };

    const getTotalTime = (tl) => {

        const ms_start = getMS(tl.st);
        const ms_end = getMS(tl.et);
        return ms_end - ms_start;

    };

    api.create = (opt) => {
        opt = opt || {};
        const tl = {
           st: opt.st || '00:00:00.000',
           et: opt.et || '22:59:59.999',
           events: []
        };

        tl.totalTime = getTotalTime(tl);

        return tl;
    };

    api.add = (opt) => {
        const tl = {};
        return tl;
    };

}( this['timeLine'] = {} ));
