// alpha-methods.js - r0 - r146 prototype
(function(api){
    // the basic linear get alpha
    api.linear = function(a, b, c){
        if(c === undefined ){
            b = b === undefined ? 1 : b;
            return a * b % 1;
        }
        return a / b * c % 1;
    };
    // bias get alpha 0 to 1 and then back down to 0
    api.bias = function(a, b, c){
        const a1 = api.linear(a, b, c);
        return 1 - Math.abs(0.5 - a1) / 0.5;
    };
    // bias get alpha 0 to 1 and then back down to 0
    api.sinBias = function(a, b, c){
        const a1 = api.linear(a, b, c);
        return Math.sin( Math.PI * 1 * a1 );
    };
}( this['getAlpha'] = {} ));