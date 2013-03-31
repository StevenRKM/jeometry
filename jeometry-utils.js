(function( jeometry, undefined ) {

    var create_2d_lookup = function(data) {
        /*
         Creates a lookup table where the key is made up of two elements.
         The order of these key elements is important.
         lookup.get(key1, key2) != lookup.get(key2, key1)

         data must be an array of elements like {key1, key2, value}

         example:
         data = [{key1:"funky", key2:"town", value:"yeah baby!"}, ...]
         lookup.get("funky", "town")
         */

        var lookup = {
            data: {},
            get: function(key1, key2) {
                try {
                    return this.data[key1][key2];
                } catch(e) {
                    return undefined;
                }
            }
        };

        for(var i in data) {
            if(lookup.data[data[i].key1] == undefined)
                lookup.data[data[i].key1] = {};
            lookup.data[data[i].key1][data[i].key2] = data[i].value;
        }

        return lookup;

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
                try {
                    return this.data[key1][key2];
                } catch(e) {
                    try {
                        return this.data[key2][key1];
                    } catch(e) {
                        return undefined;
                    }
                }
            }
        };

        for(var i in data) {
            if(lookup.data[data[i].key1] == undefined)
                lookup.data[data[i].key1] = {};
            lookup.data[data[i].key1][data[i].key2] = data[i].value;
        }

        return lookup;

    };

    // tie to namespace
    jeometry.utils = {
        create_2d_lookup:create_2d_lookup,
        create_2d_symmetric_lookup:create_2d_symmetric_lookup
    };


}( window.jeometry = window.jeometry || {} ));
