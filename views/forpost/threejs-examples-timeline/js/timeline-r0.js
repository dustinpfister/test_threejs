// timeline.js - r0 - from threejs-examples-timeline
(function(api){
    //-------- ----------
    // DEFAULT ON IDLE
    //-------- ----------
    const DEFAULT_ON_IDLE = (tl, index_next, index_last) => {
        let index = null;
        let alpha = 1;
        // have a last index?
        if( typeof index_last === 'number' ){
            index = index_last;
        }
        // have a next index?
        if( typeof index_next === 'number'){
           index = index_next;
           alpha = 0;
        }
        const event = tl.events[index];
        event.update(tl, alpha );
    };
    //-------- ----------
    // CONST VALUES
    //-------- ----------
    const MS_PER_HOUR = 1000 * 60 * 60;
    const MS_PER_MINUTE = 1000 * 60;
    const MS_PER_SECOND = 1000;
    //-------- ----------
    // HELPERS
    //-------- ----------
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
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    api.set = (tl, alpha) => {
        tl.time = Math.floor( tl.totalTime * alpha );
        tl.ct = getTimeStr(tl);
        tl.a_main = tl.time / tl.totalTime;
        let index_event = 0;
        let event_called = false;
        let index_last = null;
        let index_next = null;
        const event_count = tl.events.length;
        while(index_event < event_count){
            const event = tl.events[index_event];
            if(tl.a_main <= event.a_start && index_next === null ){
                index_next = index_event;
            }
            if(tl.a_main >= event.a_end ){
                index_last = index_event;
            }
            if(tl.a_main >= event.a_start && tl.a_main < event.a_end){
                const a_event = (event.a_start - tl.a_main) / ( event.a_start - event.a_end );
                event.update(tl, a_event );
                event_called = true;
                break;
            }
            index_event += 1;
        }
        // idle?
        if(!event_called){
            tl.on_idle(tl, index_next, index_last);
        }
    };
    api.create = (opt) => {
        opt = opt || {};
        const tl = {
           st: opt.st || '00:00:00.000',
           et: opt.et || '22:59:59.999',
           ct: '00:00:00.000',
           on_idle : opt.on_idle || DEFAULT_ON_IDLE
        };
        tl.events = [];
        tl.totalTime = getTotalTime(tl);
        //api.set(tl, 0);
        return tl;
    };
    api.add = (tl, opt) => {
        opt = opt || {};
        const event = {};
        event.st = opt.st || tl.st;
        event.et = opt.et || tl.et;
        const ms_start = getDayMS(event.st) - getDayMS(tl.st);
        const ms_end = ms_start + ( getDayMS(event.et) - getDayMS(event.st));
        event.a_start = ms_start / tl.totalTime;
        event.a_end = ms_end / tl.totalTime;
        event.update = opt.update || function(){};
        tl.events.push(event);
    };
}( this['timeLine'] = {} ));
