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
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var Session = Package.session.Session;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MeteorToysData, MeteorToys_Parse, em, pw, MeteorToys_ToyKit, displayStatus;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/meteortoys:toykit/client/template.main.js                                  //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
                                                                                       // 1
Template.body.addContent((function() {                                                 // 2
  var view = this;                                                                     // 3
  return Blaze.If(function() {                                                         // 4
    return Spacebars.call(view.lookup("MeteorToys_Pro"));                              // 5
  }, function() {                                                                      // 6
    return [ "\n		", Blaze.If(function() {                                             // 7
      return Spacebars.call(view.lookup("MeteorToys"));                                // 8
    }, function() {                                                                    // 9
      return [ "\n			", HTML.DIV({                                                     // 10
        "class": "MeteorToys_orbs"                                                     // 11
      }, "\n				", Spacebars.include(view.lookupTemplate("MeteorToys_accounts")), "\n				", Spacebars.include(view.lookupTemplate("MeteorToys_shell")), "\n				", Spacebars.include(view.lookupTemplate("MeteorToys_method")), "\n				", Spacebars.include(view.lookupTemplate("MeteorToys_autopub")), "\n				", Spacebars.include(view.lookupTemplate("MeteorToys_sub")), "\n				", Spacebars.include(view.lookupTemplate("MeteorToys_pubsub")), "\n				", Spacebars.include(view.lookupTemplate("MeteorToys_intercept")), "\n				", Spacebars.include(view.lookupTemplate("MeteorToys_reload")), "\n			"), "\n		" ];
    }), "\n	" ];                                                                       // 13
  }, function() {                                                                      // 14
    return [ "\n		", Blaze.If(function() {                                             // 15
      return Spacebars.call(view.lookup("MeteorToys"));                                // 16
    }, function() {                                                                    // 17
      return [ "\n			", HTML.DIV({                                                     // 18
        "class": "MeteorToys_orbs"                                                     // 19
      }, "\n				", Blaze._TemplateWith(function() {                                    // 20
        return {                                                                       // 21
          template: Spacebars.call(view.lookup("all"))                                 // 22
        };                                                                             // 23
      }, function() {                                                                  // 24
        return Spacebars.include(function() {                                          // 25
          return Spacebars.call(Template.__dynamic);                                   // 26
        });                                                                            // 27
      }), "\n			"), "\n		" ];                                                          // 28
    }), "\n	" ];                                                                       // 29
  });                                                                                  // 30
}));                                                                                   // 31
Meteor.startup(Template.body.renderToDocument);                                        // 32
                                                                                       // 33
Template.__checkName("MeteorToy");                                                     // 34
Template["MeteorToy"] = new Template("Template.MeteorToy", (function() {               // 35
  var view = this;                                                                     // 36
  return HTML.DIV({                                                                    // 37
    "class": function() {                                                              // 38
      return [ "MeteorToys_orb ", Spacebars.mustache(view.lookup("type")), " ", Spacebars.mustache(view.lookup("state")) ];
    },                                                                                 // 40
    id: function() {                                                                   // 41
      return Spacebars.mustache(view.lookup("name"));                                  // 42
    }                                                                                  // 43
  }, HTML.Raw('\n		<div class="MeteorToys_icon"></div>\n		'), HTML.DIV({               // 44
    "class": "MeteorToys_orb_wrapper"                                                  // 45
  }, "\n			", Blaze._InOuterTemplateScope(view, function() {                           // 46
    return Spacebars.include(function() {                                              // 47
      return Spacebars.call(view.templateContentBlock);                                // 48
    });                                                                                // 49
  }), "\n		"), "\n	");                                                                 // 50
}));                                                                                   // 51
                                                                                       // 52
