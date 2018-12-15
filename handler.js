'use strict';
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

module.exports.conversation = (event, context, callback) => {

  try {	
    const data = JSON.parse(event.body);	
    const assistant = new AssistantV1({
      username: process.env.ASSISTANT_USERNAME,
      password: process.env.ASSISTANT_PASSWORD,
      url: 'https://gateway.watsonplatform.net/assistant/api/',
      version: '2018-09-19',
    });

    const params = {
      input: { 'text': data.text},
      workspace_id: process.env.WORKSPACE_ID,
      context: data.context,
    };
  
    assistant.message(params, (err, res) => {
      if (err) {
	    callback(null, {
           statusCode: 501,
           headers: {
			 'Access-Control-Allow-Origin': '*',
		   },
           body: JSON.stringify(err),
        });
      } else {
        const response = {
	      statusCode: 200,
		  headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
		  },
	      body: JSON.stringify(res)
	    };
	    callback(null, response);
	  }
    });
  } catch (e) {
    callback(null, {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'Couldn\'t parse json body',
    });
  }	
};
