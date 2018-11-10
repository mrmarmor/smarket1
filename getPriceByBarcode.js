const functions = require('firebase-functions');
//var async = require('asyncawait/async');
//var await = require('asyncawait/await');
//const admin = require('firebase-admin');
//admin.initializeApp(functions.config().firebase);

var Promise = require('promise');
const http = require('http');
const zlib = require('zlib');

function downloadPage(url, barcode) {
    http.get(url, function(res) { 
        var gunzip = zlib.createGunzip();            
        res.pipe(gunzip);
    
        var data = '';
        gunzip.on('data', function (chunk) {
            data += chunk;
        });

        gunzip.on('end', function () {
            var indexOfBarcode = data.indexOf(barcode);
            var focusedData = data.substring(indexOfBarcode, indexOfBarcode + 1000);
            var result = focusedData.substring(focusedData.indexOf('<ItemPrice>') + 11, focusedData.indexOf('</ItemPrice>'));
            console.log(result);
            //resolve(JSON.stringify({data: result}));
              
            });
            //        resolve(data);
   //     });
   
    
    //request.end();
    
    
    
      });
      

    /*return new Promise((resolve, reject) => {
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

    });*/  
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


//function myAsync(url, barcode) {
exports.getPriceByBarcode = functions.https.onRequest((req, res) => {
    try {
        const url = 'http://matrixcatalog.co.il/CompetitionRegulationsFiles/latest/7290661400001/PriceFull7290661400001-076-201811070936-001.xml.gz';//req.data.url;
        const barcode = '318349';//req.data.barcode;
        
        http.get(url, function(res) { 
            var gunzip = zlib.createGunzip();            
            res.pipe(gunzip);
        
            var data = '';
            gunzip.on('data', function (chunk) {
                data += chunk;
            });
    
            gunzip.on('end', function () {
                var indexOfBarcode = data.indexOf(barcode);
                var focusedData = data.substring(indexOfBarcode, indexOfBarcode + 1000);
                var result = focusedData.substring(focusedData.indexOf('<ItemPrice>') + 11, focusedData.indexOf('</ItemPrice>'));
                console.log(result);
                res.status(200).send('{result: result}');
                //resolve(JSON.stringify({data: result}));
                  
                });
                //        resolve(data);
       //     });
       
        
        //request.end();
        
        
        
          });
        /*const html = downloadPage(url, barcode);/*.then((result) => {
            console.log('SHOULD WORK:');
            const price = getPrice(result, barcode).then((mPrice) => {
                console.log("a::"+mPrice.substring(0, 400));
                //res.status(200).send(mPrice);    
            }).catch((err) => {
                console.log("error:"+err);
            
            });
            //console.log('SHOULD WORK:' + price);
            
        });*/
        //console.log(html);

        // try downloading an invalid url
        
       
    } catch (error) {
        console.error('ERROR:');
        console.error(error);
    }

    res.status(200).send("cfasf");
});

    //console.log(myAsync(3,3));
//exports.getPriceByBarcode = functions.https.onRequest((req, res) => {
//    res.status(200).send(myAsync(3,3));
    //myAsync(req.data.url, req.data.barcode);
//});
   // res.status(200).send(JSON.stringify({data: "result"}));
    //req.setRequestHeader('Access-Control-Allow-Origin', '*');  
//});


//const iconv = require('iconv');

    //const barcode = req.url.substring(req.url.lastIndexOf("/") + 1);
    //const barcode = "8001090988881";

    /*var options = {
        host: 'matrixcatalog.co.il',
        port: '80',
        gzip: true,
        gz: true,
        headers: {
            'Content-Type': "application/xml; charset=utf-8"
            ,'Accept': 'application/xml,application/xhtml+xml,application/xml;q=0.9'
            ,'Accept-Language':"en-US,en,iw,he;q=0.5"
            ,'Accept-Encoding': "gzip, deflate"
        },
        path: '/CompetitionRegulationsFiles/latest/7290661400001/PriceFull7290661400001-076-201811070936-001.xml.gz'
    }*/
    //http.setHeader("Content-Type", "application/json; charset=utf-8");

    //http://publishprice.mega.co.il/20181107/PriceFull7290055700007-0108-201811070010.gz
    //'http://matrixcatalog.co.il/CompetitionRegulationsFiles/latest/7290661400001/PriceFull7290661400001-076-201811070936-001.xml.gz'
    /*var barcode = '';
    var url = getUrlFromPostRequest(); 

    var request = http.request('http://matrixcatalog.co.il/CompetitionRegulationsFiles/latest/7290661400001/PriceFull7290661400001-076-201811070936-001.xml.gz', function (res) {   

    var gunzip = zlib.createGunzip();            
    res.pipe(gunzip);

        var data = '';
        gunzip.on('data', function (chunk) {
            data += chunk;
        });
        
        //data = decode(data);
        gunzip.on('end', function () {
            var indexOfBarcode = data.indexOf(barcode);
            var focusedData = data.substring(indexOfBarcode, indexOfBarcode + 1000);
            console.log(focusedData.substring(focusedData.indexOf('<ItemPrice>') + 11, focusedData.indexOf('</ItemPrice>')));
    
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();

    /*function decode(content) {
        var iconv = new Iconv('CP1255', 'UTF-8//TRANSLIT//IGNORE');
        var buffer = iconv.convert(content);
        return buffer.toString('utf8');
      };*/
  