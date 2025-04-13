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
export function sendMessage(gameID,msg){
    // const messages = db.get(userid);
    
    // messages.push({
    //     id: crypto.randomUUID(),
    //     msg
    // });
    console.log(gameID,msg)

    chatMSG.push(msg)

   return askAlien(gameID,msg)


}

export let chatMSG = []

function  askAlien(gameID,msg){
    const data = {
        "game_id": gameID,
        "message": msg
    }
    
    fetch('https://alienbackend.onrender.com/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Or the appropriate content type
        },
        body: JSON.stringify(data)})
        .then(res => {
            if (!res.ok){
                throw new Error("Connection Error!")
            }
            return res.json();
        })
        .then(data => {
            chatMSG.push(data.response)
            console.log(data.response)
            return data;
        })
    
    
}