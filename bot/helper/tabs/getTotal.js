const getTotal = (tabData, type) => {
    // THIS NEEDS TO SUBTRACT FOR WINNER/LOSER AND CLIENT WILL DISPLAY WHOS AHEAD ETC
    const user1 = tabData.users[0];
    const user2 = tabData.users[1];

    let total1 = 0;
    let total2 = 0;

    tabData.forEach(entry => {
        if (entry.winner === user1) total1 += entry[type]
        else if (entry.winner === user2) total2 += entry[type]
    });

    let total = 0;
    let winner = 'even';

    if (total1 > total2) {
        total = total1 - total2;
        winner = user1;
    }
    else if (total2 > total1) {
        total = total2 - total1;
        winner = user2;
    }

    return {total, winnerId};
}

module.exports = getTotal;