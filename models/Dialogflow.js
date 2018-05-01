const Config = require('../config');
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

function Dialogflow(query, sessionId = 'quickstart-session-id') {
    var self = this;
    self.query = query;
    self.sessionId = sessionId;
    self.sessionPath = sessionClient.sessionPath(Config.dialogflow_projectId, self.sessionId);
    self.preparing_request = {
        session: self.sessionPath,
        queryInput: {
            text: {
                text: self.query,
                languageCode: languageCode,
            },
        },
    };
    self.queryResult = '';
    self.result = {
        Query: '',
        Response: '',
        Intent: '',
    };
    self.errors = {};
    console.log(self.query, self.preparing_request, self.sessionId);
}

Dialogflow.prototype.send = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        sessionClient
            .detectIntent(self.preparing_request)
            .then(function(responses) {
                console.log('Detected intent');
                self.queryResult = responses[0].queryResult;
                self.result.Query = `${self.queryResult.queryText}`;
                self.result.Response = `${self.queryResult.fulfillmentText}`;
                if (self.queryResult.intent) {
                    self.result.Intent = `${self.queryResult.intent.displayName}`;
                } else {
                    console.log(`  No intent matched.`);
                }
                console.log(self.result);
                resolve(self.result);
            })
            .catch(function(err) {
                console.log("error occured");
                reject(err);
            });
    });
};

Dialogflow.prototype.getErrors = function() {
    var self = this;
    return self.errors;
}

Dialogflow.prototype.getResponseResult = function() {
    var self = this;
    return self.queryResult;
}

module.exports = Dialogflow;