let listOfCustomers
let headers
window.onload=()=>{
    if(sessionStorage.getItem("email")==null && sessionStorage.getItem("password")){
        window.location.href="index.html"
    }
    const params = new URLSearchParams(window.location.search);
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");
    console.log(email, password);

    // Encode credentials as Base64
    headers = new Headers();
    headers.set(
    "Authorization",
    "Basic " + btoa(email + ":" + password)
    );
    fetch("https://customer-relationship-manager-latest-nlml.onrender.com/Customer/get",{headers})
        .then(result => result.json())
        .then(data => {
            console.log(data);
            listOfCustomers=data
            renderAllCustomers();
        })
        .catch(err => console.error(err));
}
document.getElementsByClassName("logout-btn")[0].addEventListener('click',(e)=>{
    sessionStorage.clear()
    window.location.href="index.html"
})
function renderAllCustomers(){
    let tbody = document.getElementById("customersTable");
    tbody.innerHTML = ""; 
    listOfCustomers.forEach(element => {
        tbody.innerHTML+=`
        <tr>
        <td>${element.firstName}</td>
        <td>${element.lastName}</td>
        <td>${element.emailId}</td>
        <td class="action"><a href="update_customer.html?id=${element.emailId}" class="edit-link">Update</a> | <a class="delete-link" href="#" onclick="deleteCustomer('${element.emailId}')">Delete</a></td>
      </tr>
        `;
    })
}

async function deleteCustomer(email) {
    try {
        let response = await fetch(`https://customer-relationship-manager-latest-nlml.onrender.com/Customer/delete/${email}`, {
            method: "DELETE",
            headers
        });

        if (response.ok) {
            listOfCustomers = listOfCustomers.filter(c => c.emailId !== email);
            renderAllCustomers();
            alert("Customer Deleted successfully!");
        } else {
            alert("Failed to delete customer! " + response.status);
        }
    } catch (err) {
        console.error("Request failed", err);
    }
}

// login -> index
// index -> home