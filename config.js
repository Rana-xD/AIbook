
var dotenv = require('dotenv');
var cfg = {};

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  dotenv.config({path: '.env'});
} else {
  dotenv.config({path: '.env.test', silent: true});
}

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;
cfg.secret = process.env.APP_SECRET || 'secret';
cfg.dialogflow_projectId = process.env.DIALOGFLOW_PROJECTID;

var requiredConfig = [cfg.dialogflow_projectId];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'Config environment variable error. Please make sure required env variable is set properly.';

  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;