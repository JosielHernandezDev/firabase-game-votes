import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-chart.firebaseio.com",
});

const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello JOSIEL");
});

export const getGoty = functions.https.onRequest(async (request, response) => {
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const data = docsSnap.docs.map((item) => item.data());

  response.json({
    msg: data,
  });
});

///express

const app = express();

app.use(cors({ origin: true }));

app.get("/goty", async (req, resp) => {
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const data = docsSnap.docs.map((item) => item.data());

  resp.json({
    msg: data,
  });
});

app.post("/goty/:id", async (req, resp) => {
  const id = req.params.id;
  const gameRef = db.collection("goty").doc(id);
  const gameSnap = await gameRef.get();

  if (!gameSnap.exists) {
    return resp.status(404).json({
      ok: false,
      msg: "game noy exist",
    });
  }
  const game = gameSnap.data() || { votes: 0 };

  await gameRef.update({
    votes: game.votes + 1,
  });


  return resp.json({
    ok: true,
    msg:` game ${game.name} voted`
  });
});

exports.api = functions.https.onRequest(app);
