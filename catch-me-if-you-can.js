Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
    var username = new ReactiveVar(),
        prevPosition = new ReactiveVar(),
        position = new ReactiveVar(),
        TIMEOUT_PLAYER_OFFLINE = 120 * 1000;

    Meteor.subscribe("markers");

    Accounts.onLogin(function () {
        if(Meteor.user().profile) {
            username.set(Meteor.user().profile.name);
        } else {
            username.set(Meteor.user().username);
        }
        console.log(username.get() + ' user logged in');
        Meteor.call('resetPositions');
    });

    function updatePosition(pos) {
        var marker = Markers.findOne({owner: Meteor.userId()});

        if (username.get() && Meteor.userId()) {
            if (!marker) {
                Markers.insert({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    owner: Meteor.userId(),
                    username: username.get()
                });
            } else {
                Markers.update(marker._id, {
                    $set: {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        username: username.get()
                    }
                });
            }
        }

        console.log("Player: " + username.get() + " position lat: "+pos.coords.latitude + "lng: "+ pos.coords.longitude);
        if(position.get()) {
            prevPosition.set(position.get());
        }
        position.set({'lat': pos.coords.latitude, 'lng': pos.coords.longitude});
    }



    Meteor.startup(function () {
        if (window.location.href.indexOf('clearDB') > -1) {
            Markers.remove({});
        }

        var hotcodepush = false;

        Meteor._reload.onMigrate(function() {
            hotcodepush = true;
            return [true];
        })

        window.intervalPlayerOffline =setInterval(function () {
            //Markers.remove({"_id": Meteor.userId()});
            //console.log('checking if player offline');
            if(prevPosition.get() && position.get()) {
                if(prevPosition.get().lat == position.get().lat &&
                prevPosition.get().lng == position.get().lng) {
                    Meteor.call("deleteMarker");
                }
            } else {
                //console.log('player online');
            }
            //if (position && prevPosition && prevPosition.lat === position.lat && prevPosition.lng === position.lng) {
            //    Meteor.call("deleteMarker");
            //} else {
            //    console.log('player online');
            //}
        }, TIMEOUT_PLAYER_OFFLINE);

        window.addEventListener('beforeunload', function(e) {
            if(!hotcodepush) {
                clearInterval(window.intervalPlayerOffline);
                console.log("window close");
            }
            if(hotcodepush) console.log("Hot code reload");
        })

        Geolocation.getCurrentPosition().then(function (pos) {
            updatePosition(pos);
            //GoogleMaps.get('map').instance.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        }).then(function () {
            GoogleMaps.load();
        }).catch(function(error) {
           console.error(error);
        })

        Geolocation.watchPosition(function (pos) {
            console.log('position update for ' + username.get())
            updatePosition(pos)
        });

        Template.map.onCreated(function () {
            GoogleMaps.ready('map', function (map) {
                //console.log("I'm ready!");
            })
        });
    });


    Template.map.onCreated(function () {
        GoogleMaps.ready('map', function (map) {

            //// Create an array of styles.
            var styles = [
                {
                    stylers: [
                        { hue: "#00ffe6" },
                        { saturation: -40 }
                    ]
                },{
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [
                        { lightness: 100 },
                        { visibility: "simplified" }
                    ]
                },{
                    featureType: "road",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                }
            ];
            //
            //// Create a new StyledMapType object, passing it the array of styles,
            //// as well as the name to be displayed on the map type control.
            //var styledMap = new google.maps.StyledMapType(styles,
            //    {name: "Styled Map"});
            //
            ////Associate the styled map with the MapTypeId and set it to display.
            map.instance.setOptions({styles: styles});
            //map.instance.mapTypes.set('map_style', styledMap);
            //map.instance.setMapTypeId('map_style');

            var markers = {};

            Markers.find().observe({
                added: function (document) {
                    // Create a marker for this document
                    var marker = new google.maps.Marker({
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(document.lat, document.lng),
                        //backgroundColor: hexUserColor,
                        map: map.instance,
                        // We store the document _id on the marker in order
                        // to update the document within the 'dragend' event below.
                        id: document._id
                    });

                    var infoWindow = new google.maps.InfoWindow({
                        content: '<h3>' + document.username + '</h3>'
                    });

                    google.maps.event.addListener(marker, 'click', function (event) {
                        //infoWindow.open(map.instance, marker)
                        // Details: distance, mode etc
                    });

                    if(document.owner !== Meteor.userId()) {
                        infoWindow.open(map.instance, marker);
                    }

                    // This listener lets us drag markers on the map and update their corresponding document.
                    google.maps.event.addListener(marker, 'dragend', function (event) {
                        Markers.update(marker.id, {$set: {lat: event.latLng.lat(), lng: event.latLng.lng()}});
                    });

                    // Store this marker instance within the markers object.
                    markers[document._id] = marker;
                },
                changed: function (newDocument, oldDocument) {
                    markers[newDocument._id].setPosition({lat: newDocument.lat, lng: newDocument.lng});
                    console.log('reposition marker ' + newDocument.username + ' to lat: ' + newDocument.lat + ' and lng: ' + newDocument.lng)
                },
                removed: function (oldDocument) {
                    // Remove the marker from the map
                    markers[oldDocument._id].setMap(null);

                    // Clear the event listener
                    google.maps.event.clearInstanceListeners(
                        markers[oldDocument._id]);

                    // Remove the reference to this marker instance
                    delete markers[oldDocument._id];
                }
            });

        });
    });


    Template.map.helpers({
        mapOptions: function () {
            if (GoogleMaps.loaded()) {
                return {
                    center: position.get() || {lat: 0, lng: 0},
                    zoom: 16,
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                    }
                };
            }
        }

    });

    Template.body.helpers({
        //pos: function () {
        //    return Session.get()
        //},
        username: function () {
            return username.get()
        }
    });

    Template.body.helpers({
        mapOptions: function () {
            // Make sure the maps API has loaded
            if (GoogleMaps.loaded()) {
                // Map initialization options
                return
            }
        }
    });

    // At the bottom of the client code
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });

    Meteor.publish("markers", function () {
        return Markers.find({});
    });
}

