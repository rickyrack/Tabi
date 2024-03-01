const { doc, getDoc, updateDoc } = require("firebase/firestore")
const { db } = require("../../firebase.config");

const addEntry = async (userId, tabId, winner, stake, wins, reason) => {
    if (!tabId) {
        console.log('Tab does not exist.');
        return false;
    }
    else if (stake.toString().length != 1 && stake.toString().split('.')[1].length > 2 && stake.toString().includes('.')) {
        console.log(`Tab: [${tabId}] stake value [${stake}] is invalid.`);
        return false;
    }
    else if (wins > 99 || wins.toString().split('.').length > 1) {
        console.log(`Tab: [${tabId}] wins value [${wins}] is invalid.`);
        return false;
    }

    if (!wins) wins = 1;
    const tabRef = doc(db, 'tabs', tabId);

    try {
        const tabSnap = await getDoc(tabRef);
        const tabData = tabSnap.data();
        const type = tabData.type;

        const entryData = {
            stake: type === 'stake' || type === 'both' ? stake : null,
            wins: type === 'wins' || type === 'both' ? wins : null,
            winner: winner.id,
            reason: reason || null,
            createdAt: Date.now()
        }

        if (tabData.data().users.includes(userId)) {
            const prevEntries = tabData.entries;
            await updateDoc(tabRef, {
                'entries': [...prevEntries, entryData]
            });
            const newTab = await getDoc(tabRef);
            return newTab.data();
        }
        else {
            console.log(`Tab: [${tabId}] cannot be edited by [${userId}].`);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = addEntry;