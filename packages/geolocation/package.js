Package.describe({
  name: 'yannvr:geolocation',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Meteor interface to Geolocation',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  //api.use('yannvr:geolocation');
  api.use(['session', 'reactive-var']);
  api.addFiles('geolocation.js');
  api.export('Geolocation', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('yannvr:geolocation');
  api.addFiles('geolocation-tests.js');
});

