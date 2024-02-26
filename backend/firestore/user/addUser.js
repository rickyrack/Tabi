const { doc, getDoc, setDoc } = require("firebase/firestore");
const { db } = require("../../firebase.config");

const addUser = async (user) => {
    const userRef = doc(db, 'users', user.id);
    let userData;
    
    try {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists) {
            await setDoc(userRef, {
                createdAt: Date.UTC(),
                username: user.username
            });
            userData = await getDoc(userRef);
        }

        return userData;
    } catch (error) {
        return console.log(error);
    }
}

module.exports = addUser;