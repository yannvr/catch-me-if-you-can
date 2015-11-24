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
var Mongo = Package.mongo.Mongo;
var Session = Package.session.Session;
var EditableJSON = Package['babrahams:editable-json'].EditableJSON;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Mongol, sessionKey, CollectionName, DocumentPosition, CurrentCollection, CollectionCount, CurrentDocument, DocumentID, ValidatedCurrentDocument, list, docID, docIndex, currentDoc, newPosition;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/lib/common.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (Mongol === undefined) {                                                                                            // 1
                                                                                                                       // 2
  // Create object and reserve name across the package                                                                 // 3
  Mongol = {};                                                                                                         // 4
                                                                                                                       // 5
}                                                                                                                      // 6
                                                                                                                       // 7
Mongol = {                                                                                                             // 8
  'colorize': function (json) {                                                                                        // 9
    // colorized the JSON objects                                                                                      // 10
    if (typeof json != 'string') {                                                                                     // 11
      json = JSON.stringify(json, undefined, 2);                                                                       // 12
    }                                                                                                                  // 13
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');                                    // 14
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'Mongol_number';                                                                                       // 16
      if (/^"/.test(match)) {                                                                                          // 17
        if (/:$/.test(match)) {                                                                                        // 18
          cls = 'Mongol_key';                                                                                          // 19
        } else {                                                                                                       // 20
          cls = 'Mongol_string';                                                                                       // 21
        }                                                                                                              // 22
      } else if (/true|false/.test(match)) {                                                                           // 23
        cls = 'Mongol_boolean';                                                                                        // 24
      } else if (/null/.test(match)) {                                                                                 // 25
        cls = 'Mongol_null';                                                                                           // 26
      }                                                                                                                // 27
      return '<span class="' + cls + '">' + match + '</span>';                                                         // 28
    });                                                                                                                // 29
  },                                                                                                                   // 30
  'getDocumentUpdate': function (data) {                                                                               // 31
                                                                                                                       // 32
    var elementID = 'MongolDoc_' + data,                                                                               // 33
      newData = document.getElementById(elementID).textContent;                                                        // 34
                                                                                                                       // 35
    return newData;                                                                                                    // 36
                                                                                                                       // 37
  },                                                                                                                   // 38
  'error': function (data) {                                                                                           // 39
                                                                                                                       // 40
    switch (data) {                                                                                                    // 41
      case "json.parse":                                                                                               // 42
        alert("There is an error with your JSON syntax.\n\nNote: keys and string values need double quotes.");         // 43
        break;                                                                                                         // 44
      case "duplicate":                                                                                                // 45
        alert("Strange, there was an error duplicating your document.");                                               // 46
        break;                                                                                                         // 47
      case "remove":                                                                                                   // 48
        alert("Strange, there was an error removing your document.");                                                  // 49
        break;                                                                                                         // 50
      case "insert":                                                                                                   // 51
        alert("Strange, there was an error inserting your document.");                                                 // 52
        break;                                                                                                         // 53
      case "update":                                                                                                   // 54
        alert("There was an error updating your document. Please review your changes and try again.");                 // 55
        break;                                                                                                         // 56
      default:                                                                                                         // 57
        return "Unknown Error";                                                                                        // 58
        break;                                                                                                         // 59
    }                                                                                                                  // 60
                                                                                                                       // 61
  },                                                                                                                   // 62
  'parse': function (data) {                                                                                           // 63
    var newObject = false;                                                                                             // 64
                                                                                                                       // 65
    try {                                                                                                              // 66
      newObject = JSON.parse(data);                                                                                    // 67
    }                                                                                                                  // 68
                                                                                                                       // 69
    catch (error) {                                                                                                    // 70
      Mongol.error("json.parse");                                                                                      // 71
    }                                                                                                                  // 72
                                                                                                                       // 73
    return newObject;                                                                                                  // 74
                                                                                                                       // 75
  },                                                                                                                   // 76
  'setSubscriptionKeys': function () {                                                                                 // 77
                                                                                                                       // 78
      var subscriptions  = Meteor.default_connection._subscriptions,                                                   // 79
          subKeys        = Object.keys(subscriptions);                                                                 // 80
                                                                                                                       // 81
          Session.set("MeteorToys_PubSub", subKeys)                                                                    // 82
                                                                                                                       // 83
  },                                                                                                                   // 84
  'detectCollections': function () {                                                                                   // 85
    if (Session.get('Mongol') === undefined) {                                                                         // 86
        // Note: this returns the actual mongo collection name                                                         // 87
        var collections = _.map(Mongo.Collection.getAll(), function (collection) {                                     // 88
        return collection.name;                                                                                        // 89
      });                                                                                                              // 90
                                                                                                                       // 91
      var defaults = {                                                                                                 // 92
        'collections': collections,                                                                                    // 93
      };                                                                                                               // 94
                                                                                                                       // 95
      Session.set("Mongol", defaults);                                                                                 // 96
                                                                                                                       // 97
    }                                                                                                                  // 98
  },                                                                                                                   // 99
  'hideCollection': function (collectionName) {                                                                        // 100
                                                                                                                       // 101
    var MongolConfig = Session.get("Mongol") || {},                                                                    // 102
        collections  = MongolConfig.collections || {};                                                                 // 103
                                                                                                                       // 104
    collections = _.without(collections, collectionName);                                                              // 105
    MongolConfig.collections = collections;                                                                            // 106
    Session.set("Mongol", MongolConfig);                                                                               // 107
                                                                                                                       // 108
  },                                                                                                                   // 109
  'showCollection': function (collectionName) {                                                                        // 110
                                                                                                                       // 111
    // In case a collection does not get detected, like a local one                                                    // 112
    var MongolConfig = Session.get("Mongol") || {},                                                                    // 113
        collections  = MongolConfig.collections || {};                                                                 // 114
                                                                                                                       // 115
    collections.push(collectionName);                                                                                  // 116
                                                                                                                       // 117
    Session.set("Mongol", MongolConfig);                                                                               // 118
                                                                                                                       // 119
  },                                                                                                                   // 120
  'Collection': function (collectionName) {                                                                            // 121
                                                                                                                       // 122
                                                                                                                       // 123
    // Go through a variety of means of trying to return the correct collection                                        // 124
    return Mongo.Collection.get(collectionName)                                                                        // 125
      // This should automatically match all collections by default                                                    // 126
      // including namespaced collections                                                                              // 127
                                                                                                                       // 128
    || ((Meteor.isServer) ? eval(collectionName) : Meteor._get.apply(null,[window].concat(collectionName.split('.')))) // 129
    // For user defined collection names                                                                               // 130
    // in the form of Meteor's Mongo.Collection names as strings                                                       // 131
                                                                                                                       // 132
    || ((Meteor.isServer) ? eval(firstToUpper(collectionName)) : Meteor._get.apply(null,[window].concat(firstToUpper(collectionName).split('.'))))
    // For user defined collections where the user has typical upper-case collection names                             // 134
    // but they've put actual mongodb collection names into the Mongol config instead of Meteor's Mongo.Collection names as strings
                                                                                                                       // 136
    || null;                                                                                                           // 137
    // If the user has gone for unconventional casing of collection names,                                             // 138
    // they'll have to get them right (i.e. Meteor's Mongo.Collection names as string) in the Mongol config manually   // 139
                                                                                                                       // 140
                                                                                                                       // 141
                                                                                                                       // 142
  }                                                                                                                    // 143
}                                                                                                                      // 144
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_header/template.header.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("Mongol_header");                                                                                 // 2
Template["Mongol_header"] = new Template("Template.Mongol_header", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return {                                                                                                           // 6
      name: Spacebars.call("mongol_618")                                                                               // 7
    };                                                                                                                 // 8
  }, function() {                                                                                                      // 9
    return Spacebars.include(view.lookupTemplate("Mongol_Component"), function() {                                     // 10
      return [ "\n\n    ", HTML.STRONG("Mongol"), HTML.BR(), "\n    ", HTML.DIV({                                      // 11
        "class": "Mongol_contentView"                                                                                  // 12
      }, "\n    ", HTML.Comment("  "), "\n      ", HTML.DIV({                                                          // 13
        "class": "Mongol_docMenu",                                                                                     // 14
        style: "text-indent: 8px"                                                                                      // 15
      }, "\n        by Meteor Toys\n      "), "\n      ", HTML.DIV({                                                   // 16
        "class": "Mongol_documentViewer "                                                                              // 17
      }, "\n\n        Created by ", HTML.A({                                                                           // 18
        href: "http://maxsavin.com"                                                                                    // 19
      }, HTML.U("Max Savin")), ".", HTML.BR(), "\n        Code ", HTML.CharRef({                                       // 20
        html: "&amp;",                                                                                                 // 21
        str: "&"                                                                                                       // 22
      }), " Docs at ", HTML.A({                                                                                        // 23
        href: "https://github.com/msavin/Mongol"                                                                       // 24
      }, HTML.U("GitHub")), ".", HTML.BR(), "\n        Issued under ", HTML.A({                                        // 25
        href: "https://github.com/msavin/Mongol/blob/master/README.md"                                                 // 26
      }, HTML.U(" MIT License")), ".", HTML.BR(), "\n        ", HTML.BR(), "\n\n        Mongol is part of Meteor Toys.", HTML.BR(), "\n        If you like Mongol, you'll ", HTML.BR(), "\n        probably like the others. ", HTML.BR(), "\n        See them at ", HTML.U(HTML.A({
        href: "http://meteor.toys"                                                                                     // 28
      }, "Meteor.Toys")), "\n      "), "\n    ", HTML.Comment("  "), "\n    "), "\n\n  " ];                            // 29
    });                                                                                                                // 30
  });                                                                                                                  // 31
}));                                                                                                                   // 32
                                                                                                                       // 33
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_header/header.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_account/template.account.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("Mongol_account");                                                                                // 2
Template["Mongol_account"] = new Template("Template.Mongol_account", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return {                                                                                                           // 6
      name: Spacebars.call("account_618")                                                                              // 7
    };                                                                                                                 // 8
  }, function() {                                                                                                      // 9
    return Spacebars.include(view.lookupTemplate("Mongol_Component"), function() {                                     // 10
      return [ "\n\n			", HTML.Comment(" Display sign in status "), "\n			", Blaze.If(function() {                     // 11
        return Spacebars.call(view.lookup("currentUser"));                                                             // 12
      }, function() {                                                                                                  // 13
        return [ "\n				", HTML.DIV({                                                                                  // 14
          "class": "Mongol_account_active"                                                                             // 15
        }), "\n			" ];                                                                                                 // 16
      }, function() {                                                                                                  // 17
        return [ "\n				", HTML.DIV({                                                                                  // 18
          "class": "Mongol_account_inactive"                                                                           // 19
        }), "\n			" ];                                                                                                 // 20
      }), "\n\n			", HTML.Comment(" Row Name "), "\n			Account\n     \n        ", HTML.DIV({                           // 21
        "class": "Mongol_contentView"                                                                                  // 22
      }, "\n\n			", HTML.Comment(" Document Viewer "), "\n			", Blaze.If(function() {                                  // 23
        return Spacebars.call(view.lookup("currentUser"));                                                             // 24
      }, function() {                                                                                                  // 25
        return [ "\n				", Spacebars.include(view.lookupTemplate("Mongol_accountViewer")), "\n			" ];                  // 26
      }, function() {                                                                                                  // 27
        return [ "\n				", Spacebars.include(view.lookupTemplate("Mongol_accountViewer_notSignedIn")), "\n			" ];      // 28
      }), "\n\n		"), "\n\n	" ];                                                                                        // 29
    });                                                                                                                // 30
  });                                                                                                                  // 31
}));                                                                                                                   // 32
                                                                                                                       // 33
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_account/account.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_account/template.accountViewer.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("Mongol_accountViewer");                                                                          // 2
Template["Mongol_accountViewer"] = new Template("Template.Mongol_accountViewer", (function() {                         // 3
  var view = this;                                                                                                     // 4
  return [ Spacebars.include(view.lookupTemplate("Mongol_docControls")), "\n\n	", HTML.DIV({                           // 5
    "class": function() {                                                                                              // 6
      return [ "Mongol_documentViewer ", Spacebars.mustache(view.lookup("editStyle")) ];                               // 7
    },                                                                                                                 // 8
    id: "MongolDoc_account_618",                                                                                       // 9
    contenteditable: function() {                                                                                      // 10
      return Spacebars.mustache(view.lookup("editContent"));                                                           // 11
    }                                                                                                                  // 12
  }, "	\n		", HTML.PRE(Blaze.View("lookup:accountData", function() {                                                   // 13
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("accountData")));                                          // 14
  })), "\n	") ];                                                                                                       // 15
}));                                                                                                                   // 16
                                                                                                                       // 17
