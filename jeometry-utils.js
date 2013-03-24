(function( jeometry, undefined ) {

    var point_add = function(p1, p2) {
        return jeometry.primitives.point(p1.x+p2.x, p1.y+p2.y);
    };

    var point_subtract = function(p1, p2) {
        return jeometry.primitives.point(p1.x-p2.x, p1.y-p2.y);
    };

    var point_scalar = function(scalar, p1) {
        return jeometry.primitives.point(scalar*p1.x, scalar*p1.y);
    };

    var cross_product = function(p1, p2) {
        return (p1.x * p2.y) - (p1.y * p2.x);
    };

    var create_2d_symmetric_lookup = function(data) {
        /*
        Creates a lookup table where the key is made up of two elements.
        These key elements can be given in any order, so the lookup is built symmetrical.
            lookup.get(key1, key2) == lookup.get(key2, key1)

        data must be an array of elements like {key1, key2, value}

        example:
        data = [{key1:"funky", key2:"town", value:"yeah baby!"}, ...]
        lookup.get("funky", "town")
        lookup.get("town", "funky")
        */

        var lookup = {
            data: {},
            get: function(key1, key2) {
                if(this.data[key1] != undefined) {
                    if(this.data[key1][key2] != undefined)
                        return this.data[key1][key2];
                } else if(this.data[key2] != undefined) {
                    return this.data[key2][key1];
                }
                return undefined
            }
        };

        for(var i in data) {
            if(lookup.data[data[i].key1] == undefined)
                lookup.data[data[i].key1] = {};
            lookup.data[data[i].key1][data[i].key2] = data[i].value;
        }

        return lookup;

    };

    // tie to sub-namespace
    jeometry.utils = {
        point_add:point_add,
        point_subtract:point_subtract,
        point_scalar:point_scalar,
        cross_product:cross_product,
        create_2d_symmetric_lookup:create_2d_symmetric_lookup
    };


}( window.jeometry = window.jeometry || {} ));