Meteor.methods({
    //addMarker: function (username, values) {
    //    // Make sure the user is logged in before inserting a task
    //    if (! Meteor.userId()) {
    //        throw new Meteor.Error("not-authorized");
    //    }
    //    if (! username.get()) {
    //        throw new Meteor.Error("username-missing");
    //    }
    //
    //    Markers.insert({
    //        lat: pos.coords.latitude,
    //        lng: pos.coords.longitude,
    //        owner: Meteor.userId(),
    //        username: username.get()
    //    });
    //},
    //updateMarker: function (marker, values) {
    //    if (marker.owner !== Meteor.userId()) {
    //        throw new Meteor.Error("not-authorized");
    //    }
    //
    //    Markers.update({owner: marker.owner, {$set: values});
    //},
    deleteMarker: function () {
        var marker = Markers.findOne({owner: this.userId});
        if(marker) {
            //if (marker.owner !== Meteor.userId()) {
            //    // make sure only the owner can delete it
            //    throw new Meteor.Error("not-authorized");
            //}

            Markers.remove({_id: marker._id});
            console.log("Player: " + username.get() + " went offline");
        }

    },
    resetPositions: function() {
        var previousPositions = Markers.find({owner: this.userId});
        previousPositions.forEach(function(pos) {
            Markers.remove(pos);
            console.log('clear prev pos: ' + pos)
        })
    }
    //setChecked: function (taskId, setChecked) {
    //    var task = Tasks.findOne(taskId);
    //    if (task.private && task.owner !== Meteor.userId()) {
    //        // If the task is private, make sure only the owner can delete it
    //        throw new Meteor.Error("not-authorized");
    //    }
    //    Tasks.update(taskId, { $set: { checked: setChecked} });
    //}
});
