import { data, appointments } from "./db.js";


/*READ AREA */
const listOfTable = document.getElementById('appointment-list');

function renderTheAppointment(){
    
    const rows = appointments.map((appt) => {
        return `<tr>
            <td>${appt.id}</td>
            <td>${appt.patient}</td>
            <td>${appt.status}</td>
            <td><button class="delete-btn" data-id="${appt.id}">Delete</button></td>
            <td><button class="update-btn" data-id="${appt.id}">Edit</button></td>
        
        </tr>`

        
    });

    listOfTable.innerHTML = rows.join("");
  
};

renderTheAppointment();

/*END OF READ AREA */


/*CREATE AREA */
const inputElement = document.getElementById('patientName');
const status = document.getElementById('patientStatus');
const btn = document.getElementById('addBtn');


function addPatient(){
    const inputValue = inputElement.value ;

    if(inputValue === ""){
        return alert("Please Enter a Name");
    }

    const newAppointment = {
        id: appointments.length + 1,
        patient: inputValue,
        status: status.value

    }

    appointments.push(newAppointment);
    
    data();
    renderTheAppointment();
    
    inputElement.value = "";
    
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
const cencelBtn = document.getElementById("cancelBtn");


function addModalPatient(){
    const theValueOfEverything = modalName.value;

    if(theValueOfEverything === ""){
        return alert("Please enter what is required!")
    }

    const patientIndex = appointments.findIndex(appt => appt.id === currentlyEditingId);
    
    if(patientIndex > -1){
        appointments[patientIndex].patient = modalName.value;
        appointments[patientIndex].status = modalStatus.value;
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

            modal.style.display = "block";

        }

    }
});
/*End of edit button logic */


saveBtn.addEventListener("click", (event) => {
    addModalPatient();
});


modalName.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        addModalPatient();
    };
});

cancelBtn.addEventListener("click", (event) => {modal.style.display = "none"});