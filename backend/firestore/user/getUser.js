const { doc, addDoc, getDoc } = require("firebase/firestore")
const { db } = require("../../firebase.config");

const getUser = async (user) => {
    const userRef = doc(db, 'users', user.id);
    let userData;

    try {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists) {
            userData = await addDoc(user.id);
        }
        else {
            userData = userSnap.data();
        }

        return userData;
    } catch (error) {
        return console.log(error);
    }
}

module.exports= getUser;