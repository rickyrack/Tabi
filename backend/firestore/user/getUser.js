const { doc, getDoc } = require("firebase/firestore")
const { db } = require("../../firebase.config");
const addUser = require("./addUser");

const getUser = async (user) => {
    const userRef = doc(db, 'users', user.id);
    let userData;

    try {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            userData = await addUser(user);
        }
        else {
            userData = userSnap.data();
        }

        return userData;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports= getUser;