/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask smart community for schools"
 *  Alexa: "Here are your schools: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing schools.
 */
var SCHOOLS = [];
var SECONDARYSCHOOLS = [];
//var SCHOOLS = [
//    "Takapuna Grammar School",
//    "Westlake Girls' High School",
//    "Westlake Boys' High School"
//];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Schools = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Schools.prototype = Object.create(AlexaSkill.prototype);
Schools.prototype.constructor = Schools;

Schools.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Schools.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewSchoolsRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Schools.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Schools.prototype.intentHandlers = {
    "GetSchoolsIntent": function (intent, session, response) {
        handleNewSchoolsRequest(response);
    },

    "GetSecondarySchoolsIntent": function (intent, session, response) {
        handleSecondarySchoolsRequest(response);
    },

    "GetBestSchoolsIntent": function (intent, session, response) {
        handleBestSchoolsRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a school, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

function handleBestSchoolsRequest(response) {
    var BESTSCHOOLS = "Takapuna Grammar School"
    // Create speech output
    var speechOutput = "The best school is " + BESTSCHOOLS + " with decile 10 band. It is the high school from year 9 to year 15 and has 1691 students in total.";
    var cardTitle = "Your Best Schools";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
    
}

function handleSecondarySchoolsRequest(response) {
    var SECONDARYSCHOOLS = [
        "Carmel College",
        "Takapuna Grammar School",
        "Westlake Boys' High School",
        "Westlake Girls' High School",
        "Rosmini College"
    ]
    // Create speech output
    var speechOutput = "There are " + SECONDARYSCHOOLS.length + " high schools: " + SECONDARYSCHOOLS.join();
    var cardTitle = "Your Secondary Schools";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
    
}

/**
 * Gets a random new school from the list and returns to the user.
 */
function handleNewSchoolsRequest(response) {
    // Get a random school from the schools list
    //var schoolIndex = Math.floor(Math.random() * SCHOOLS.length);
    //var randomSchool = SCHOOLS[schoolIndex];
    
    // 1. Get all schools which 'TA with Auckland Local Board' like '%Distinct%'
    SCHOOLS = [
        "Carmel College",
        "Takapuna Grammar School",
        "Westlake Boys' High School",
        "Westlake Girls' High School",
        "Rosmini College",
        "Bayswater School",
        "Belmont Intermediate",
        "Belmont School (Auckland)",
        "Campbells Bay School",
        "Devonport School",
        "Forrest Hill School",
        "Hauraki School",
        "Milford School (Auckland)",
        "St Joseph's Catholic School (Takapuna)",
        "St Leo's Catholic School (Devonport)",
        "Stanley Bay School",
        "Sunnynook School",
        "Takapuna Normal Intermediate",
        "Takapuna School",
        "Vauxhall School",
        "Wairau Intermediate",
        "Wilson School"
    ];

    // Create speech output
    var speechOutput = "There are " + SCHOOLS.length + " schools near Devonport, which kind of school do you want to know, primary or high school?";
    var cardTitle = "Your Schools";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var schools = new Schools();
    schools.execute(event, context);
};