Template.__checkName("Mongol_accountViewer_notSignedIn");                                                              // 18
Template["Mongol_accountViewer_notSignedIn"] = new Template("Template.Mongol_accountViewer_notSignedIn", (function() { // 19
  var view = this;                                                                                                     // 20
  return HTML.Raw('<div class="Mongol_docMenu">\n			<div class="Mongol_docBar1" style="text-indent: 8px">\n				Not Signed In\n			</div>\n		</div>\n	<div class="Mongol_documentViewer">	\n		<!-- Nothing -->\n	</div>');
}));                                                                                                                   // 22
                                                                                                                       // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_account/accountViewer.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.Mongol_accountViewer.helpers({                                                                                // 1
  accountData: function () {                                                                                           // 2
                                                                                                                       // 3
    var docCurrent  = Meteor.user(),                                                                                   // 4
        json_output = JSON.stringify(docCurrent, null, 2),                                                             // 5
        colorized   = Mongol.colorize(json_output);                                                                    // 6
    return colorized;                                                                                                  // 7
                                                                                                                       // 8
  },                                                                                                                   // 9
  editContent: function () {                                                                                           // 10
                                                                                                                       // 11
    var editMode = Session.get("Mongol_editMode");                                                                     // 12
                                                                                                                       // 13
    if (editMode) {                                                                                                    // 14
      return "true";                                                                                                   // 15
    }                                                                                                                  // 16
                                                                                                                       // 17
  },                                                                                                                   // 18
  editStyle: function () {                                                                                             // 19
                                                                                                                       // 20
    var editMode = Session.get("Mongol_editMode");                                                                     // 21
                                                                                                                       // 22
    if (editMode) {                                                                                                    // 23
      return "Mongol_editable";                                                                                        // 24
    }                                                                                                                  // 25
                                                                                                                       // 26
  },                                                                                                                   // 27
  usercode: function () {                                                                                              // 28
                                                                                                                       // 29
    return Meteor.userId();                                                                                            // 30
                                                                                                                       // 31
  },                                                                                                                   // 32
});                                                                                                                    // 33
                                                                                                                       // 34
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_collection_notFound/template.notFound.js                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("Mongol_collection_notFound");                                                                    // 2
Template["Mongol_collection_notFound"] = new Template("Template.Mongol_collection_notFound", (function() {             // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return {                                                                                                           // 6
      name: Spacebars.call("no_collections")                                                                           // 7
    };                                                                                                                 // 8
  }, function() {                                                                                                      // 9
    return Spacebars.include(view.lookupTemplate("Mongol_Component"), function() {                                     // 10
      return [ "\n\n    No Collections", HTML.BR(), "\n    ", HTML.DIV({                                               // 11
        "class": "Mongol_contentView"                                                                                  // 12
      }, "\n    ", HTML.Comment("  "), "\n      ", HTML.DIV({                                                          // 13
        "class": "Mongol_docMenu",                                                                                     // 14
        style: "text-indent: 8px"                                                                                      // 15
      }, "\n        None Detected\n      "), "\n      ", HTML.DIV({                                                    // 16
        "class": "Mongol_documentViewer "                                                                              // 17
      }, "\n\n        If you think this is an error,", HTML.BR(), "\n        please report it on ", HTML.A({           // 18
        href: "https://github.com/msavin/Mongol",                                                                      // 19
        style: "color: #cc0000"                                                                                        // 20
      }, "GitHub"), ".\n        \n      "), "\n    ", HTML.Comment("  "), "\n    "), "\n\n  " ];                       // 21
    });                                                                                                                // 22
  });                                                                                                                  // 23
}));                                                                                                                   // 24
                                                                                                                       // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_collection_notFound/notFound.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_collection/template.collections.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("Mongol_collection");                                                                             // 2
