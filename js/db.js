

 const defaultData = [
    {id: 1, patient: "Coy", status: "Pending"},
    {id: 2, patient: "Ana", status: "Paid"},
    {id: 3, patient: "Louis", status: "Pending"}
   
];


 const storageData = localStorage.getItem("appointment");


export const appointments = storageData ? JSON.parse(storageData) : defaultData;
export function data(){
    localStorage.setItem("appointment", JSON.stringify(appointments));
    console.log("DB working")
}
console.log("Database Loading...")