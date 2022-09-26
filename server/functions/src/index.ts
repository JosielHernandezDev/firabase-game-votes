import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://firestore-chart.firebaseio.com"
});

const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello JOSIEL");
});

export const getGoty = functions.https.onRequest(async(request, response) => {
  

  const gotyRef = db.collection('goty');
  const docsSnap = await gotyRef.get();
  const data = docsSnap.docs.map((item)=>item.data())

  response.json({
    msg:data
  })
});
