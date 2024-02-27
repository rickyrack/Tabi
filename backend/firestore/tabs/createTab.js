const { doc, setDoc, getDoc } = require("firebase/firestore")
const { db } = require("../../firebase.config");
const getTabs = require("./getTabs");

const createTab = async (tabName, tabType, creatorId, userId) => {
    // userId is the user that is NOT the original creator
    const creatorTabs = await getTabs(creatorId);
    const otherTabs = await getTabs(userId);
    const checkTabs = [...creatorTabs, ...otherTabs];
    const tabExists = checkTabs.find(tab => tab.name === tabName);
    if (tabExists) {
        console.log(`User ${creatorId} already has a tab named ${tabName}`);
        return false;
    }

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
        await setDoc(tabRef, {
            createdAt: Date.now(),
            entries: [],
            metadata: {
                lastNameChange: Date.now() - 24 * 60 * 60 * 1000,
                prevName: null
            },
            name: tabName,
            creator: creatorId,
            users: [
                creatorId,
                userId
            ],
            type: tabType
        });

        return await getDoc(tabRef);
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = createTab;