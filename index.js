var express = require('express');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient

var app = express();
var db;

var isDev = process.argv[2] === 'dev';

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.set('connectionString', isDev ? 
  'mongodb://dgretho:password@ds119508.mlab.com:19508/adjudicator-dev' :
  'mongodb://dgretho:password@ds129018.mlab.com:29018/adjudicator');

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/bin'));

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/cases', function(request, response) {
  getCases((cases) => {
    response.send(cases);
  });
});

app.get('/case/:caseId', function(request, response) {
  getCases((cases) => {
    var caseId = parseInt(request.params.caseId);
    var requestedCase = cases.find(function(existingCase) {
      return existingCase.caseReference === caseId;
    });
    
    if (requestedCase === undefined) {
      requestedCase = {};
    }
    
    response.send(requestedCase);
  });
});

app.post('/case', function(request, response) {
  getCases((cases) => {
    request.body.caseReference = getCaseReference(cases);
    request.body.landlordEvidence = [];
    request.body.tenantEvidence = [];
    request.body.status = 'awaiting evidence';
    
    createCase(request.body, () => {
      response.sendStatus(200);      
    });
  });
});

app.post('/evidence', function(request, response) {
  getCases((cases) => {
    var caseToUpdate = cases.find(function(existingCase) {
      return existingCase.caseReference === request.body.caseReference;
    });
    
    var evidenceProperty = request.body.evidenceOwner + 'Evidence';
    var evidenceList = caseToUpdate[evidenceProperty];
    evidenceList.push(request.body.evidence);
    var evidenceUpdate = { $set: {} };
    evidenceUpdate.$set[evidenceProperty] = evidenceList;
    updateCase(request.body.caseReference, evidenceUpdate, () => {
      response.sendStatus(200);      
    });
  });
});

app.post('/markForAdjudication', function(request, response) {
  updateCase(request.body.caseReference, { $set: { status: 'awaiting adjudication' }}, () => {
    response.sendStatus(200);    
  });
});

app.post('/adjudicate', function(request, response) {
  var updateCaseValue = { 
    status: 'adjudication complete', 
    amountToReturnToLandlord: request.body.amountToReturnToLandlord 
  };
  updateCase(request.body.caseReference, { $set: updateCaseValue }, () => {
    response.sendStatus(200);    
  });
});

MongoClient.connect(app.get('connectionString'), (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database;
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
});

function getCases(callback) {
  db.collection('cases').find().toArray((err, cases) => {
    if (err) {
      return console.log(err);
    }
    
    callback(cases !== null ? cases : []);
  });
}

function createCase(newCase, callback) {
  db.collection('cases').save(newCase, (error) => {
    if (callback) {
      callback(error); 
    }
      
    if (error) {
      return console.log(error);
    }

    console.log('created case ' + newCase.caseReference);
  });
}

function updateCase(caseReference, update, callback) {
  db.collection('cases').findOneAndUpdate(
    { caseReference: caseReference },
    update,
    {},
    (error) => {
      if (callback) {
        callback(error); 
      }
      
      if (error) {
        return console.log(error);
      }
  
      console.log('updated case ' + caseReference);
    });
}

function getCaseReference(cases) {
  if (cases.length === 0) {
    return 1;
  }
  
  var caseReferences = cases.map((aCase) => {
    return aCase.caseReference;
  });
  return Math.max.apply(Math, caseReferences) + 1;
}