Template["Mongol_collection"] = new Template("Template.Mongol_collection", (function() {                               // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return {                                                                                                           // 6
      name: Spacebars.call(view.lookup("."))                                                                           // 7
    };                                                                                                                 // 8
  }, function() {                                                                                                      // 9
    return Spacebars.include(view.lookupTemplate("Mongol_Component"), function() {                                     // 10
      return [ "\n	\n		", HTML.Comment(" Collection Count "), "\n		", HTML.DIV({                                       // 11
        "class": "Mongol_counter"                                                                                      // 12
      }, "\n			", Blaze.If(function() {                                                                                // 13
        return Spacebars.call(view.lookup("collectionCount"));                                                         // 14
      }, function() {                                                                                                  // 15
        return [ "\n			", HTML.SPAN({                                                                                  // 16
          "class": "MongolHide"                                                                                        // 17
        }, Blaze.View("lookup:currentPosition", function() {                                                           // 18
          return Spacebars.mustache(view.lookup("currentPosition"));                                                   // 19
        }), "/") ];                                                                                                    // 20
      }), Blaze.View("lookup:collectionCount", function() {                                                            // 21
        return Spacebars.mustache(view.lookup("collectionCount"));                                                     // 22
      }), "\n		"), "\n\n		", HTML.Comment(" Collection Name "), "\n		", HTML.DIV({                                     // 23
        "class": "Mongol_row_name"                                                                                     // 24
      }, Blaze.View("lookup:.", function() {                                                                           // 25
        return Spacebars.mustache(view.lookup("."));                                                                   // 26
      })), "\n    	    \n		", HTML.Comment(" Document Viewer "), "\n		", HTML.DIV({                                    // 27
        "class": "Mongol_contentView"                                                                                  // 28
      }, "\n			", Spacebars.include(view.lookupTemplate("Mongol_docViewer")), "\n		"), "\n		\n	" ];                    // 29
    });                                                                                                                // 30
  });                                                                                                                  // 31
}));                                                                                                                   // 32
                                                                                                                       // 33
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_collection/collections.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.Mongol_collection.events({                                                                                    // 1
  'click': function () {                                                                                               // 2
                                                                                                                       // 3
    var targetCollection = String(this),                                                                               // 4
        sessionKey       = "Mongol_" + targetCollection;                                                               // 5
                                                                                                                       // 6
    if (Session.equals("Mongol_currentCollection", targetCollection)) {                                                // 7
                                                                                                                       // 8
      // do nothing                                                                                                    // 9
                                                                                                                       // 10
    } else {                                                                                                           // 11
                                                                                                                       // 12
      // If the collection doesn't have an index key set,                                                              // 13
      // start it from the first document                                                                              // 14
                                                                                                                       // 15
      if (!Session.get(sessionKey)) {                                                                                  // 16
        Session.set(sessionKey, 0);                                                                                    // 17
      }                                                                                                                // 18
                                                                                                                       // 19
    }                                                                                                                  // 20
                                                                                                                       // 21
  },                                                                                                                   // 22
});                                                                                                                    // 23
                                                                                                                       // 24
