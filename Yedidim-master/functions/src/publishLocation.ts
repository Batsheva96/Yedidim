import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
// import * as  postmarkTransport from 'nodemailer-postmark-transport';


const transporter = nodemailer.createTransport(
    `smtps://yedidim.project@gmail.com:lolapop1996!@smtp.gmail.com`
);

const LOCATION_COLLECTION = 'locations';

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors({ origin: true }));
app.post('/', (req, res) => {
    const db = admin.firestore();
    console.log('method: ', req.method);
    console.log('body: %o', req.body);
    const count = req.body.count;
    const requestHelpData = req.body.data;
    console.log(count);
    db.collection(LOCATION_COLLECTION).get().then(data => {
        try{
            if (data.empty) {
                console.error('data is empty!');
                return res.status(404).send({ message: 'not found!' });
            }
            let locations: ILocation[] = [];
            data.docs.forEach(doc => {
                locations.push(doc.data() as ILocation);
            });
            const reqLocation = { lat: req.body.lat, lng: req.body.lng };
            locations = locations.sort((a, b) => {
                return distance(a, reqLocation) - distance(b, reqLocation)
            });
            console.log('locations:', locations);
            const locToReturn = locations.map(l => {
                return {
                    location: l,
                    disnt: distance(l, reqLocation)
                }
            }).filter(item => item.disnt < count * 10);
            locToReturn.forEach(item => {
                sendEmail(item.location.email, item.disnt, requestHelpData);
            });
            return res.status(200).send({
                numOfVol: 0
            });
        } catch(err){
            console.error(err)
            return
        }
    }).catch(err => {
        console.error('failed to get locations. err: %o', err);
        return res.status(500).send({ message: 'internbal server error' });
    });
});
exports.publishLocation = functions.https.onRequest(app);


function sendEmail(dest: string, dist: number, otherData: {
    name: string,
    lastname: string,
    phone: string,
    category: string,
    details: string,
}) {
    const mailOptions = {
        from: 'yedidim.project@gmail.com',
        to: dest,
        subject: 'צריך את עזרתך!',
        html: `
            <p style="font-size: 16px; dir=rtl;">
                היי,
                מישהו צריך את עזרתך! האם תסכים לתת לו יד?
                הוא נמצא רק  ${dist} ק"מ ממך.
                <br>
                <b>
                ההודעה שפורסמה:
                </b>
                <table>
                    <tr>
                        <th>
                            Name:
                        </th>
                        <td>
                        ${otherData.name}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Last Name:
                        </th>
                        <td>
                        ${otherData.lastname}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Category
                        </th>
                        <td>
                        ${otherData.category}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Details
                        </th>
                        <td>
                        ${otherData.details}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Phone
                        </th>
                        <td>
                        ${otherData.phone}
                        </td>
                    </tr>

                </table>
            </p>
            <br />
        `
    };
    return transporter.sendMail(mailOptions, (erro: any, info: any) => {
        // console.error(erro);
        // console.log(info);
    });

}

function distance(a: { lat: number, lng: number }, b: { lat: number, lng: number }) {
    const lat1 = a.lat;
    const lon1 = a.lng;
    const lat2 = b.lat;
    const lon2 = b.lng;
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        const radlat1 = Math.PI * lat1 / 180;
        const radlat2 = Math.PI * lat2 / 180;
        const theta = lon1 - lon2;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        // dist = dist * 1.609344;
        return dist; // dist in km
    }
}

interface ILocation {
    lat: number,
    lng: number,
    ts: number,
    email: string
}