import * as db from '$lib/server/database.js';
import { invalidateAll, invalidate } from '$app/navigation';
import { get } from 'svelte/store'; // Import the 'get' function
import { chatMSG } from '$lib/stores/chatStore.js'; // Import the store

export async function load({ cookies }) {
	// let id = cookies.get('userid');

	// if (!id) {
	// 	id = crypto.randomUUID();
	// 	cookies.set('userid', id, { path: '/' });
	// }
    cookies.delete('sessionStarted', {path: '/'})
    cookies.delete('gameID', {path: '/'})

    let gameData = null;
    let error = null;
    const inSession = cookies.get('sessionStarted');

    if (!inSession){
        
        try {
            const response = await fetch('https://alienbackend.onrender.com/start_game',{method: 'POST'})

            if(!response.ok){
                throw new Error(`Connection Error: ${response.status}`)
            }
            gameData = await response.json();
            const gameid = gameData.game_id
            console.log('GameData: ', typeof(gameid));
            cookies.set('sessionStarted','true', {path: '/'})
            cookies.set('gameID',gameid, {path: '/'})
        }
        catch(e){
            console.error('Error in game call',e);
            error = "Failed to start game";
        }
    }
    else{
        console.log('Session Already started')
    }
    
    // console.log(db.getMessages(id));
    // console.log(db.chatMSG)
    console.log('ChatMSG from store in load:', get(chatMSG));
	return {
		messages: get(chatMSG),
        gameID: gameData,
	};
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		await db.sendMessage(cookies.get('gameID'), data.get('msg'));
        // throw invalidateAll()
        return {success: true}
	}
};

function startGame(){
    fetch('https://alienbackend.onrender.com/start_game',{method: 'POST'})
    .then(res => {
        if (!res.ok){
            throw new Error("Connection Error!")
        }
        return res.json();
    })
    .then(data => {
        console.log(data)
    })
}