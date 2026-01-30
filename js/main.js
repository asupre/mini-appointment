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
            <td><button class="update-btn" data-id"${appt.id}">Edit</button></td>
        
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

const modal = document.getElementById("container-modal-popup");

const modalId = document.getElementById("modalID");
const modalName =document.getElementById("modalName");
const modalStatus = document.getElementById("modalStatus");
const saveBtn = document.getElementById("saveBtn");



listOfTable.addEventListener("click", (event) => {
    if(event.target.classList.contains('update-btn')){
        const update = Number(event.target.dataset.id);
        const everyIndex = appointments.findIndex(appt => appt.id === update);
        if(everyIndex){
            return modal.style.display = "block";

        }

    }
});




