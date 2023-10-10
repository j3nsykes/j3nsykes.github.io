let inputName
let shieldBool
let inputChanges
let inputMetric
let inputAnalysis
let inputPageID
let hashCode

// Example POST method implementation:
async function postInput(data) {
    console.log('send')
    // POST request using Fetch API
    await fetch('https://functionalerrors.com/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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



function sendData(input_name, understood, changes, shield, page_id, analysis) {

    //debug
    /*
    input_name = 'jen'
    understood = 5
    changes = 2
    analysis = 'good stuff'
    shield = true
    page_id = 3
    */

    const testVals = {
        "name": input_name,
        "understood": understood,
        "changes": changes,
        "shield": shield,
        "page_id": page_id,
        "analysis": analysis
    };

    //let sendValues = JSON.stringify(testVals)
    //console.log(testVals)
    postInput(testVals);


}

async function hashName(name) {
    // Convert the name to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(name); // Get the name from the input

    // Hash the name using SHA-256
    const hashed = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash from an ArrayBuffer to a hex string for display
    const hashArray = Array.from(new Uint8Array(hashed));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Display the hash
    //document.getElementById("hashedName").innerText = hashHex;
    //console.log("hashHex:" + hashHex)
    hashCode = hashHex
    // console.log("hashCode:" + hashCode)

}

function getCSV() {
    document.getElementById('getCSV').addEventListener('click', function () {
        console.log('get CSV')
        getData();


    });
}

async function getData() {
    await fetch("https://functionalerrors.com/csv").then(async res => await res.text())
        .then(async res => {
            console.log(res);
        });


}




function inputData() {
    document.getElementById('myForm').addEventListener('submit', async function (event) {
        // Prevent the form from submitting and the page from reloading
        event.preventDefault();

        // Get the selected radio button value
        let radios = document.getElementsByName('choice');
        let selectedValue = null;
        for (let radio of radios) {
            if (radio.checked) {
                selectedValue = radio.value;
                break;
            }
        }

        // Get the text from the textarea
        let textInput = document.getElementById('textAreaInput').value.trim(); // .trim() removes whitespace from start and end
        const dropdown = document.getElementById('nameDropdown').value;
        const shield = document.getElementById('shieldDropdown');
        const pageID = document.body.id;
        const numChanges = document.getElementById('numBox')
        await hashName(dropdown)

        // Only log values if conditions are met
        if (selectedValue && textInput) {
            // console.log("Selected radio button:", selectedValue);
            // console.log("Text input:", textInput);
            // console.log('Selected name:', dropdown);
            // console.log('coded name:', hashCode);
            // console.log('Page ID:', pageID);  // Outputs: "page1"
            // console.log('num chnages:', numChanges.value)
            //inputs
            inputMetric = parseInt(selectedValue) //linker sclae
            inputName = String(hashCode)
            inputPageID = parseInt(pageID)
            inputAnalysis = textInput
            inputChanges = parseInt(numChanges.value)


            if (shield.value != null) {
                console.log('Feedback Shield Used:', shield.value)
                if (shield.value == 'No') {
                    shieldBool = false
                }
                else {
                    shieldBool = true
                }
            }
            console.log('shield val', shieldBool)

            //send to API
            sendData(inputName, inputMetric, inputChanges, shieldBool, inputPageID, inputAnalysis)

        } else {
            if (!selectedValue) {
                console.log("Please select a score.");
            }
            if (!textInput) {
                console.log("Please enter text into the textarea.");
            }
        }

    });
}

function addNames() {
    document.getElementById('addNameButton').addEventListener('click', function () {
        const dropdown = document.getElementById('nameDropdown');
        const newName = document.getElementById('newNameInput').value.trim();

        if (newName) { // Only add if there's a non-empty name
            const newOption = document.createElement('option');
            newOption.value = newName;
            newOption.textContent = newName;
            dropdown.appendChild(newOption);

            // Optionally, you can clear the input box after adding the name:
            document.getElementById('newNameInput').value = '';
        }
    });
}

// Sample JSON data
const namesJson = '["Jen","Chigbu","Hollis","Lily", "Jessica", "Rysia", "Alex", "Jade", "Kesia", "Fraser", "Du", "Jonny", "Iman", "Shauna"]';
// Parse the JSON data
const namesArray = JSON.parse(namesJson);
// Get the dropdown element by ID
const dropdown = document.getElementById('nameDropdown');

// Function to populate the dropdown with the names
function populateDropdown(data) {
    // Clear existing options
    dropdown.innerHTML = "";

    data.forEach(name => {
        const optionElement = document.createElement('option');
        optionElement.value = name;
        optionElement.innerText = name;
        dropdown.appendChild(optionElement);
    });
}

// Call the populateDropdown function with the namesArray
populateDropdown(namesArray);

