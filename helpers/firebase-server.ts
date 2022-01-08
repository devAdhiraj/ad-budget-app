const admin = require("firebase-admin");
// const serviceAccount = require("C:/Users/adhir/Documents/coding/budget-app-56f7b-firebase-adminsdk-kzsv7-eca696ae7f.json")
const private_key = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n');
const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.NEXT_PUBLIC_PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": private_key,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER,
  "client_x509_cert_url": process.env.CLIENT_CERT_URL
}
const FirebaseServer = () => {
  !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  }) : admin.app()
}
export default FirebaseServer;