Template.Mongol_collection.helpers({                                                                                   // 25
  collectionCount: function () {                                                                                       // 26
                                                                                                                       // 27
    var collectionName = String(this);                                                                                 // 28
    var collectionVar = Mongol.Collection(collectionName);                                                             // 29
                                                                                                                       // 30
    var count = collectionVar && collectionVar.find().count() || 0;                                                    // 31
                                                                                                                       // 32
    return count;                                                                                                      // 33
                                                                                                                       // 34
  },                                                                                                                   // 35
  currentPosition: function () {                                                                                       // 36
                                                                                                                       // 37
    var targetCollection = String(this);                                                                               // 38
    var sessionKey = "Mongol_" + targetCollection;                                                                     // 39
                                                                                                                       // 40
    var current = Session.get(sessionKey);                                                                             // 41
    var count = current + 1;                                                                                           // 42
                                                                                                                       // 43
    return count;                                                                                                      // 44
                                                                                                                       // 45
  }                                                                                                                    // 46
});                                                                                                                    // 47
                                                                                                                       // 48
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/doc_editor/template.docViewer.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("Mongol_docViewer");                                                                              // 2
Template["Mongol_docViewer"] = new Template("Template.Mongol_docViewer", (function() {                                 // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("notEmpty"));                                                                    // 6
  }, function() {                                                                                                      // 7
    return [ "\n    ", Spacebars.include(view.lookupTemplate("Mongol_docControls")), "\n    ", Spacebars.With(function() {
      return Spacebars.call(view.lookup("activeDocument"));                                                            // 9
    }, function() {                                                                                                    // 10
      return [ "\n      ", Blaze.If(function() {                                                                       // 11
        return Spacebars.call(view.lookup("editStyle"));                                                               // 12
      }, function() {                                                                                                  // 13
        return [ "\n        ", HTML.DIV({                                                                              // 14
          "class": function() {                                                                                        // 15
            return [ "Mongol_documentViewer ", Spacebars.mustache(view.lookup("editStyle")) ];                         // 16
          },                                                                                                           // 17
          id: function() {                                                                                             // 18
            return [ "MongolDoc_", Spacebars.mustache(view.lookup("..")) ];                                            // 19
          },                                                                                                           // 20
          contenteditable: function() {                                                                                // 21
            return Spacebars.mustache(view.lookup("editContent"));                                                     // 22
          }                                                                                                            // 23
        }, "  \n          ", HTML.PRE(Blaze.View("lookup:documentJSON", function() {                                   // 24
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("documentJSON")));                                   // 25
        })), "\n        "), "\n      " ];                                                                              // 26
      }, function() {                                                                                                  // 27
        return [ "\n        ", HTML.DIV({                                                                              // 28
          "class": function() {                                                                                        // 29
            return [ "Mongol_documentViewer ", Spacebars.mustache(view.lookup("editStyle")) ];                         // 30
          },                                                                                                           // 31
          id: function() {                                                                                             // 32
            return [ "MongolDoc_", Spacebars.mustache(view.lookup("..")) ];                                            // 33
          },                                                                                                           // 34
          contenteditable: function() {                                                                                // 35
            return Spacebars.mustache(view.lookup("editContent"));                                                     // 36
          }                                                                                                            // 37
        }, "  \n          ", Blaze.If(function() {                                                                     // 38
          return Spacebars.call(view.lookup("noInlineEditing"));                                                       // 39
        }, function() {                                                                                                // 40
          return [ "\n            ", HTML.PRE(Blaze.View("lookup:documentJSON", function() {                           // 41
            return Spacebars.makeRaw(Spacebars.mustache(view.lookup("documentJSON")));                                 // 42
          })), "\n          " ];                                                                                       // 43
        }, function() {                                                                                                // 44
          return [ "\n            ", Blaze._TemplateWith(function() {                                                  // 45
            return {                                                                                                   // 46
              document: Spacebars.call(view.lookup(".")),                                                              // 47
              collection: Spacebars.call(view.lookup(".."))                                                            // 48
            };                                                                                                         // 49
          }, function() {                                                                                              // 50
            return Spacebars.include(view.lookupTemplate("editableJSON"));                                             // 51
          }), "\n          " ];                                                                                        // 52
        }), "\n        "), "\n      " ];                                                                               // 53
      }), "\n    " ];                                                                                                  // 54
    }, function() {                                                                                                    // 55
      return [ "\n      ", HTML.DIV({                                                                                  // 56
        "class": "Mongol_documentViewer",                                                                              // 57
        id: function() {                                                                                               // 58
          return [ "MongolDoc_", Spacebars.mustache(view.lookup(".")) ];                                               // 59
        }                                                                                                              // 60
      }, "  \n        ", HTML.PRE("No document found"), "\n      "), "\n    " ];                                       // 61
    }), "\n  " ];                                                                                                      // 62
  }, function() {                                                                                                      // 63
    return [ "\n    ", Spacebars.include(view.lookupTemplate("Mongol_docInsert")), "\n  " ];                           // 64
  });                                                                                                                  // 65
}));                                                                                                                   // 66
                                                                                                                       // 67
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/doc_editor/docViewer.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.Mongol_docViewer.helpers({                                                                                    // 1
  activeDocument: function () {                                                                                        // 2
    var collectionName = String(this);                                                                                 // 3
    var currentCollection = Mongol.Collection(collectionName);                                                         // 4
    var documents = currentCollection.find({}, {transform: null}).fetch();                                             // 5
    var sessionKey = "Mongol_" + String(this);                                                                         // 6
    var docNumber = Session.get(sessionKey);                                                                           // 7
    var docCurrent = documents[docNumber];                                                                             // 8
    return docCurrent;                                                                                                 // 9
  },                                                                                                                   // 10
  documentJSON: function () {                                                                                          // 11
    var docCurrent = this;                                                                                             // 12
    var json_output = JSON.stringify(docCurrent, null, 2), colorize;                                                   // 13
                                                                                                                       // 14
    if (!(json_output === undefined)) {                                                                                // 15
      colorize = Mongol.colorize(json_output);                                                                         // 16
    } else {                                                                                                           // 17
      colorize = json_output;                                                                                          // 18
    }                                                                                                                  // 19
                                                                                                                       // 20
    return colorize;                                                                                                   // 21
                                                                                                                       // 22
  },                                                                                                                   // 23
  editContent: function () {                                                                                           // 24
                                                                                                                       // 25
    var editMode = Session.get("Mongol_editMode");                                                                     // 26
                                                                                                                       // 27
    if (editMode) {                                                                                                    // 28
      return "true";                                                                                                   // 29
    }                                                                                                                  // 30
                                                                                                                       // 31
  },                                                                                                                   // 32
  editStyle: function () {                                                                                             // 33
                                                                                                                       // 34
    var editMode = Session.get("Mongol_editMode");                                                                     // 35
                                                                                                                       // 36
    if (editMode) {                                                                                                    // 37
      return "Mongol_editable";                                                                                        // 38
    }                                                                                                                  // 39
                                                                                                                       // 40
  },                                                                                                                   // 41
  notEmpty: function () {                                                                                              // 42
    var documentCount = Mongol.Collection(String(this)) && Mongol.Collection(String(this)).find().count() || 0;        // 43
    if (documentCount >= 1) {                                                                                          // 44
      return true;                                                                                                     // 45
    }                                                                                                                  // 46
  },                                                                                                                   // 47
  noInlineEditing: function () {                                                                                       // 48
    return Session.get('Mongol_noInlineEditing');                                                                      // 49
  }                                                                                                                    // 50
});                                                                                                                    // 51
                                                                                                                       // 52
// Will possibly be used in augmented document udpate UI                                                               // 53
/*Template.Mongol_docViewer.events({                                                                                   // 54
                                                                                                                       // 55
  'click .Mongol_string' : function (evt,tmpl) {                                                                       // 56
    var field = $(evt.target).prevAll(".Mongol_key:first").text().slice(1,-2);                                         // 57
    Session.set('Mongol_inlineEdit',true);                                                                             // 58
    Tracker.flush();                                                                                                   // 59
    // Do something to trigger the editable text element                                                               // 60
  }                                                                                                                    // 61
                                                                                                                       // 62
});*/                                                                                                                  // 63
                                                                                                                       // 64
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/doc_insert/template.docInsert.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("Mongol_docInsert");                                                                              // 2
Template["Mongol_docInsert"] = new Template("Template.Mongol_docInsert", (function() {                                 // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw('<div class="Mongol_docMenu">\n		<div class="Mongol_docMenu_insert" style="float: right">Insert</div>\n		&nbsp;Create the First Document\n	</div>\n\n	'), HTML.DIV({
    "class": "Mongol_documentViewer ",                                                                                 // 6
    id: function() {                                                                                                   // 7
      return [ "Mongol_", Spacebars.mustache(view.lookup(".")), "_newEntry" ];                                         // 8
    },                                                                                                                 // 9
    tabindex: "-1",                                                                                                    // 10
    contenteditable: "true"                                                                                            // 11
  }, "	\n", HTML.Raw("<pre>{\n\n}</pre>"), "\n\n	") ];                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/doc_insert/docInsert.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.Mongol_docInsert.events({                                                                                     // 1
  'click .Mongol_docMenu_insert': function () {                                                                        // 2
                                                                                                                       // 3
    var CollectionName = String(this),                                                                                 // 4
        newDataID      = "Mongol_" + String(this) + "_newEntry",                                                       // 5
        newData        = document.getElementById(newDataID).textContent,                                               // 6
        newObject      = Mongol.parse(newData);                                                                        // 7
                                                                                                                       // 8
    if (newObject) {                                                                                                   // 9
      Meteor.call('Mongol_insert', CollectionName, newObject, function (error, result) {                               // 10
        if (!error) {                                                                                                  // 11
          sessionKey = "Mongol_" + CollectionName;                                                                     // 12
          Session.set(sessionKey, 0);                                                                                  // 13
        } else {                                                                                                       // 14
          Mongol.error("insert");                                                                                      // 15
        }                                                                                                              // 16
      });                                                                                                              // 17
    }                                                                                                                  // 18
                                                                                                                       // 19
  }                                                                                                                    // 20
});                                                                                                                    // 21
                                                                                                                       // 22
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/_component/template.component.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("Mongol_Component");                                                                              // 2
Template["Mongol_Component"] = new Template("Template.Mongol_Component", (function() {                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": function() {                                                                                              // 6
      return [ "Mongol_row ", Spacebars.mustache(view.lookup("active")) ];                                             // 7
    },                                                                                                                 // 8
    id: function() {                                                                                                   // 9
      return [ "Mongol_c", Spacebars.mustache(view.lookup("name")) ];                                                  // 10
    }                                                                                                                  // 11
  }, "\n		", Blaze._InOuterTemplateScope(view, function() {                                                            // 12
    return Spacebars.include(function() {                                                                              // 13
      return Spacebars.call(view.templateContentBlock);                                                                // 14
    });                                                                                                                // 15
  }), "\n	");                                                                                                          // 16
}));                                                                                                                   // 17
                                                                                                                       // 18
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/_component/component.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.Mongol_Component.events({                                                                                     // 1
	'click .Mongol_row': function () {                                                                                    // 2
		if (Session.equals("Mongol_currentCollection", this.name)) {                                                         // 3
		  Session.set("Mongol_currentCollection", null);                                                                     // 4
		} else {                                                                                                             // 5
		  Session.set("Mongol_currentCollection", this.name);                                                                // 6
		}                                                                                                                    // 7
                                                                                                                       // 8
		Session.set("Mongol_editMode", false);                                                                               // 9
	},                                                                                                                    // 10
	'click .Mongol_contentView': function (e) {                                                                           // 11
		e.stopPropagation();                                                                                                 // 12
  	}                                                                                                                   // 13
});                                                                                                                    // 14
                                                                                                                       // 15
