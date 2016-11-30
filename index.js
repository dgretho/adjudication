var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/bin'));

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/cases', function(request, response) {
  var cases = [
    { 
      address: "1 Street Name, Town, City, Post Code", 
      tenancyStartDate: new Date(2015, 1, 1),
      tenancyEndDate: new Date(2016, 1, 1), 
      dateAdjudicationEntered: new Date(2016, 2, 2),
      depositAmount: 1000,
      tenantAmount: 800,
      landlordAmount: 700
    },
    { 
      address: "2 Road Name, Town, City, Post Code", 
      tenancyStartDate: new Date(2015, 7, 4),
      tenancyEndDate: new Date(2016, 8, 2), 
      dateAdjudicationEntered: new Date(2016, 9, 1),
      depositAmount: 2000,
      tenantAmount: 1600,
      landlordAmount: 1400
    },
    { 
      address: "10 Avenue Name, Town, City, Post Code", 
      tenancyStartDate: new Date(2015, 3, 15),
      tenancyEndDate: new Date(2016, 4, 2), 
      dateAdjudicationEntered: new Date(2016, 7, 20),
      depositAmount: 5000,
      tenantAmount: 4000,
      landlordAmount: 1500
    },
  ];
  response.send(cases);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});