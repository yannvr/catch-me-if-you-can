Markers = new Mongo.Collection('markers');


if (Meteor.isClient) {
  var username;
  Accounts.onLogin(function() {
    //username = Meteor.user().profile && Meteor.user().profile.name || Meteor.user().username
    console.log(getUsername() + ' user logged in');
  });

  function getUsername() {
    return Meteor.user().profile && Meteor.user().profile.name || Meteor.user().username;
  }

  function updatePosition(pos) {
    var marker = Markers.findOne({owner: Meteor.userId()});
    if (!marker) {
        Markers.insert({ lat: pos.coords.latitude, lng: pos.coords.longitude, owner: Meteor.userId(), username: username});
    } else {
      Markers.update(marker._id, {$set: {"lat":pos.coords.latitude, "lng": pos.coords.longitude, username: username}});
      //console.log('position updated')
    }

    Session.set('pos', {'lat': pos.coords.latitude, 'lng': pos.coords.longitude});
  }

  Meteor.startup(function() {

    if(window.location.href.indexOf('clearDB')>-1) {
      Markers.remove({});
    }

    Geolocation.getCurrentPosition().then(function(pos) {
      if(username) {
        updatePosition(pos);
      }
      //GoogleMaps.get('map').instance.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    }).then(function() {
      GoogleMaps.load();
    });

    Geolocation.watchPosition(function(pos) {
      //console.log('watch position update' + pos)
      updatePosition(pos)
    });

  Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      //console.log("I'm ready!");
      })
    });
  });



  Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {

      var markers = {};
      var infowindow = new google.maps.InfoWindow({
        content: '<h2>' + getUsername()+ '</h2>'
      });

      var id = Meteor.user()._id,
          hexUserColor = '#' + id.substr(0, 6);

      Markers.find().observe({
        added: function(document) {
          // Create a marker for this document
          var marker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.lat, document.lng),
            backgroundColor: hexUserColor,
            map: map.instance,
            // We store the document _id on the marker in order
            // to update the document within the 'dragend' event below.
            id: document._id
          });

          google.maps.event.addListener(marker, 'click', function(event) {
            infowindow.open(map.instance, marker)
          });

          // This listener lets us drag markers on the map and update their corresponding document.
          google.maps.event.addListener(marker, 'dragend', function(event) {
            Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
          });

          // Store this marker instance within the markers object.
          markers[document._id] = marker;
        },
        changed: function(newDocument, oldDocument) {
          markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
          console.log('reposition marker')
        },
        removed: function(oldDocument) {
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
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: Session.get('pos') || { lat: 0, lng: 0 },
          zoom: 16
        };
      }
    }

  });

  Template.body.helpers({
    pos: function () {
      return Session.get('pos')
    },
    username: function () {
      return getUsername()
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
}