Template.__checkName("MeteorToys_basic");                                              // 53
Template["MeteorToys_basic"] = new Template("Template.MeteorToys_basic", (function() { // 54
  var view = this;                                                                     // 55
  return Blaze._TemplateWith(function() {                                              // 56
    return {                                                                           // 57
      name: Spacebars.call("MeteorToys_basic")                                         // 58
    };                                                                                 // 59
  }, function() {                                                                      // 60
    return Spacebars.include(view.lookupTemplate("MeteorToy"), function() {            // 61
      return [ "\n		", HTML.DIV({                                                      // 62
        "class": "MeteorToys_sub_header"                                               // 63
      }, "\n			Unlock Meteor Toys Pro\n		"), "\n		", HTML.DIV({                        // 64
        "class": "MeteorToys_sub_content"                                              // 65
      }, "\n\n		", HTML.FORM("\n\n			", HTML.DIV({                                     // 66
        "class": "MeteorToys_row"                                                      // 67
      }, "\n				", HTML.INPUT({                                                        // 68
        id: "meteortoyscadf",                                                          // 69
        placeholder: "Email"                                                           // 70
      }), "\n				", HTML.DIV({                                                         // 71
        "class": "MeteorToys_row_name"                                                 // 72
      }, "Email"), "\n			"), "\n\n			", HTML.DIV({                                     // 73
        "class": "MeteorToys_row"                                                      // 74
      }, "\n				", HTML.INPUT({                                                        // 75
        id: "meteortoyspass",                                                          // 76
        placeholder: "Serial"                                                          // 77
      }), "\n				", HTML.DIV({                                                         // 78
        "class": "MeteorToys_row_name"                                                 // 79
      }, "Serial"), "\n			"), "\n\n\n				", HTML.INPUT({                               // 80
        type: "submit",                                                                // 81
        value: "Activate",                                                             // 82
        style: "margin-top: -4px"                                                      // 83
      }), "\n				\n				", HTML.BR(), HTML.BR(), "\n				Experience the next level to JetSetter and Mongol. ", HTML.BR(), "\n				", HTML.A({
        href: "http://bit.ly/1FqdsPM"                                                  // 85
      }, "Learn More"), "\n\n\n		"), "\n		"), "\n	" ];                                 // 86
    });                                                                                // 87
  });                                                                                  // 88
}));                                                                                   // 89
                                                                                       // 90
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/meteortoys:toykit/client/main.js                                           //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
UI.registerHelper('MeteorToys', function(){                                            // 1
  return Session.get("MeteorToys_display");                                            // 2
});                                                                                    // 3
                                                                                       // 4
Template.MeteorToy.helpers({                                                           // 5
  type: function () {                                                                  // 6
    if (this.type === "button") {                                                      // 7
        return "MeteorToys_button";                                                    // 8
    }                                                                                  // 9
  },                                                                                   // 10
  state: function () {                                                                 // 11
    if (Session.equals("MeteorToys_current", this.name)) {                             // 12
      return "MeteorToys_orb_active";                                                  // 13
    } else {                                                                           // 14
      return "MeteorToys_orb_condensed";                                               // 15
    }                                                                                  // 16
  }                                                                                    // 17
});                                                                                    // 18
                                                                                       // 19
Template.MeteorToy.events({                                                            // 20
  'click .MeteorToys_orb': function () {                                               // 21
    if (this.name === "MeteorToys_autopub") {                                          // 22
      return false;                                                                    // 23
    }                                                                                  // 24
                                                                                       // 25
    if (Session.get("MeteorToys_current") === this.name) {                             // 26
      Session.set("MeteorToys_current", false)                                         // 27
    } else {                                                                           // 28
      Session.set("MeteorToys_current", this.name)                                     // 29
    }                                                                                  // 30
  },                                                                                   // 31
  'click .MeteorToys_orb_wrapper': function (event, t) {                               // 32
    if ($('#' + this.name).hasClass('MeteorToys_orb_active')) {                        // 33
      event.stopPropagation();                                                         // 34
    }                                                                                  // 35
  },                                                                                   // 36
  'click .MeteorToys_name': function () {                                              // 37
    Session.set("MeteorToys_current", false);                                          // 38
  }                                                                                    // 39
});                                                                                    // 40
                                                                                       // 41
Template.body.helpers({                                                                // 42
  all: function () {                                                                   // 43
    if (Package["meteortoys:allthings"]) {                                             // 44
      return "MeteorToys_basic";                                                       // 45
    }                                                                                  // 46
  }                                                                                    // 47
});                                                                                    // 48
                                                                                       // 49
