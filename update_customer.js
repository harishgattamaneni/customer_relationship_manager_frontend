window.onload = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    if (!id || !email || !password) return;

    headers = new Headers();
    headers.set(
        "Authorization",
        "Basic " + btoa(email + ":" + password)
    );

    fetch(`https://customerrelationshipmanager-production.up.railway.app/Customer/getbyid/${id}`,{headers})
        .then(result => result.json())
        .then(data => {
            console.log(data);
            renderElements(data);
        })
        .catch(err => console.error(err));
}
let PreviousEmailId
function renderElements(customer){
    document.getElementById("firstName").value = customer.firstName;
    document.getElementById("lastName").value = customer.lastName;
    document.getElementById("email").value = customer.emailId;
    PreviousEmailId = customer.emailId;
}


let save_button = document.querySelectorAll(".save-btn")
save_button[0].addEventListener('click',async (e) => {

    let form = e.target.closest("form");
    if (!form.checkValidity()) {
        form.reportValidity(); // shows browser’s native messages
        return;
    }
    e.preventDefault(); // only stop submission if valid
    
    let firstname = document.getElementById("firstName").value;
    let lastname = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;

    let data = {
        firstName: firstname,
        lastName: lastname,
        emailId: email,
        previousEmailId: PreviousEmailId
    };
    console.log(JSON.stringify(data))

    try {
        let response = await fetch("https://customerrelationshipmanager-production.up.railway.app/Customer/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": headers.get("Authorization")
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let result = await response.json();
            console.log("Customer saved:", result);
            PreviousEmailId=email
            alert("Customer details updated successfully!");
        } else {
            console.error("Error:", response.statusText);
            alert("Failed to save customer!");
        }
    } catch (err) {
        console.error("Request failed", err);
    }
})