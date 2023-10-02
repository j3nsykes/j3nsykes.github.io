//read CSV data
// async function apiLoad() {
//     await fetch("http://functionalerrors.com/api").then(async res => await res.json())
//         .then(async res => {
//             console.log(res);

//         });
// }

// Example POST method implementation:
async function postInput(data) {
    // POST request using Fetch API
    await fetch('https://functionalerrors.com/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                console.log('Request succeeded.');
            } else {
                console.log('Request failed with status:', response.status);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function sendData() {
    document.getElementById('myForm').addEventListener('submit', function (event) {
        // Prevent the form from submitting (prevents page refresh)
        event.preventDefault();

        const name = 'jen'
        const understood = 5
        const changes = 2
        const analysis = 'good stuff'
        const shield = true
        const page_id = 3

        const testVals = {
            "name": name,
            "understood": understood,
            "changes": changes,
            "shield": shield,
            "page_id": page_id,
            "analysis": analysis
        };
        let sendValues = JSON.stringify(testVals)
        console.log(sendValues)
        postInput(testVals);
    });
}

async function hashName() {
    // Get the name from the input
    //const name = document.getElementById("name").value;
    const name = 'lula sykes'

    // Convert the name to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(name);

    // Hash the name using SHA-256
    const hashed = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash from an ArrayBuffer to a hex string for display
    const hashArray = Array.from(new Uint8Array(hashed));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Display the hash
    //document.getElementById("hashedName").innerText = hashHex;
    console.log("hashCode:" + hashHex)
}