Template.Mongol_Component.helpers({                                                                                    // 16
  active: function () {                                                                                                // 17
    if (Session.equals("Mongol_currentCollection", this.name)) {                                                       // 18
      return "Mongol_row_expand";                                                                                      // 19
    }                                                                                                                  // 20
  }                                                                                                                    // 21
});                                                                                                                    // 22
                                                                                                                       // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_subscriptions/template.subscriptions.js                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("Mongol_subscriptions");                                                                          // 2
Template["Mongol_subscriptions"] = new Template("Template.Mongol_subscriptions", (function() {                         // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return {                                                                                                           // 6
      name: Spacebars.call("subscriptions_618")                                                                        // 7
    };                                                                                                                 // 8
  }, function() {                                                                                                      // 9
    return Spacebars.include(view.lookupTemplate("Mongol_Component"), function() {                                     // 10
      return [ "\n\n		\n        ", HTML.DIV({                                                                          // 11
        "class": "Mongol_toggle_selected_collection"                                                                   // 12
      }, "\n			", HTML.Comment(" Name "), "\n			Subscriptions\n        "), "\n\n		", HTML.DIV({                        // 13
        "class": "Mongol_contentView"                                                                                  // 14
      }, "\n		", HTML.DIV({                                                                                            // 15
        "class": "Mongol_docMenu",                                                                                     // 16
        style: "text-indent: 8px"                                                                                      // 17
      }, "\n			", Blaze.View("lookup:subType", function() {                                                            // 18
        return Spacebars.mustache(view.lookup("subType"));                                                             // 19
      }), "\n		"), "\n		", HTML.Comment(" Document Viewer "), "\n		", HTML.DIV({                                       // 20
        "class": "Mongol_documentViewer "                                                                              // 21
      }, "\n			", Blaze.Each(function() {                                                                              // 22
        return Spacebars.call(view.lookup("subscription"));                                                            // 23
      }, function() {                                                                                                  // 24
        return [ "\n				", HTML.DIV({                                                                                  // 25
          "class": "Mongol_subscription"                                                                               // 26
        }, "\n					", HTML.DIV({                                                                                       // 27
          "class": "Mongol_subscription_toggle"                                                                        // 28
        }, HTML.CharRef({                                                                                              // 29
          html: "&times;",                                                                                             // 30
          str: "×"                                                                                                     // 31
        })), "\n					", HTML.DIV({                                                                                     // 32
          "class": "Mongol_subscription_name"                                                                          // 33
        }, Blaze.View("lookup:name", function() {                                                                      // 34
          return Spacebars.mustache(view.lookup("name"));                                                              // 35
        })), "\n					Params: ", Blaze.View("lookup:params", function() {                                               // 36
          return Spacebars.mustache(view.lookup("params"));                                                            // 37
        }), " \n				"), "\n			" ];                                                                                     // 38
      }, function() {                                                                                                  // 39
        return "\n				No subscriptions available\n			";                                                                // 40
      }), "\n		"), "\n		", HTML.Comment("  "), "\n	"), "\n		\n\n	" ];                                                  // 41
    });                                                                                                                // 42
  });                                                                                                                  // 43
}));                                                                                                                   // 44
                                                                                                                       // 45
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/row_subscriptions/subscriptions.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.Mongol_subscriptions.helpers({                                                                                // 1
  subscription: function () {                                                                                          // 2
                                                                                                                       // 3
    var subscriptionIDs = Session.get("MeteorToys_PubSub")                                                             // 4
    return subscriptionIDs;                                                                                            // 5
                                                                                                                       // 6
  },                                                                                                                   // 7
  name: function () {                                                                                                  // 8
    var subName = Meteor.default_connection._subscriptions[this] && Meteor.default_connection._subscriptions[this].name;
    return subName;                                                                                                    // 10
  },                                                                                                                   // 11
  params: function () {                                                                                                // 12
    var p = Meteor.default_connection._subscriptions[this] && Meteor.default_connection._subscriptions[this].params    // 13
                                                                                                                       // 14
    if (p && p.length > 0) {                                                                                           // 15
      return p;                                                                                                        // 16
    } else {                                                                                                           // 17
      return "none";                                                                                                   // 18
    }                                                                                                                  // 19
  },                                                                                                                   // 20
  subType: function () {                                                                                               // 21
                                                                                                                       // 22
    if (!Object.observe) {                                                                                             // 23
      return "Polling every 3 seconds"                                                                                 // 24
    } else {                                                                                                           // 25
      return "Observing Changes";                                                                                      // 26
    }                                                                                                                  // 27
                                                                                                                       // 28
  }                                                                                                                    // 29
});                                                                                                                    // 30
                                                                                                                       // 31
                                                                                                                       // 32
Template.Mongol_subscriptions.events({                                                                                 // 33
  'click .Mongol_subscription_toggle': function () {                                                                   // 34
    Meteor.default_connection._subscriptions[this].stop()                                                              // 35
  }                                                                                                                    // 36
});                                                                                                                    // 37
                                                                                                                       // 38
                                                                                                                       // 39
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/template.main.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.body.addContent((function() {                                                                                 // 2
  var view = this;                                                                                                     // 3
  return Spacebars.include(view.lookupTemplate("Mongol"));                                                             // 4
}));                                                                                                                   // 5
Meteor.startup(Template.body.renderToDocument);                                                                        // 6
                                                                                                                       // 7
