import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as express from 'express';
import * as publishLocation from './publishLocation';

const app = express();
app.use(cors({ origin: true }));
app.get('/', (req, res) => {
    console.log('rmethod: ', req.method);
    res.status(200).send({ now: Date.now() });
});
exports.getTimestamp = functions.https.onRequest(app);
exports.publishLocation = publishLocation;