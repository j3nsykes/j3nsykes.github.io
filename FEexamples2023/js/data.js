//console.log('found page');

// function test() {
//     console.log("test");
// }

function inputData() {
    document.getElementById('myForm').addEventListener('submit', function (event) {
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
        const dropdown = document.getElementById('nameDropdown');
        const shield = document.getElementById('shieldDropdown');
        const pageID = document.body.id;

        // Only log values if conditions are met
        if (selectedValue && textInput) {
            console.log("Selected radio button:", selectedValue);
            console.log("Text input:", textInput);
            console.log('Selected name:', dropdown.value);
            console.log('Page ID:', pageID);  // Outputs: "page1"
            if (shield.value != null) {
                console.log('Feedback Shield Used:', shield.value)
            }
            else {
                const shield = false //set true/false to zero as default
            }
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
const namesJson = '["Jen","Lula","Doe","Smith"]';
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