Template.__checkName("Mongol");                                                                                        // 8
Template["Mongol"] = new Template("Template.Mongol", (function() {                                                     // 9
  var view = this;                                                                                                     // 10
  return Blaze.If(function() {                                                                                         // 11
    return Spacebars.call(view.lookup("MeteorToys"));                                                                  // 12
  }, function() {                                                                                                      // 13
    return [ "\n		\n		", HTML.DIV({                                                                                    // 14
      id: "Mongol",                                                                                                    // 15
      "class": function() {                                                                                            // 16
        return [ Spacebars.mustache(view.lookup("active")), " MeteorToys" ];                                           // 17
      }                                                                                                                // 18
    }, "\n			\n			", Blaze.If(function() {                                                                             // 19
      return Spacebars.call(view.lookup("MeteorToys_Pro"));                                                            // 20
    }, function() {                                                                                                    // 21
      return [ "\n			\n				", Spacebars.include(view.lookupTemplate("Mongol_header_pro")), "\n				", Spacebars.include(view.lookupTemplate("Mongol_account")), "\n\n				", Blaze.Each(function() {
        return Spacebars.call(view.lookup("Mongol_collections"));                                                      // 23
      }, function() {                                                                                                  // 24
        return [ "\n					", Spacebars.include(view.lookupTemplate("Mongol_collection")), "\n				" ];                   // 25
      }, function() {                                                                                                  // 26
        return [ "\n					", Spacebars.include(view.lookupTemplate("Mongol_collection_notFound")), "\n				" ];          // 27
      }), "\n\n				", Spacebars.include(view.lookupTemplate("Mongol_trash")), "\n\n			" ];                             // 28
    }, function() {                                                                                                    // 29
      return [ "\n\n				", Spacebars.include(view.lookupTemplate("Mongol_header")), "\n				", Spacebars.include(view.lookupTemplate("Mongol_account")), "\n				", Spacebars.include(view.lookupTemplate("Mongol_subscriptions")), "\n\n				", Blaze.Each(function() {
        return Spacebars.call(view.lookup("Mongol_collections"));                                                      // 31
      }, function() {                                                                                                  // 32
        return [ "\n					", Spacebars.include(view.lookupTemplate("Mongol_collection")), "\n				" ];                   // 33
      }, function() {                                                                                                  // 34
        return [ "\n					", Spacebars.include(view.lookupTemplate("Mongol_collection_notFound")), "\n				" ];          // 35
      }), "\n\n			" ];                                                                                                 // 36
    }), "\n\n		"), "\n		\n	" ];                                                                                        // 37
  });                                                                                                                  // 38
}));                                                                                                                   // 39
                                                                                                                       // 40
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/main.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function() {                                                                                            // 1
                                                                                                                       // 2
  // Detect collections                                                                                                // 3
  Mongol.detectCollections();                                                                                          // 4
                                                                                                                       // 5
  // Hide Meteor Toys collections                                                                                      // 6
  Mongol.hideCollection("MeteorToys_Impersonate");                                                                     // 7
  Mongol.hideCollection("MeteorToys_JetSetter");                                                                       // 8
  Mongol.hideCollection("MeteorToys_Mongol");                                                                          // 9
                                                                                                                       // 10
  // For use outside of Mongol package scope:                                                                          // 11
  // Package["msavin:mongol"].Mongol.hideCollection("mongoName");                                                      // 12
  // Package["msavin:mongol"].Mongol.showCollection("localCollection");                                                // 13
                                                                                                                       // 14
});                                                                                                                    // 15
                                                                                                                       // 16
                                                                                                                       // 17
Template.Mongol.helpers({                                                                                              // 18
  Mongol_collections: function () {                                                                                    // 19
    // returns Mongo names of collections                                                                              // 20
    var    MongolConfig = Session.get("Mongol");                                                                       // 21
    return MongolConfig && _.without(MongolConfig.collections, null) || [];                                            // 22
  },                                                                                                                   // 23
  active: function () {                                                                                                // 24
    var MongolCollection = Session.get("Mongol_currentCollection");                                                    // 25
    if (MongolCollection) {                                                                                            // 26
      return "Mongol_expand";                                                                                          // 27
    }                                                                                                                  // 28
  }                                                                                                                    // 29
});                                                                                                                    // 30
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/doc_controls/template.docControls.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("Mongol_docControls");                                                                            // 2
Template["Mongol_docControls"] = new Template("Template.Mongol_docControls", (function() {                             // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("active"));                                                                      // 6
  }, function() {                                                                                                      // 7
    return [ "\n		\n		", HTML.DIV({                                                                                    // 8
      "class": function() {                                                                                            // 9
        return [ "Mongol_docMenu ", Spacebars.mustache(view.lookup("Mongol_docMenu_editing")) ];                       // 10
      }                                                                                                                // 11
    }, "\n			", Blaze.If(function() {                                                                                  // 12
      return Spacebars.call(view.lookup("account"));                                                                   // 13
    }, function() {                                                                                                    // 14
      return [ "\n				", HTML.DIV({                                                                                    // 15
        "class": "Mongol_docBar1"                                                                                      // 16
      }, "\n					", Blaze.If(function() {                                                                              // 17
        return Spacebars.call(view.lookup("editing"));                                                                 // 18
      }, function() {                                                                                                  // 19
        return [ "\n						", HTML.DIV({                                                                                // 20
          "class": "Mongol_edit_title"                                                                                 // 21
        }, "Update Document"), "\n						", HTML.DIV({                                                                  // 22
          "class": "Mongol_edit_save"                                                                                  // 23
        }, "Save"), "\n						", HTML.DIV({                                                                             // 24
          "class": "Mongol_edit_cancel"                                                                                // 25
        }, "Cancel"), "\n					" ];                                                                                     // 26
      }, function() {                                                                                                  // 27
        return [ "	\n						\n                        ", HTML.Comment("For some reason, the method in place does not work for this\n                        Commenting out for now"), "\n                        ", HTML.DIV({
          "class": "Mongol_m_edit Mongol_m_updateAccount"                                                              // 29
        }, "Update"), "\n						\n						", HTML.Comment(" &nbsp;Currently Read-Only "), "\n						", HTML.DIV({          // 30
          "class": "Mongol_m_signout"                                                                                  // 31
        }, "Sign Out"), "\n                        \n					" ];                                                         // 32
      }), "\n				"), "\n			" ];                                                                                        // 33
    }, function() {                                                                                                    // 34
      return [ "\n				", HTML.DIV({                                                                                    // 35
        "class": "Mongol_docBar1"                                                                                      // 36
      }, "\n					", Blaze.If(function() {                                                                              // 37
        return Spacebars.call(view.lookup("editing"));                                                                 // 38
      }, function() {                                                                                                  // 39
        return [ "\n						", HTML.DIV({                                                                                // 40
          "class": "Mongol_edit_title"                                                                                 // 41
        }, "Update Document"), "\n						", HTML.DIV({                                                                  // 42
          "class": "Mongol_edit_save"                                                                                  // 43
        }, "Save"), "\n						", HTML.DIV({                                                                             // 44
          "class": "Mongol_edit_cancel"                                                                                // 45
        }, "Cancel"), "\n					" ];                                                                                     // 46
      }, function() {                                                                                                  // 47
        return [ "\n						", HTML.DIV({                                                                                // 48
          "class": "Mongol_m_edit"                                                                                     // 49
        }, "Update"), "\n						", HTML.DIV({                                                                           // 50
          "class": "Mongol_m_new"                                                                                      // 51
        }, "Duplicate"), "\n						", HTML.DIV({                                                                        // 52
          "class": "Mongol_m_delete"                                                                                   // 53
        }, "Remove"), "\n						", HTML.DIV({                                                                           // 54
          "class": function() {                                                                                        // 55
            return [ Spacebars.mustache(view.lookup("disable")), " Mongol_m_right" ];                                  // 56
          }                                                                                                            // 57
        }, HTML.CharRef({                                                                                              // 58
          html: "&rsaquo;",                                                                                            // 59
          str: "›"                                                                                                     // 60
        })), "\n						", HTML.DIV({                                                                                    // 61
          "class": function() {                                                                                        // 62
            return [ Spacebars.mustache(view.lookup("disable")), " Mongol_m_left" ];                                   // 63
          }                                                                                                            // 64
        }, HTML.CharRef({                                                                                              // 65
          html: "&lsaquo;",                                                                                            // 66
          str: "‹"                                                                                                     // 67
        })), "\n					" ];                                                                                              // 68
      }), "\n				"), "\n			" ];                                                                                        // 69
    }), "	\n		"), "\n\n	" ];                                                                                           // 70
  }, function() {                                                                                                      // 71
    return [ "\n\n		", HTML.DIV({                                                                                      // 72
      "class": "Mongol_docMenu"                                                                                        // 73
    }, "\n			", HTML.DIV({                                                                                             // 74
      "class": "Mongol_docBar1"                                                                                        // 75
    }, "\n				", HTML.CharRef({                                                                                        // 76
      html: "&nbsp;",                                                                                                  // 77
      str: " "                                                                                                         // 78
    }), "\n			"), "\n		"), "\n\n	" ];                                                                                  // 79
  });                                                                                                                  // 80
}));                                                                                                                   // 81
                                                                                                                       // 82
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/msavin:mongol/client/doc_controls/docControls.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
// needs to be re-thought                                                                                              // 2
                                                                                                                       // 3
