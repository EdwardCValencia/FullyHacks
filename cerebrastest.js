// import Cerebras from '@cerebras/cerebras_cloud_sdk';

// const client = new Cerebras({
//   apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
// });

// async function main() {
//     const stream = await client.chat.completions.create({
//         messages: [{ role: 'user', content: 'Alien' }],
//         model: 'llama-4-scout-17b-16e-instruct',
//         stream: true,
//         });

//         for await (const chunk of stream){
//             process.stdout.write(chunk.choices[0]?.delta?.content || '')
//         }

//     // console.log(completionCreateResponse.choices[0].message.content);
// }

// main();
let data={
    "game_id": "f16fa16d-3aaa-4406-ba13-03560e5deb89",
    "message": "test"
}

console.log(data)
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
        console.log(data)
    })