Template.MeteorToys_basic.events({                                                     // 50
  'submit': function (e, t) {                                                          // 51
                                                                                       // 52
    e.preventDefault();                                                                // 53
                                                                                       // 54
    em = $("#meteortoyscadf").val(),                                                   // 55
    pw = $("#meteortoyspass").val();                                                   // 56
                                                                                       // 57
    if (em === "") {                                                                   // 58
      alert("Please enter an email");                                                  // 59
      return false;                                                                    // 60
    }                                                                                  // 61
                                                                                       // 62
    if (pw === "") {                                                                   // 63
      alert("Please enter a license");                                                 // 64
      return false;                                                                    // 65
    }                                                                                  // 66
                                                                                       // 67
                                                                                       // 68
    Meteor.call("Mongol_verifyDoc", em, pw, function (e,r) {                           // 69
      if (r) {                                                                         // 70
        Meteor._reload.reload();                                                       // 71
        alert("Thanks for buying Meteor Toys!")                                        // 72
      } else {                                                                         // 73
        alert("Invalid Credentials. Please try again.");                               // 74
      }                                                                                // 75
    });                                                                                // 76
                                                                                       // 77
  }                                                                                    // 78
});                                                                                    // 79
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/meteortoys:toykit/client/functions.js                                      //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
// Start by observing                                                                  // 1
Meteor.startup(function(){                                                             // 2
  MeteorToys_ToyKit.hotKeys();                                                         // 3
});                                                                                    // 4
                                                                                       // 5
MeteorToys_ToyKit = {                                                                  // 6
  observe: function () {                                                               // 7
                                                                                       // 8
    // first load                                                                      // 9
    MeteorToys_ToyKit.runPubSub();                                                     // 10
    MeteorToys_ToyKit.runJetSetter();                                                  // 11
                                                                                       // 12
    // start                                                                           // 13
    if (!Object.observe) {                                                             // 14
      setInterval(function(){                                                          // 15
        MeteorToys_ToyKit.runPubSub();                                                 // 16
        MeteorToys_ToyKit.runJetSetter();                                              // 17
      }, 3000);                                                                        // 18
    } else {                                                                           // 19
      Object.observe(Meteor.default_connection._subscriptions, function() {            // 20
        MeteorToys_ToyKit.runPubSub();                                                 // 21
      })                                                                               // 22
      Object.observe(Session.keys, function () {                                       // 23
        MeteorToys_ToyKit.runJetSetter();                                              // 24
      })                                                                               // 25
    }                                                                                  // 26
    // end                                                                             // 27
  },                                                                                   // 28
  hotKeys: function () {                                                               // 29
    // start                                                                           // 30
    $(document).keydown(function (e) {                                                 // 31
      if (e.keyCode === 77 && e.ctrlKey) {                                             // 32
        MeteorToys_ToyKit.toggleDisplay();                                             // 33
      }                                                                                // 34
    });                                                                                // 35
    // end                                                                             // 36
  },                                                                                   // 37
  toggleDisplay: function () {                                                         // 38
                                                                                       // 39
    var displayStatus = Session.get("MeteorToys_display");                             // 40
                                                                                       // 41
    // Start Toy Processes                                                             // 42
    // Break this out into seperate function later                                     // 43
    if (typeof displayStatus  === 'undefined') {                                       // 44
      MeteorToys_ToyKit.observe();                                                     // 45
      Tracker.autorun(function () {                                                    // 46
        Meteor.subscribe("MeteorToys", Session.get("MeteorToys_autopublish"));         // 47
      });                                                                              // 48
    }                                                                                  // 49
                                                                                       // 50
    if (displayStatus) {                                                               // 51
      Session.set("MeteorToys_display", false);                                        // 52
    } else {                                                                           // 53
      Session.set("MeteorToys_display", true);                                         // 54
    }                                                                                  // 55
                                                                                       // 56
  },                                                                                   // 57
  runJetSetter: function () {                                                          // 58
    if (Package["msavin:jetsetter"]) {                                                 // 59
      Package["msavin:jetsetter"].JetSetter.getKeys()                                  // 60
    }                                                                                  // 61
  },                                                                                   // 62
  runPubSub: function () {                                                             // 63
    if (Package["msavin:sub"] || Package["msavin:mongol"]) {                           // 64
                                                                                       // 65
      var subscriptions  = Meteor.default_connection._subscriptions,                   // 66
          subKeys        = Object.keys(subscriptions);                                 // 67
                                                                                       // 68
      Session.set("MeteorToys_PubSub", subKeys);                                       // 69
                                                                                       // 70
    }                                                                                  // 71
  }                                                                                    // 72
}                                                                                      // 73
                                                                                       // 74
                                                                                       // 75
