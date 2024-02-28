const { doc, getDoc, updateDoc } = require("firebase/firestore")
const { db } = require("../../firebase.config");

const addEntry = async (userId, tabId, amt, reason) => {
    console.log(amt)
    if (!tabId) {
        console.log('Tab does not exist.');
        return false;
    }
    else if (amt.toString().length != 1 && amt.toString().split('.')[1].length > 2 && amt.toString().includes('.')) {
        console.log(`Tab: ${tabId} value ${amt} invalid.`);
        return false;
    }
    const tabRef = doc(db, 'tabs', tabId);

    try {
        const tabSnap = await getDoc(tabRef);

        if (tabSnap.data().users.includes(userId)) {
            const prevEntries = tabSnap.data().entries;
            await updateDoc(tabRef, {
                'entries': [...prevEntries, {
                    amount: amt,
                    reason: reason || null,
                    createdAt: Date.now()
                }]
            });
            const tabData = await getDoc(tabRef);
            return tabData.data();
        }
        else {
            console.log(`Tab: ${tabId} cannot be edited by ${userId}.`);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = addEntry;