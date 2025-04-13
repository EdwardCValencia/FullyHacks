import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY'], // This is the default and can be omitted
});

async function main() {
    const stream = await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Alien' }],
        model: 'llama-4-scout-17b-16e-instruct',
        stream: true,
        });

        for await (const chunk of stream){
            process.stdout.write(chunk.choices[0]?.delta?.content || '')
        }

    // console.log(completionCreateResponse.choices[0].message.content);
}

main();