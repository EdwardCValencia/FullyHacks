const db = new Map()

export function getMessages(userid) {
	if (!db.get(userid)) {
		db.set(userid, [{
			id: crypto.randomUUID(),
			msg: 'Hello',
		}]);
	}
    return db.get(userid)
}
export function sendMessage(userid,msg){
    const messages = db.get(userid);

    messages.push({
        id: crypto.randomUUID(),
        msg
    });
}