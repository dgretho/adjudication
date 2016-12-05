var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/bin'));

app.get('/', function(request, response) {
  response.render('index');
});

var cases = [
  { 
    address: "1 Street Name, Town, City, Post Code", 
    tenancyStartDate: new Date(2015, 1, 1),
    tenancyEndDate: new Date(2016, 1, 1), 
    dateAdjudicationEntered: new Date(2016, 2, 2),
    depositAmount: 1000,
    tenantAmount: 800,
    landlordAmount: 700,
    caseReference: 1,
    landlordEvidence: [ "Tenant broke window" ],
    tenantEvidence: [],
    status: 'awaiting evidence'
  },
  { 
    address: "2 Road Name, Town, City, Post Code", 
    tenancyStartDate: new Date(2015, 7, 4),
    tenancyEndDate: new Date(2016, 8, 2), 
    dateAdjudicationEntered: new Date(2016, 9, 1),
    depositAmount: 2000,
    tenantAmount: 1600,
    landlordAmount: 1400,
    caseReference: 2,
    landlordEvidence: [],
    tenantEvidence: [ "I left the place as I found it" ],
    status: 'awaiting evidence'
  },
  { 
    address: "10 Avenue Name, Town, City, Post Code", 
    tenancyStartDate: new Date(2015, 3, 15),
    tenancyEndDate: new Date(2016, 4, 2), 
    dateAdjudicationEntered: new Date(2016, 7, 20),
    depositAmount: 5000,
    tenantAmount: 4000,
    landlordAmount: 1500,
    caseReference: 3,
    landlordEvidence: [],
    tenantEvidence: [],
    status: 'awaiting evidence'
  },
  { 
    address: "5 Lane Name, Town, City, Post Code", 
    tenancyStartDate: new Date(2015, 3, 19),
    tenancyEndDate: new Date(2016, 4, 5), 
    dateAdjudicationEntered: new Date(2016, 7, 25),
    depositAmount: 200,
    tenantAmount: 100,
    landlordAmount: 150,
    caseReference: 4,
    landlordEvidence: [ "Tenant didn't clean" ],
    tenantEvidence: [ "I hired a professional cleaner" ],
    status: 'awaiting adjudication'
  }
];
var nextCaseReference = 5;

app.get('/cases', function(request, response) {
  response.send(cases);
});

app.post('/case', function(request, response) {
  request.body.caseReference = nextCaseReference;
  request.body.landlordEvidence = [];
  request.body.tenantEvidence = [];
  
  nextCaseReference++;
  cases.push(request.body);
  
  response.sendStatus(200);
});

app.post('/evidence', function(request, response) {
  var updateCase = cases.find(function(existingCase) {
    return existingCase.caseReference === request.body.caseReference;
  });
  
  var evidenceList = null;
  if(request.body.evidenceOwner === 'landlord') {
    evidenceList = updateCase.landlordEvidence;
  } else {
    evidenceList = updateCase.tenantEvidence;
  }
  
  evidenceList.push(request.body.evidence);
  
  response.sendStatus(200);
});

app.post('/markForAdjudication', function(request, response) {
  var updateCase = cases.find(function(existingCase) {
    return existingCase.caseReference === request.body.caseReference;
  });
  
  updateCase.status = 'awaiting adjudication';
  
  response.sendStatus(200);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});