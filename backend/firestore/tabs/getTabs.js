const { collection, query, getDocs, where } = require("firebase/firestore")
const { db } = require("../../firebase.config")

const getTabs = async (userId) => {
    const tabsRef = collection(db, 'tabs');
    const q = query(tabsRef, where('users', 'array-contains', userId));
    const tabs = [];
    try {
        const tabsSnap = await getDocs(q);

        tabsSnap.forEach(doc => {
            if (doc.id === 'exampleId') return;
            tabs.push({...doc.data(), id: doc.id});
        });

        return tabs;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = getTabs;