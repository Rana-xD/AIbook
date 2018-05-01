var path = require('path');
var dialogflowController = require('../controllers/dialogflowController');
/*  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
  *************************************************************
  ***                                                       ***
  *** Expressjs router 																			***
  *** All accepted request uri and request verb define here ***
  *** Map routes to controller functions                    ***
  ***                                                       ***
  *************************************************************
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */

module.exports = function(router, csrfProtection) {

	router.get('/', csrfProtection, function(request, response, next){
	  response.status(200);
	  response.render('index', 
	  	{
	  		title: 'Dialog flow interaction page.',
	  		csrfToken: request.csrfToken(),
	  	} 
	  );
	});

	router.post('/ask', csrfProtection, dialogflowController.detect_intent);
};

