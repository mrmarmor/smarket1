const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/*exports.fcmLegacyServerKey = functions.database
        .ref('/appConfig/fcmLegacyServerKey')
        .onWrite(event => {
    const num = event.data.val()
}*/
/*exports.fcmLegacyServerKey = functions.https.onRequest((req, res) => {
//  res.status(200).send();
//});
  const legacyServerKey = functions.database.ref('/appConfig/fcmLegacyServerKey')
    .onCreate((snapshot, context) => {
        return snapshot.val();

        //response.send("Hello from Firebase!");
    });

  res.status(200).send(legacyServerKey);
});*/
exports.getConfig = functions.https.onRequest((req, res) => {
  const keys = req.url.split("/");
  admin.database().ref('/appConfig/' + keys[keys.length - 1]).once('value').then(function(snapshot) {
    res.status(200).send(snapshot.val());
  });
});

/*functions.https.onRequest((request, response) => {
  var db = admin.database();

  var val;
  db.ref('/appConfig/fcmLegacyServerKey').once('value').then(snap => {
    val = snap.val();
    return val;
  }).then(() => {
    response.status(200).send(val);
  }).catch(err => {
    console.log(err);
    response.send("error occurred");
  });
});*/