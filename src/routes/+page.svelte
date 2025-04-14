<script>
    function checkSubmit(e) {
        if (e && e.key === 'Enter') {
            console.log('Enter key pressed!'); // Debugging line
            e.preventDefault();
            const form = e.target.form;
            if (form) {
                console.log('Form element found:', form); // Debugging line
                form.requestSubmit();
                console.log('Form submitted programmatically'); // Debugging line
            } else {
                console.log('Form element not found.'); // Debugging line
            }
        }
    }
    import { invalidate, goto } from '$app/navigation';
    let data = $props();
    console.log('Entire data prop in component:', data);

    import { chatMSG } from '$lib/stores/chatStore.js';
   
    import { enhance } from '$app/forms'
    import {page} from '$app/stores'
    function handleSubmit(){
        return async ({ result }) => {
            if (result.type === 'success') {
                $page.data.invalidate(); // Invalidate the data after successful submission
            }
        };
    }
    const messages = $derived(chatMSG);
</script>

<svelte:head>
    <title>Alien Encounters</title>
    <link rel="preconnect" href="https://font.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400&display=swap" rel="stylesheet">
</svelte:head>

<main>
    <p>Alien Communication</p>

    <div id="frame" class="crt">
        <img id="crt_overlay" src="/src/lib/images/crt_overlay.png" alt="test">
       
        
        <ul id="chat" class="crt">
            {#each data?.data?.messages as message}
                <li class="crt">
                    {message}
                </li>
            {/each}
        </ul>
        <!-- <form id= "monitor" class="crt">All your base are belong to us</form> -->

        <!-- <form>
            <input type="text" id="monitor" class="crt" name="userInput">
        </form> -->
        
        <form method="POST" use:enhance>
            <label for="msg" id="msgLbl" class="crt">Write a message:
            <input
            name="msg" 
            id="monitor" 
            class="crt" 
            autocomplete="off"
            onkeydown={checkSubmit}
            />
            </label>
        </form>
        
    </div>
</main>

<style>
    * {
        font-family: 'Courier New', Courier, monospace;
        font-weight: 600;
        font-size: large;
    }
    li{
        list-style-type: none;
        font-size: 2rem;
        background: transparent;
    }
    main {
        /* align-items: center; */
        justify-content: center;
    }
    p {
        text-align: center;
    }
    
    div {
        position: relative;
        border-radius: 100px;
        overflow: hidden;
    }

    #msgLbl{
        font-size: 2rem;
        height:auto;
        margin-top: -20%;
    }
    
    #crt_overlay {
        width: 80rem;
        height: 55rem;
        pointer-events: none;
        z-index: 9999;
    }

    #frame {
        width: 80rem;
        height: 55rem;
        background-color: graywhite;
        margin: auto;
        border-radius: 25px;
    }

    .crt {
        background: linear-gradient(#000000, #000000, #333333, #333333);
        background-size: cover;
        background-size: 100% 8px;
        font-family: "Silkscreen", sans-serif;
        font-weight: 400;
        font-style: normal;
        z-index: 1;
        color: rgba(128, 255, 0, 0.75);
    }

    #chat {
        text-align: center;
        font-size: 4rem;
        position: absolute;
        left: 20%;
        margin-top: 2rem;
        color: rgba(128, 255, 0, 0.75);
        background: transparent;
        width: 60%;
        height: 50%;
        margin-top: -50%;

    }

    #monitor {
        font-size: 2rem;
        width: 70%;
        height: 100px;
        resize: none;
        border: 2px solid rgba(128,255,0,0.75);
        color: rgba(128, 255, 0, 0.75);
        position: absolute;
        text-align:center;
        display: block;
        margin-left: 15%;
        margin-bottom: 3%;
        bottom: 0;
        left: 0;
        z-index: 0;
        background: transparent;
        caret-shape: block;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        outline: none;
    }

    @media screen {
        .crt {
            animation: scanlines infinite 55s linear ;
        }
    }
    @keyframes scanlines {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 0 -10px;
        }
    }
    
</style>