(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var MeteorToysData, collectionObjects, collections;

(function () {

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/meteortoys:toykit/server/publish.js                                 //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
var _0x30b0=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x67\x65\x74\x41\x6C\x6C","\x43\x6F\x6C\x6C\x65\x63\x74\x69\x6F\x6E","\x66\x69\x6E\x64","\x6E\x61\x6D\x65","\x67\x65\x74","\x70\x75\x73\x68","\x6D\x61\x70","\x49\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65","\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x4D\x6F\x6E\x67\x6F\x6C","\x70\x75\x62\x6C\x69\x73\x68"];Meteor[_0x30b0[11]](_0x30b0[0],function(_0x7d39x1){if(_0x7d39x1){collectionObjects=Mongo[_0x30b0[2]][_0x30b0[1]](),collections=[];collectionObjects[_0x30b0[7]](function(_0x7d39x2){collections[_0x30b0[6]](Mongo[_0x30b0[2]][_0x30b0[5]](_0x7d39x2[_0x30b0[4]])[_0x30b0[3]]())});return collections;}else {return [MeteorToysData[_0x30b0[8]][_0x30b0[3]]({},{limit:6}),MeteorToysData[_0x30b0[9]][_0x30b0[3]](),MeteorToysData[_0x30b0[10]][_0x30b0[3]]({},{$sort:{"\x4D\x6F\x6E\x67\x6F\x6C\x5F\x64\x61\x74\x65":1},limit:15})]}});
//////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/meteortoys:toykit/lib/collections.js                                //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
MeteorToysData = {                                                              // 1
	'Impersonate': new Mongo.Collection("MeteorToys_Impersonate"),                 // 2
	'JetSetter':   new Mongo.Collection("MeteorToys_JetSetter"),                   // 3
	'Mongol':      new Mongo.Collection("MeteorToys_Mongol"),                      // 4
}                                                                               // 5
                                                                                // 6
MeteorToysData.Impersonate.allow({                                              // 7
	insert: function () {                                                          // 8
	    return true;                                                               // 9
	},                                                                             // 10
	remove: function (){                                                           // 11
	    return true;                                                               // 12
	},                                                                             // 13
	update: function() {                                                           // 14
	    return true;                                                               // 15
	}                                                                              // 16
});                                                                             // 17
                                                                                // 18
MeteorToysData.JetSetter.allow({                                                // 19
	insert: function () {                                                          // 20
	    return true;                                                               // 21
	},                                                                             // 22
	remove: function (){                                                           // 23
	    return true;                                                               // 24
	},                                                                             // 25
	update: function() {                                                           // 26
	    return true;                                                               // 27
	}                                                                              // 28
});                                                                             // 29
                                                                                // 30
MeteorToysData.Mongol.allow({                                                   // 31
	insert: function () {                                                          // 32
	    return true;                                                               // 33
	},                                                                             // 34
	remove: function (){                                                           // 35
	    return true;                                                               // 36
	},                                                                             // 37
	update: function() {                                                           // 38
	    return true;                                                               // 39
	}                                                                              // 40
});                                                                             // 41
                                                                                // 42
if (Meteor.isServer) {                                                          // 43
	MeteorToysData["credentials"] = new Mongo.Collection("MeteorToysCredentials"); // 44
}                                                                               // 45
//////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteortoys:toykit'] = {
  MeteorToysData: MeteorToysData
};

})();

//# sourceMappingURL=meteortoys_toykit.js.map
