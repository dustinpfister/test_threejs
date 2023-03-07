// timeline.js - r0 - r146 prototype
(function(api){
    
    // SOME FUN FACTS
    // 86,400,000  ms/day

    // get a time of day in millieseconds
    const getDayMS = (str) => {
        const arr = str.split(':');
        const h = parseInt(arr[0]) * 60 * 60 * 1000;
        const m = parseInt(arr[1]) * 60 * 1000;
        const s = parseInt(arr[2].split('.')[0]) * 1000;
        const r = parseInt(arr[2].split('.')[1]);
        return  h + m + s + r;
    };

    // get a total time value in MS
    const getTotalTime = (tl) => {
        const ms_start = getDayMS(tl.st);
        const ms_end = getDayMS(tl.et);
        return ms_end - ms_start;
    };

    const MS_PER_HOUR = 1000 * 60 * 60;
    const MS_PER_MINUTE = 1000 * 60;
    const MS_PER_SECOND = 1000;

    // get a current time string based on current tl.time
    const getTimeStr = (tl) => {
        const h = Math.floor( tl.time / MS_PER_HOUR);
        const m = Math.floor( tl.time % MS_PER_HOUR / MS_PER_MINUTE);
        const s = Math.floor( tl.time % MS_PER_MINUTE / MS_PER_SECOND);
        const ms = tl.time % MS_PER_SECOND;
        return String(h).padStart(2, '0') + ':' + 
               String(m).padStart(2, '0') +':' + 
               String(s).padStart(2, '0') + '.' + 
               String(ms).padStart(3, '0');
    };

    api.set = (tl, alpha) => {
        tl.time = Math.floor( tl.totalTime * alpha );
        tl.ct = getTimeStr(tl)
    };


    api.create = (opt) => {
        opt = opt || {};
        const tl = {
           st: opt.st || '00:00:00.000',
           et: opt.et || '22:59:59.999',
           ct: '00:00:00.000'
        };
        tl.totalTime = getTotalTime(tl);
        api.set(tl, 0);
        return tl;
    };



    api.add = (opt) => {
        const tl = {};
        return tl;
    };

}( this['timeLine'] = {} ));
