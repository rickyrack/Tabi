const { doc, getDoc, updateDoc } = require("firebase/firestore")
const { db } = require("../../firebase.config");

const addEntry = async (userId, tabName, value, reason) => {
    const tabRef = doc(db, 'tabs', tabName);
    if (!reason) reason = undefined;
    try {
        const tabSnap = await getDoc(tabRef);

        if (tabSnap.data().users.includes(userId)) {
            const prevEntries = tabSnap.data().entries;
            await updateDoc(tabRef, {
                'entries': [...prevEntries, value, reason]
            });
            const tabData = await getDoc(tabRef);
            return tabData;
        }
        else {
            console.log(`${tabName} cannot be edited by ${userId}`);
            return false;
        }
    } catch (error) {
        return console.log(error);
    }
}

module.exports = addEntry;