// Public Function                                                                     // 76
                                                                                       // 77
MeteorToys_Parse = function (data) {                                                   // 78
  var newObject = false;                                                               // 79
                                                                                       // 80
  try {                                                                                // 81
    newObject = JSON.parse(data);                                                      // 82
                                                                                       // 83
  } catch (error) {                                                                    // 84
    newObject = String(data)                                                           // 85
  }                                                                                    // 86
                                                                                       // 87
  return newObject;                                                                    // 88
}                                                                                      // 89
                                                                                       // 90
// Fix for Hot Reload                                                                  // 91
                                                                                       // 92
displayStatus = Session.get("MeteorToys_display");                                     // 93
                                                                                       // 94
if (typeof displayStatus  === 'undefined') {                                           // 95
                                                                                       // 96
} else {                                                                               // 97
  Session.set("MeteorToys_PubSub", null);                                              // 98
  MeteorToys_ToyKit.observe();                                                         // 99
                                                                                       // 100
                                                                                       // 101
  Tracker.autorun(function () {                                                        // 102
    Meteor.subscribe("MeteorToys", Session.get("MeteorToys_autopublish"));             // 103
  });                                                                                  // 104
}                                                                                      // 105
                                                                                       // 106
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/meteortoys:toykit/lib/collections.js                                       //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
MeteorToysData = {                                                                     // 1
	'Impersonate': new Mongo.Collection("MeteorToys_Impersonate"),                        // 2
	'JetSetter':   new Mongo.Collection("MeteorToys_JetSetter"),                          // 3
	'Mongol':      new Mongo.Collection("MeteorToys_Mongol"),                             // 4
}                                                                                      // 5
                                                                                       // 6
MeteorToysData.Impersonate.allow({                                                     // 7
	insert: function () {                                                                 // 8
	    return true;                                                                      // 9
	},                                                                                    // 10
	remove: function (){                                                                  // 11
	    return true;                                                                      // 12
	},                                                                                    // 13
	update: function() {                                                                  // 14
	    return true;                                                                      // 15
	}                                                                                     // 16
});                                                                                    // 17
                                                                                       // 18
MeteorToysData.JetSetter.allow({                                                       // 19
	insert: function () {                                                                 // 20
	    return true;                                                                      // 21
	},                                                                                    // 22
	remove: function (){                                                                  // 23
	    return true;                                                                      // 24
	},                                                                                    // 25
	update: function() {                                                                  // 26
	    return true;                                                                      // 27
	}                                                                                     // 28
});                                                                                    // 29
                                                                                       // 30
MeteorToysData.Mongol.allow({                                                          // 31
	insert: function () {                                                                 // 32
	    return true;                                                                      // 33
	},                                                                                    // 34
	remove: function (){                                                                  // 35
	    return true;                                                                      // 36
	},                                                                                    // 37
	update: function() {                                                                  // 38
	    return true;                                                                      // 39
	}                                                                                     // 40
});                                                                                    // 41
                                                                                       // 42
if (Meteor.isServer) {                                                                 // 43
	MeteorToysData["credentials"] = new Mongo.Collection("MeteorToysCredentials");        // 44
}                                                                                      // 45
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteortoys:toykit'] = {
  MeteorToysData: MeteorToysData,
  MeteorToys_Parse: MeteorToys_Parse
};

})();
