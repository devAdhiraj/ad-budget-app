const admin = require("firebase-admin");
const serviceAccount = require(process.env.PATH_TO_KEY || "");
const FirebaseServer = () => {
  !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  }) : admin.app()
}
export default FirebaseServer;
