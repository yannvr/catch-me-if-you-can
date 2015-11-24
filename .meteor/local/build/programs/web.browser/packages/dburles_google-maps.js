//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var _ = Package.underscore._;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var GoogleMaps;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/dburles:google-maps/template.google-maps.js                                        //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
                                                                                               // 1
Template.__checkName("googleMap");                                                             // 2
Template["googleMap"] = new Template("Template.googleMap", (function() {                       // 3
  var view = this;                                                                             // 4
  return HTML.Raw('<div class="map-canvas" style="width: 100%; height: 100%"></div>');         // 5
}));                                                                                           // 6
                                                                                               // 7
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/dburles:google-maps/google-maps.js                                                 //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var supportedTypes = ['Map', 'StreetViewPanorama'];                                            // 1
                                                                                               // 2
GoogleMaps = {                                                                                 // 3
  load: _.once(function(options) {                                                             // 4
    options = _.extend({ v: '3.exp' }, options);                                               // 5
    var params = _.map(options, function(value, key) { return key + '=' + value; }).join('&'); // 6
    var script = document.createElement('script');                                             // 7
    script.type = 'text/javascript';                                                           // 8
    script.src = 'https://maps.googleapis.com/maps/api/js?' + params +                         // 9
      '&callback=GoogleMaps.initialize';                                                       // 10
                                                                                               // 11
    document.body.appendChild(script);                                                         // 12
  }),                                                                                          // 13
  utilityLibraries: [],                                                                        // 14
  loadUtilityLibrary: function(path) {                                                         // 15
    this.utilityLibraries.push(path);                                                          // 16
  },                                                                                           // 17
  _loaded: new ReactiveVar(false),                                                             // 18
  loaded: function() {                                                                         // 19
    return this._loaded.get();                                                                 // 20
  },                                                                                           // 21
  maps: {},                                                                                    // 22
  _callbacks: {},                                                                              // 23
  initialize: function() {                                                                     // 24
    this._loaded.set(true);                                                                    // 25
    _.each(this.utilityLibraries, function(path) {                                             // 26
      var script = document.createElement('script');                                           // 27
      script.type = 'text/javascript';                                                         // 28
      script.src = path;                                                                       // 29
                                                                                               // 30
      document.body.appendChild(script);                                                       // 31
    });                                                                                        // 32
  },                                                                                           // 33
  _ready: function(name, map) {                                                                // 34
    _.each(this._callbacks[name], function(cb) {                                               // 35
      if (_.isFunction(cb))                                                                    // 36
        cb(map);                                                                               // 37
    });                                                                                        // 38
  },                                                                                           // 39
  ready: function(name, cb) {                                                                  // 40
    if (! this._callbacks[name])                                                               // 41
      this._callbacks[name] = [];                                                              // 42
    // make sure we run the callback only once                                                 // 43
    // as the tilesloaded event will also run after initial load                               // 44
    this._callbacks[name].push(_.once(cb));                                                    // 45
  },                                                                                           // 46
  // options: function(options) {                                                              // 47
  //   var self = this;                                                                        // 48
  //   return function() {                                                                     // 49
  //     if (self.loaded())                                                                    // 50
  //       return options();                                                                   // 51
  //   };                                                                                      // 52
  // },                                                                                        // 53
  get: function(name) {                                                                        // 54
    return this.maps[name];                                                                    // 55
  },                                                                                           // 56
  _create: function(name, options) {                                                           // 57
    var self = this;                                                                           // 58
    self.maps[name] = {                                                                        // 59
      instance: options.instance,                                                              // 60
      options: options.options                                                                 // 61
    };                                                                                         // 62
                                                                                               // 63
    if (options.type === 'StreetViewPanorama') {                                               // 64
      options.instance.setVisible(true);                                                       // 65
      self._ready(name, self.maps[name]);                                                      // 66
    } else {                                                                                   // 67
      google.maps.event.addListener(options.instance, 'tilesloaded', function() {              // 68
        self._ready(name, self.maps[name]);                                                    // 69
      });                                                                                      // 70
    }                                                                                          // 71
  }                                                                                            // 72
};                                                                                             // 73
                                                                                               // 74
Template.googleMap.onRendered(function() {                                                     // 75
  var self = this;                                                                             // 76
  self.autorun(function(c) {                                                                   // 77
    // if the api has loaded                                                                   // 78
    if (GoogleMaps.loaded()) {                                                                 // 79
      var data = Template.currentData();                                                       // 80
                                                                                               // 81
      if (! data.options)                                                                      // 82
        return;                                                                                // 83
      if (! data.name)                                                                         // 84
        throw new Meteor.Error("GoogleMaps - Missing argument: name");                         // 85
                                                                                               // 86
      var canvas = self.$('.map-canvas').get(0);                                               // 87
                                                                                               // 88
      // default to Map                                                                        // 89
      var type = data.type ? data.type : 'Map';                                                // 90
      if (! _.include(supportedTypes, type))                                                   // 91
        throw new Meteor.Error("GoogleMaps - Invalid type argument: " + type);                 // 92
                                                                                               // 93
      GoogleMaps._create(data.name, {                                                          // 94
        type: type,                                                                            // 95
        instance: new google.maps[type](canvas, data.options),                                 // 96
        options: data.options                                                                  // 97
      });                                                                                      // 98
                                                                                               // 99
      c.stop();                                                                                // 100
    }                                                                                          // 101
  });                                                                                          // 102
});                                                                                            // 103
                                                                                               // 104
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['dburles:google-maps'] = {
  GoogleMaps: GoogleMaps
};

})();
