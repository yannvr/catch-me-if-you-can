(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw("<h1>Catch Me!</h1>\n"), Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n    ", HTML.P("Logged as ", Blaze.View("lookup:username", function() {
      return Spacebars.mustache(view.lookup("username"));
    }), " ", HTML.A({
      "class": "logout"
    }, "Logout")), "\n    ", Spacebars.include(view.lookupTemplate("map")), "\n" ];
  }, function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n" ];
  }) ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("map");
Template["map"] = new Template("Template.map", (function() {
  var view = this;
  return HTML.DIV({
    "class": "map-container"
  }, "\n        ", Blaze._TemplateWith(function() {
    return {
      name: Spacebars.call("map"),
      options: Spacebars.call(view.lookup("mapOptions"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("googleMap"));
  }), "\n    ");
}));

})();
