import { data, appointments } from "./db.js";

const listOfTable = document.getElementById('appointment-list');

function renderTheAppointment(){
    
    const rows = appointments.map((appt) => {
        return `<tr>
            <td>${appt.id}</td>
            <td>${appt.patient}</td>
            <td>${appt.status}</td>
            <td><button>View To See</button></td>
        
        </tr>`

        
    });

    listOfTable.innerHTML = rows.join("");
  
};

renderTheAppointment();

let inputElement = document.getElementById('patientName');
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

inputElement.addEventListener("keyup", (event) =>{
    if(event.key === "Enter"){
        addPatient();
    }
});






