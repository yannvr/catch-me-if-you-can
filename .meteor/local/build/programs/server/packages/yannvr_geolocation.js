(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var ReactiveVar = Package['reactive-var'].ReactiveVar;

/* Package-scope variables */
var Geolocation;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/yannvr:geolocation/geolocation.js                                                      //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
var reactiveLocation = new ReactiveVar(null);                                                      // 1
                                                                                                   // 2
var defaultOptions = {                                                                             // 3
    enableHighAccuracy: true,                                                                      // 4
    timeout: 5000,                                                                                 // 5
    maximumAge: 1000                                                                               // 6
};                                                                                                 // 7
                                                                                                   // 8
function success(pos) {                                                                            // 9
    var crd = pos.coords;                                                                          // 10
                                                                                                   // 11
    console.log('Your current position is:');                                                      // 12
    console.log('Latitude : ' + crd.latitude);                                                     // 13
    console.log('Longitude: ' + crd.longitude);                                                    // 14
    console.log('More or less ' + crd.accuracy + ' meters.');                                      // 15
}                                                                                                  // 16
                                                                                                   // 17
function error(err) {                                                                              // 18
    console.warn('ERROR(' + err.code + '): ' + err.message);                                       // 19
}                                                                                                  // 20
                                                                                                   // 21
Geolocation = {                                                                                    // 22
    getCurrentPosition: function (options) {                                                       // 23
        options = options || defaultOptions;                                                       // 24
        return new Promise(function (resolve, reject) {                                            // 25
            function success (pos) {                                                               // 26
                reactiveLocation.set(pos);                                                         // 27
                resolve(pos)                                                                       // 28
            }                                                                                      // 29
            function error (error) { reject(error)}                                                // 30
            try {                                                                                  // 31
                navigator.geolocation.getCurrentPosition(success, error, options)                  // 32
            } catch(e) {                                                                           // 33
                window.location.reload()                                                           // 34
            }                                                                                      // 35
        })                                                                                         // 36
    },                                                                                             // 37
    reactiveLocation: reactiveLocation.get(),                                                      // 38
    watchPosition: function (callback, options) {                                                  // 39
        options = options || defaultOptions;                                                       // 40
        return navigator.geolocation.watchPosition(callback, error, options);                      // 41
    }                                                                                              // 42
}                                                                                                  // 43
                                                                                                   // 44
//Helpers                                                                                          // 45
                                                                                                   // 46
function rad(x) {                                                                                  // 47
    return x * Math.PI / 180;                                                                      // 48
}                                                                                                  // 49
                                                                                                   // 50
function getDistance(p1, p2) {                                                                     // 51
    if (p1 && p2) {                                                                                // 52
        Location.debug && console.log("Getting distance for", p1, p2)                              // 53
        var R = 6378137; // Earth’s mean radius in meter                                           // 54
        var dLat = rad(p2.coords.latitude - p1.latitude);                                          // 55
        var dLong = rad(p2.coords.longitude - p1.longitude);                                       // 56
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +                                          // 57
            Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.coords.latitude)) *                       // 58
            Math.sin(dLong / 2) * Math.sin(dLong / 2);                                             // 59
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));                                    // 60
        var d = R * c;                                                                             // 61
        return d; // returns the distance in meters                                                // 62
    } else {                                                                                       // 63
        // TODO: console log or throw error? Return what here?                                     // 64
        return null;                                                                               // 65
    }                                                                                              // 66
}                                                                                                  // 67
                                                                                                   // 68
function isSecondsAway(date, seconds) {                                                            // 69
    var now = new Date();                                                                          // 70
    Location.debug && console.log("Time Calc: " + (now.getTime() - date.getTime()));               // 71
    Location.debug && console.log(seconds + " Seconds: " + (seconds * 1000) + ' In Milliseconds'); // 72
                                                                                                   // 73
    return !((now.getTime() - date.getTime()) <= (seconds * 1000))                                 // 74
}                                                                                                  // 75
                                                                                                   // 76
/////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['yannvr:geolocation'] = {};

})();

//# sourceMappingURL=yannvr_geolocation.js.map
