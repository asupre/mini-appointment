import { data, appointments } from "./db.js";


/*READ AREA */
const listOfTable = document.getElementById('appointment-list');
const totalPricesElement = document.getElementById("totalPrices");

function renderTheAppointment(list = appointments){
    
    const rows = list.map((appt) => {
        return `<tr>
            <td>${appt.id}</td>
            <td>${appt.patient}</td>
            <td>${appt.status}</td>
            <td>${appt.price}</td>
            <td><button class="delete-btn" data-id="${appt.id}">Delete</button></td>
            <td><button class="update-btn" data-id="${appt.id}">Edit</button></td>
        
        </tr>`

        
    });

  
    listOfTable.innerHTML = rows.join("");

    calculateTotalPrices(list); 
  
};

renderTheAppointment();



/*END OF READ AREA */


/*CREATE AREA */
const inputElement = document.getElementById('patientName');
const status = document.getElementById('patientStatus');
const btn = document.getElementById('addBtn');
const priceInput = document.getElementById('patientPrice');

function addPatient(){
    const inputValue = inputElement.value ;


    if(inputValue === ""){
        return alert("Please Enter a Name");
    }
       if(priceInput.value === ""){
        return alert("Please Enter a Price");
    }


    const newAppointment = {
        id: appointments.length + 1,
        patient: inputValue,
        status: status.value,
        price: Number(priceInput.value)
    }

    appointments.push(newAppointment);
    
    data();
    renderTheAppointment();
    
    inputElement.value = "";
    priceInput.value = "";
    
};

btn.addEventListener("click", () => {
    addPatient();
});

inputElement.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        addPatient();

    }
});

/*END OF CREATE AREA */


/*DELETE BTN LOGIC */
listOfTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
    const idToDelete = Number(event.target.dataset.id);
    const index = appointments.findIndex(appt => appt.id === idToDelete);

    if (index > -1) {
        // 1. Remove from Array
        appointments.splice(index, 1);
        
        // 2. SAVE TO DB (The missing line)
        data(); 

        // 3. Re-render
        renderTheAppointment();
    }
}
});
/*END OF DELETE BTN AREA */


/*OPEN MODAL LOGIC AREA */


/*Getting the modal information and storing it in the function */

const modal = document.getElementById("container-modal-popup");


const modalName = document.getElementById("modalName");
const modalStatus = document.getElementById("modalStatus");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const modalPrice = document.getElementById("modalPrice");


function addModalPatient(){
    const theValueOfEverything = modalName.value + Number(modalPrice.value);
    

    if(theValueOfEverything === ""){
        return alert("Please enter what is required!")
    }

    const patientIndex = appointments.findIndex(appt => appt.id === currentlyEditingId);
    
    if(patientIndex > -1){
        appointments[patientIndex].patient = modalName.value;
        appointments[patientIndex].status = modalStatus.value;
        appointments[patientIndex].price = Number(modalPrice.value);
    }

    

    data();

    renderTheAppointment();
    

    modal.style.display = "none";

    currentlyEditingId = null;

    
}
/*End of the function */


/*Edit button logic */

let currentlyEditingId = null;

listOfTable.addEventListener("click", (event) => {
    if(event.target.classList.contains('update-btn')){
        const update = Number(event.target.dataset.id);
        const patient = appointments.find(appt => appt.id === update);
        if(patient){
            currentlyEditingId = update;
            modalName.value = patient.patient
            modalStatus.value = patient.status
            modalPrice.value = patient.price

            modal.style.display = "block";

        }
     
    }
});
/*End of edit button logic */


saveBtn.addEventListener("click", () => {
    addModalPatient();
    
});


modalName.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        addModalPatient();
    };
});
modalPrice.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        addModalPatient();
    };
});
modalStatus.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        addModalPatient();
    };
});

cancelBtn.addEventListener("click", () => {modal.style.display = "none"});


/*END OF EDIT MODAL*/

/*START OF FILTERLING THE NAMES OF PATIENTS */

const searchPatient = document.getElementById("searchPatient");

searchPatient.addEventListener("keyup", (event) =>{
    const searchText = event.target.value.toLowerCase();

    const filteredList = appointments.filter(appt => appt.patient.toLowerCase().includes(searchText));

    renderTheAppointment(filteredList);
});

/*END OF FILTERING THE NAMES OF PATIENTS */


function calculateTotalPrices(list){
    const filteredPrices = list.filter((appt) => appt.status === "Paid");
    const mappingPrices = filteredPrices.map((appt) => appt.price);

    
    const initialValue = 0;
    const sumWithInitial = mappingPrices.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

    if(totalPricesElement){
        totalPricesElement.innerText = `$${sumWithInitial}`;
    }
}

