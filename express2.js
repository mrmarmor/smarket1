const functions = require('firebase-functions');
var request = require('request');
var async = require('async');
var zlib = require('zlib');

const barcode = '318349';//req.data.barcode;

//exports.express2 = functions.https.onRequest((req, res) => {
async.waterfall([
  function (callback) { //PreExecute
      var options = {
        url: 'http://matrixcatalog.co.il/CompetitionRegulationsFiles/latest/7290661400001/PriceFull7290661400001-076-201811070936-001.xml.gz',
        headers: {
          'Accept-Encoding' : 'gzip, deflate'
        },
        encoding: null
      };

    request(options, function (error, response, body) {
        try {
        
            zlib.gunzip(body, function(err, dezipped) {
                var json_string = dezipped.toString('utf-8');
                var indexOfBarcode = json_string.indexOf(barcode);
                var focusedData = json_string.substring(indexOfBarcode, indexOfBarcode + 1000);
                var result = focusedData.substring(focusedData.indexOf('<ItemPrice>') + 11, focusedData.indexOf('</ItemPrice>'));
             
                callback(null, result);
                //var json = JSON.parse(json_string);
                // Process the json..
              });
        } catch (error) {
            console.error('ERROR:');
            console.error(error);
        }
    });
    //});
  }
], function (err, result) { // Finally
  // result now equals 'done'
  console.log('result: ' + result);
  //res.status(200).send(result);
});
//});