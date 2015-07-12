var reactiveLocation = new ReactiveVar(null);

var defaultOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000
};

function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
}

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

Geolocation = {
    getCurrentPosition: function (options) {
        options = options || defaultOptions;
        return new Promise(function (resolve, reject) {
            function success (pos) {
                reactiveLocation.set(pos);
                resolve(pos)
            }
            function error (error) { reject(error)}
            try {
                navigator.geolocation.getCurrentPosition(success, error, options)
            } catch(e) {
                window.location.reload()
            }
        })
    },
    reactiveLocation: reactiveLocation.get(),
    watchPosition: function (callback, options) {
        options = options || defaultOptions;
        return navigator.geolocation.watchPosition(callback, error, options);
    }
}

//Helpers

function rad(x) {
    return x * Math.PI / 180;
}

function getDistance(p1, p2) {
    if (p1 && p2) {
        Location.debug && console.log("Getting distance for", p1, p2)
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.coords.latitude - p1.latitude);
        var dLong = rad(p2.coords.longitude - p1.longitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.coords.latitude)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meters
    } else {
        // TODO: console log or throw error? Return what here?
        return null;
    }
}

function isSecondsAway(date, seconds) {
    var now = new Date();
    Location.debug && console.log("Time Calc: " + (now.getTime() - date.getTime()));
    Location.debug && console.log(seconds + " Seconds: " + (seconds * 1000) + ' In Milliseconds');

    return !((now.getTime() - date.getTime()) <= (seconds * 1000))
}
