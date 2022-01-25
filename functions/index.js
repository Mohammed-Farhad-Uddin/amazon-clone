const functions = require("firebase-functions");
const express= require("express");
const cors= require("cors");
const stripe= require("stripe")(``)

// API

// -App config
const app = express();

// -middleware
app.use(cors({origin: true}));
app.use(express.json());

// -API Routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Received", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,  //subunits of the currency 1$=0.1$
        currency: "usd",
    });
    console.log(paymentIntent,"ami paymentIntent bitore check");

    //OK_created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});


// -listen-command
exports.api = functions.https.onRequest(app);


// example local API endpoint,,,,firebase init e function e space diye enter er por  +  functions[us-central1-api]: http function initialized (http://localhost:5001/challenge-11c1d/us-central1/api).
// http://localhost:5001/challenge-11c1d/us-central1/api
