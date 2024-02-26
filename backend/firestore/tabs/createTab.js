const { doc, setDoc } = require("firebase/firestore")
const { db } = require("../../firebase.config");

const createTab = async (tabName, tabType, creatorId, userId) => {
    const tabTypeList = ['money', 'wins', 'both'];
    const uid = Math.floor(Date.now() / 10 ** 19 * creatorId);
    console.log(Date.now())
    console.log(uid)
    // trim uids from beginning so they are all same length
    const tabRef = doc(db, 'tabs', `${uid}`);
    if (!tabTypeList.includes(tabType)) {
        console.log(`${creatorId} used invalid tab type: ${tabType}`);
        return false;
    }
    try {
        const newTab = await setDoc(tabRef, {
            createdAt: Date.UTC(),
            entries: [],
            metadata: {
                lastNameChange: Date.UTC() - 24 * 60 * 60 * 1000,
                prevName: undefined
            },
            name: tabName,
            creator: creatorId,
            users: [
                creatorId,
                userId
            ],
            type: tabType
        });
    } catch (error) {
        return console.log(error);
    }
}

module.exports = createTab;