const admin = require("firebase-admin")
const { users } = require("./db")
const { encodeJSON, decodeJSON, MD5 } = require("./encryption")

const config = {
    apiKey: "AIzaSyAeZSHjxvgteI6348nhCXDOuKBQgPXRQsY",
    authDomain: "smartclass-a4634.firebaseapp.com",
    projectId: "smartclass-a4634",
    storageBucket: "smartclass-a4634.appspot.com",
    messagingSenderId: "642333797971",
    appId: "1:642333797971:web:28d934640996839909a0a6",
    measurementId: "G-YNW0TNTQXC",
}
admin.initializeApp(config)

async function auth_firebase(idToken) {
    let res = await admin.auth().verifyIdToken(idToken)
    if (res) {
        //check if the user is in database or not
        let user = await users.findOne({
            $and: [{ uid: res.uid }, { mobile: res.phone_number }],
        })
        let data = user
        //if not exist insert the data with generating password
        if (!user) {
            data = {
                uid: res.uid,
                name: false,
                dob: false,
                gender: false,
                roll_number: false,
                mobile: res.phone_number,
                username: res.phone_number.slice(1),
                email: false,
                verified: false,
                role: "student",
                school_id: false,
                branch_id: false,
                group: false,
                created_date: new Date(),
            }
            users.insert(data)
        }
        //create a token of uid, phone, created_date, and password
        let token = encodeJSON({
            mobile: data.mobile,
            uid: data.uid,
            created_date: data.created_date,
        })

        //return the object with token
        return {
            auth: true,
            token,
            uid: data.uid,
            detail_page:
                data.branch_id & data.school_id & data.roll_number
                    ? false
                    : true,
        }
    }
}
module.exports = {
    auth_firebase,
}
