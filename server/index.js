import express from 'express'
import dotenv from 'dotenv'
import Connection from './database/db.js'
import DefaultData from './default.js'
import router from './routes/route.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import { v4 as uuid } from 'uuid'
import cookieParser from 'cookie-parser'
dotenv.config({path:'.env'});
// console.log(process.env);
const app = express()
app.use(cors({
    credentials:true,
    origin:true
}))
app.use(cookieParser())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)
const PORT = 8000
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
Connection(USERNAME, PASSWORD)
app.listen(PORT, () => { console.log(`Server running on PORT ${PORT}`) });
DefaultData()
export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID
paytmParams['ORDER_ID'] = uuid()
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID
paytmParams['TXN_AMOUNT'] = '500';
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback'
paytmParams['EMAIL'] = 'jainrishabh0607@gmail.com'
paytmParams['MOBILE_NO'] = '1234567890'
