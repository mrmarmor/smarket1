//const functions = require('firebase-functions');
//const https = require('https');
//const zlib = require('zlib');
//var Promise = require('promise');
//const admin = require('firebase-admin');
//admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

/*exports.fcmLegacyServerKey = functions.https.onRequest((req, res) => {
    //  res.status(200).send('AIzaSyBMqKQmp8rcM5sgf5i_IL_p1Pyg46TzS1k');
    //});
      const legacyServerKey = functions.database.ref('/appConfig/fcmLegacyServerKey')
        .onCreate((snapshot, context) => {
            //return snapshot.val();
            //return 'AIzaSyBMqKQmp8rcM5sgf5i_IL_p1Pyg46TzS1k';
            res.status(200).send(legacyServerKey);
            //res.send();
        });
    
      //res.status(200).send(legacyServerKey);
    });*/

    /*exports.fcmLegacyServerKey = functions.https.onRequest((request, response) => {
        var db = admin.database();
      
        var val;
        db.ref('/appConfig/fcmLegacyServerKey').once('value').then(snap => {
          val = snap.val();
          return val;
        }).then(() => {
          response.send(val);
        }).catch(err => {
          console.log(err);
          response.send("error occurred");
        });
      });*/

/*exports.getConfig = functions.https.onRequest((req, res) => {
    const keys = req.url.split("/");
    admin.database().ref('/appConfig/' + keys[keys.length - 1]).once('value').then(function(snapshot) {
        res.status(200).send(snapshot.val());
    });
});

function downloadPage(url) {
    return new Promise((resolve, reject) => {
        var request = http.request(url, function (response) {   
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            
            var gunzip = zlib.createGunzip();            
            response.pipe(gunzip);
        
            var data = '';
            gunzip.on('data', function (chunk) {
                data += chunk;
            });

            gunzip.on('end', function () {
                resolve(data);
            });
        });
        
        request.end();

    });  
}

function getPrice(data, barcode) {
    return new Promise((resolve, reject) => {
        try {
            var indexOfBarcode = data.indexOf(barcode);
            var focusedData = data.substring(indexOfBarcode, indexOfBarcode + 1000);
            var result = focusedData.substring(focusedData.indexOf('<ItemPrice>') + 11, focusedData.indexOf('</ItemPrice>'));
            resolve(JSON.stringify({data: result}));

        } catch (error) {
            reject(error);
        }
        //return JSON.stringify({data: result});
    });
}


function myAsync(url, barcode) {
    try {
        const url = 'http://matrixcatalog.co.il/CompetitionRegulationsFiles/latest/7290661400001/PriceFull7290661400001-076-201811070936-001.xml.gz';//req.data.url;
        const barcode = '318349';//req.data.barcode;
        const html = downloadPage(url).then((result) => {
            console.log('SHOULD WORK:');
            const price = getPrice(result, barcode);
            console.log('SHOULD WORK:');
            console.log(price);
        });
        //console.log(html);

        // try downloading an invalid url
        
       
    } catch (error) {
        console.error('ERROR:');
        console.error(error);
    }
};

myAsync(2,2);*/
//exports.getPriceByBarcode = functions.https.onRequest((req, res) => {
//    res.status(200).send(myAsync(3,3));
    //myAsync(req.data.url, req.data.barcode);
//});

//var require: "./getConfig"
const getConfig = require('./getConfig.js');
const getPriceByBarcode = require('./getPriceByBarcode.js');
//const status500 = require('./status500.js');
const express2 = require('./express2.js');
//const promiseTry2 = require('./promiseTry2.js');

module.exports = {
    getConfig, getPriceByBarcode, express2//, promiseTry2
}

/*exports.getPriceByBarcode = functions.https.onRequest((req, res) => {
    //res.setHeader('Content-Type', 'application/json');
    const url = 'http://pricesprodpublic.blob.core.windows.net/pricefull/PriceFull7290027600007-089-201811070330.gz?sv=2014-02-14&sr=b&sig=nZeWzu%2FhVxyUAjdAEmw6ut6GF2D1YgijRN5RUisiMf8%3D&se=2018-11-07T14%3A27%3A45Z&sp=r';//req.data.url;
    const barcode = '318349';//req.data.barcode;

    var request = http.request(url, function (response) {   
        var gunzip = zlib.createGunzip();            
        response.pipe(gunzip);

        var data = '';
        gunzip.on('data', function (chunk) {
            data += chunk;
        });
        
        gunzip.on('end', function () {
            var indexOfBarcode = data.indexOf(barcode);
            var focusedData = data.substring(indexOfBarcode, indexOfBarcode + 1000);
            var result = focusedData.substring(focusedData.indexOf('<ItemPrice>') + 11, focusedData.indexOf('</ItemPrice>'));
           
            //res.send(JSON.stringify({data: 'result'}));
            res.status(200).send('{data: result}');
       // }).then((data) => {
        
        });
    });
    
    request.on('error', function (e) {
        res.status(e.status).send({error: e.message, status: e.status});
    });
    request.end();

    //res.status(200).send(JSON.stringify({data: "result"}));

    //req.setRequestHeader('Access-Control-Allow-Origin', '*');  
});*/

/*exports.getPriceByBarcode = functions.https.onRequest((req, res) => {
    //const barcode = req.url.substring(req.url.lastIndexOf("/") + 1);
    //const barcode = req.;

    var options = {
        host: 'http://matrixcatalog.co.il/CompetitionRegulationsFiles/latest/7290661400001/PriceFull7290661400001-076-201811070936-001.xml.gz',
        path: '/'
    }
    var request = http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            console.log(data);
    
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
});      

exports.getCerberus = functions.https.onRequest((req, res) => {

https.get('https://url.retail.publishedprices.co.il/login', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error1: " + err.message);
});
});
      /*exports.getCerberus = functions.https.onRequest((req, res) => {
        //var url = new URL('https://url.retail.publishedprices.co.il/login');
        var xmlHttp = new XMLHttpRequest();
        //return console.log('File name is: ');
        //res.status(200).send("sss");
        xmlHttp.open("GET", 'https://url.retail.publishedprices.co.il/login', false );//.then(success => {
            //xmlHttp.open( "GET", url, false );//.then(success => {
        //    return console.log('File name is: ');
        //    response.status(200).send(xmlHttp.responseText);
        //}).catch(error => {
        //    response.status(500).send(error)
        //}); // false for synchronous request
        //xmlHttp.send(null);
        res.status(200).send(xmlHttp.responseText);
      });*/