// Strip out functions in case documents have had methods added to them                                                // 4
                                                                                                                       // 5
Mongol.validateDocument = function (doc) {                                                                             // 6
  var validatedDoc = {};                                                                                               // 7
  _.each(doc, function (val, key) {                                                                                    // 8
    if (_.isFunction(val)) {                                                                                           // 9
      return;                                                                                                          // 10
    }                                                                                                                  // 11
    validatedDoc[key] = val;                                                                                           // 12
  });                                                                                                                  // 13
  return validatedDoc;                                                                                                 // 14
}                                                                                                                      // 15
                                                                                                                       // 16
Mongol.inlineEditingTimer = null;                                                                                      // 17
                                                                                                                       // 18
Mongol.resetInlineEditingTimer = function() {                                                                          // 19
  if (Mongol.inlineEditingTimer) {                                                                                     // 20
	Meteor.clearTimeout(Mongol.inlineEditingTimer);                                                                       // 21
  }                                                                                                                    // 22
  Session.set('Mongol_noInlineEditing', true);                                                                         // 23
  Mongol.inlineEditingTimer = Meteor.setTimeout(function () {                                                          // 24
    Session.set('Mongol_noInlineEditing', false);                                                                      // 25
  },300);                                                                                                              // 26
}                                                                                                                      // 27
                                                                                                                       // 28
Template.Mongol_docControls.events({                                                                                   // 29
  'click .Mongol_m_new': function() {                                                                                  // 30
                                                                                                                       // 31
    CollectionName    = Session.get("Mongol_currentCollection"),                                                       // 32
    DocumentPosition  = Session.get("Mongol_" + String(this)),                                                         // 33
    CurrentCollection = Mongol.Collection(CollectionName).find({}, {transform: null}).fetch(),                         // 34
    CollectionCount   = Mongol.Collection(CollectionName).find().count(),                                              // 35
    CurrentDocument   = CurrentCollection[DocumentPosition],                                                           // 36
    DocumentID        = CurrentDocument._id,                                                                           // 37
    sessionKey        = "Mongol_" + String(this),                                                                      // 38
    ValidatedCurrentDocument = Mongol.validateDocument(CurrentDocument);                                               // 39
                                                                                                                       // 40
    Meteor.call("Mongol_duplicate", CollectionName, ValidatedCurrentDocument._id, function(error, result) {            // 41
      if (!error) {                                                                                                    // 42
                                                                                                                       // 43
        if (Mongol.Collection(CollectionName).findOne(result)) {                                                       // 44
                                                                                                                       // 45
          // Get position of new document                                                                              // 46
          list  = Mongol.Collection(CollectionName).find({}, {transform: null}).fetch(),                               // 47
          docID = result,                                                                                              // 48
          currentDoc;                                                                                                  // 49
                                                                                                                       // 50
          docIndex = _.map(list, function(obj, index) {                                                                // 51
            if (obj._id === docID) {                                                                                   // 52
              currentDoc = index;                                                                                      // 53
            }                                                                                                          // 54
          })                                                                                                           // 55
                                                                                                                       // 56
          Session.set(sessionKey, Number(currentDoc));                                                                 // 57
        }                                                                                                              // 58
                                                                                                                       // 59
      } else {                                                                                                         // 60
        Mongol.error("duplicate");                                                                                     // 61
      }                                                                                                                // 62
    });                                                                                                                // 63
                                                                                                                       // 64
                                                                                                                       // 65
                                                                                                                       // 66
  },                                                                                                                   // 67
  'click .Mongol_m_edit': function() {                                                                                 // 68
    Session.set("Mongol_editMode", true);                                                                              // 69
  },                                                                                                                   // 70
  'click .Mongol_m_delete': function() {                                                                               // 71
                                                                                                                       // 72
    var CollectionName = Session.get("Mongol_currentCollection"),                                                      // 73
      sessionKey = "Mongol_" + String(this);                                                                           // 74
    DocumentPosition = Session.get(sessionKey),                                                                        // 75
      CurrentCollection = Mongol.Collection(CollectionName).find({}, {transform: null}).fetch(),                       // 76
      CollectionCount = Mongol.Collection(CollectionName).find().count();                                              // 77
                                                                                                                       // 78
    var CurrentDocument = CurrentCollection[DocumentPosition],                                                         // 79
      DocumentID = CurrentDocument._id;                                                                                // 80
                                                                                                                       // 81
                                                                                                                       // 82
                                                                                                                       // 83
    Meteor.call('Mongol_remove', CollectionName, DocumentID, function(error, result) {                                 // 84
                                                                                                                       // 85
      if (!error) {                                                                                                    // 86
        // Log the action                                                                                              // 87
        console.log("Removed " + DocumentID + " from " + CollectionName + ". Back-up below:");                         // 88
        console.log(CurrentDocument);                                                                                  // 89
                                                                                                                       // 90
        // Adjust the position                                                                                         // 91
        if (DocumentPosition >= CollectionCount - 1) {                                                                 // 92
          newPosition = DocumentPosition - 1;                                                                          // 93
          Session.set(sessionKey, newPosition);                                                                        // 94
        }                                                                                                              // 95
                                                                                                                       // 96
        if (Session.get(sessionKey) === -1) {                                                                          // 97
          Session.set(sessionKey, 0);                                                                                  // 98
        }                                                                                                              // 99
                                                                                                                       // 100
                                                                                                                       // 101
      } else {                                                                                                         // 102
        Mongol.error("remove");                                                                                        // 103
      }                                                                                                                // 104
                                                                                                                       // 105
    });                                                                                                                // 106
                                                                                                                       // 107
                                                                                                                       // 108
                                                                                                                       // 109
  },                                                                                                                   // 110
  'click .Mongol_m_right': function(e,t) {                                                                             // 111
    // Verify that the button is not disabled                                                                          // 112
    if (!t.$('.Mongol_m_right').hasClass('Mongol_m_disabled')) {                                                       // 113
                                                                                                                       // 114
      // Disable inline editing for 0.3s for quick flick to next doc                                                   // 115
      Mongol.resetInlineEditingTimer();                                                                                // 116
	                                                                                                                      // 117
      // Grab the key                                                                                                  // 118
                                                                                                                       // 119
      var sessionKey = "Mongol_" + String(this);                                                                       // 120
      var CurrentDocument = Session.get(sessionKey);                                                                   // 121
      var collectionName = String(this);                                                                               // 122
      var collectionVar = Mongol.Collection(collectionName);                                                           // 123
      var collectionCount = collectionVar.find().count() - 1;                                                          // 124
                                                                                                                       // 125
      if (CurrentDocument > collectionCount) {                                                                         // 126
        Session.set(sessionKey, 0)                                                                                     // 127
        return;                                                                                                        // 128
      }                                                                                                                // 129
                                                                                                                       // 130
      if (collectionCount === CurrentDocument) {                                                                       // 131
        // Go back to document 1                                                                                       // 132
        Session.set(sessionKey, 0);                                                                                    // 133
      } else {                                                                                                         // 134
        // Go to next document                                                                                         // 135
        var MongolDocNumber = Session.get(sessionKey) + 1;                                                             // 136
        Session.set(sessionKey, MongolDocNumber);                                                                      // 137
      }                                                                                                                // 138
                                                                                                                       // 139
    }                                                                                                                  // 140
  },                                                                                                                   // 141
  'click .Mongol_m_left': function(e,t) {                                                                              // 142
                                                                                                                       // 143
    // Verify that the button is not disabled                                                                          // 144
    if (!t.$('.Mongol_m_left').hasClass('Mongol_m_disabled')) {                                                        // 145
                                                                                                                       // 146
      // Disable inline editing for 0.3s for quick flick to next doc                                                   // 147
      Mongol.resetInlineEditingTimer();                                                                                // 148
                                                                                                                       // 149
      // Grab the key                                                                                                  // 150
      sessionKey = "Mongol_" + String(this);                                                                           // 151
      // Get the document count                                                                                        // 152
      var CurrentDocument = Session.get(sessionKey);                                                                   // 153
      var collectionName  = String(this);                                                                              // 154
      var collectionVar   = Mongol.Collection(collectionName);                                                         // 155
      var collectionCount = collectionVar.find().count() - 1;                                                          // 156
                                                                                                                       // 157
      if (CurrentDocument > collectionCount) {                                                                         // 158
        Session.set(sessionKey, collectionCount)                                                                       // 159
        return;                                                                                                        // 160
      }                                                                                                                // 161
                                                                                                                       // 162
      if (Session.get(sessionKey) === 0) {                                                                             // 163
                                                                                                                       // 164
                                                                                                                       // 165
        // Set the key to last                                                                                         // 166
        Session.set(sessionKey, collectionCount)                                                                       // 167
      } else {                                                                                                         // 168
        var MongolDocNumber = Session.get(sessionKey) - 1;                                                             // 169
        Session.set(sessionKey, MongolDocNumber);                                                                      // 170
      }                                                                                                                // 171
                                                                                                                       // 172
    }                                                                                                                  // 173
                                                                                                                       // 174
  },                                                                                                                   // 175
  'click .Mongol_edit_save': function() {                                                                              // 176
                                                                                                                       // 177
    // Get current document to get its current state                                                                   // 178
    // We need to send this to the server so we know which fields are up for change                                    // 179
    // when applying the diffing algorithm                                                                             // 180
                                                                                                                       // 181
    var collectionName = (Session.equals("Mongol_currentCollection", "account_618")) ? "users" : String(this);         // 182
                                                                                                                       // 183
    if (Session.equals("Mongol_currentCollection", "account_618")) {                                                   // 184
      var newData = Mongol.getDocumentUpdate("account_618");                                                           // 185
      var newObject = Mongol.parse(newData);                                                                           // 186
      var oldObject = Meteor.user();                                                                                   // 187
      // console.log(targetCollection);                                                                                // 188
      // console.log(newData);                                                                                         // 189
      // console.log(newObject);                                                                                       // 190
    } else {                                                                                                           // 191
      var sessionKey = "Mongol_" + collectionName;                                                                     // 192
      DocumentPosition = Session.get(sessionKey),                                                                      // 193
        CurrentCollection = Mongol.Collection(collectionName).find({}, {transform: null}).fetch();                     // 194
      var newData = Mongol.getDocumentUpdate(collectionName);                                                          // 195
      var newObject = Mongol.parse(newData);                                                                           // 196
      var oldObject = CurrentCollection[DocumentPosition];                                                             // 197
    }                                                                                                                  // 198
                                                                                                                       // 199
    if (newObject) {                                                                                                   // 200
      Meteor.call("Mongol_update", collectionName, newObject, Mongol.validateDocument(oldObject), function(error, result) {
        if (!error) {                                                                                                  // 202
          Session.set('Mongol_editMode', null);                                                                        // 203
                                                                                                                       // 204
        } else {                                                                                                       // 205
          Mongol.error('update')                                                                                       // 206
        }                                                                                                              // 207
      });                                                                                                              // 208
    }                                                                                                                  // 209
  },                                                                                                                   // 210
  'click .Mongol_edit_cancel': function() {                                                                            // 211
    Session.set('Mongol_editMode', null);                                                                              // 212
  },                                                                                                                   // 213
  'click .Mongol_m_signout': function() {                                                                              // 214
    Meteor.logout();                                                                                                   // 215
  },                                                                                                                   // 216
});                                                                                                                    // 217
                                                                                                                       // 218
                                                                                                                       // 219
