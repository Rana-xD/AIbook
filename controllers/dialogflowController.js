var Dialogflow = require('../models/Dialogflow');


/*************************************************************
***                                                       ***
*** Dialogflow Conversation Controller                    ***
*** Accept request uri \ask?                              ***
*** Accept request params must have:                      ***
***     @param query                                      ***
*************************************************************/

var detect_intent = function(request, response, next) {
    if(request.body.query && request.body.query != '') {
        var dialogflow = new Dialogflow(request.body.query);
        var dialogflowPromise = dialogflow.send();
        dialogflowPromise.then(function(result) {
            response.status(200);
            response.json({result: result});
        }).catch(err => {
            response.status(500);
            response.json({error: err});
        });
    } else {
        response.status(417);
        response.json({error: 'request expectation failed, query param must present in request url.'})
    }
}

module.exports = {
    detect_intent: detect_intent,
}