Template.Mongol_docControls.helpers({                                                                                  // 220
  disable: function() {                                                                                                // 221
    var sessionKey = "Mongol_" + String(this);                                                                         // 222
    var CurrentDocument = Session.get(sessionKey);                                                                     // 223
    var collectionName = String(this);                                                                                 // 224
    var collectionVar = Mongol.Collection(collectionName);                                                             // 225
    var collectionCount = collectionVar.find().count();                                                                // 226
                                                                                                                       // 227
    if (collectionCount === 1) {                                                                                       // 228
      return "Mongol_m_disabled";                                                                                      // 229
    }                                                                                                                  // 230
                                                                                                                       // 231
  },                                                                                                                   // 232
  editing: function() {                                                                                                // 233
    var editing = Session.get('Mongol_editMode');                                                                      // 234
    return editing;                                                                                                    // 235
  },                                                                                                                   // 236
  editing_class: function() {                                                                                          // 237
    var edit = Session.get('Mongol_editMode');                                                                         // 238
    if (edit) {                                                                                                        // 239
      return "Mongol_m_wrapper_expand"                                                                                 // 240
    }                                                                                                                  // 241
  },                                                                                                                   // 242
  Mongol_docMenu_editing: function() {                                                                                 // 243
    var editMode = Session.get("Mongol_editMode");                                                                     // 244
                                                                                                                       // 245
    if (editMode) {                                                                                                    // 246
      return "Mongol_docMenu_editing";                                                                                 // 247
    }                                                                                                                  // 248
                                                                                                                       // 249
  },                                                                                                                   // 250
  active: function() {                                                                                                 // 251
                                                                                                                       // 252
    var current = Session.get("Mongol_currentCollection");                                                             // 253
                                                                                                                       // 254
    // return true if collection name matches                                                                          // 255
    if (current === String(this)) {                                                                                    // 256
      return true;                                                                                                     // 257
    }                                                                                                                  // 258
                                                                                                                       // 259
    // return true if it's a user account                                                                              // 260
    if (current === "account_618") {                                                                                   // 261
      return true;                                                                                                     // 262
    }                                                                                                                  // 263
                                                                                                                       // 264
  },                                                                                                                   // 265
  account: function() {                                                                                                // 266
                                                                                                                       // 267
    var currentCollection = Session.get("Mongol_currentCollection");                                                   // 268
    if (currentCollection === "account_618") {                                                                         // 269
      return true                                                                                                      // 270
    } else {                                                                                                           // 271
      return false                                                                                                     // 272
    }                                                                                                                  // 273
  },                                                                                                                   // 274
                                                                                                                       // 275
});                                                                                                                    // 276
                                                                                                                       // 277
// Will possibly be used in augmented document udpate UI                                                               // 278
/*Template.Mongol_docViewer.events({                                                                                   // 279
'click .Mongol_string' : function (evt,tmpl) {                                                                         // 280
var field = $(evt.target).prevAll(".Mongol_key:first").text().slice(1,-2);                                             // 281
Session.set('Mongol_inlineEdit',true);                                                                                 // 282
Tracker.flush();                                                                                                       // 283
// Do something to trigger the editable text element                                                                   // 284
}                                                                                                                      // 285
});*/                                                                                                                  // 286
                                                                                                                       // 287
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['msavin:mongol'] = {
  Mongol: Mongol
};

})();
