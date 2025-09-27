let save_button = document.querySelectorAll(".save-btn")
save_button[0].addEventListener('click',async (e) => {
    let form = e.target.closest("form");
    if (!form.checkValidity()) {
        form.reportValidity(); // shows browser’s native messages
        return;
    }
    e.preventDefault(); // only stop submission if valid
    
    headers = new Headers();
    headers.set(
        "Authorization",
        "Basic " + btoa(sessionStorage.getItem("email") + ":" + sessionStorage.getItem("password"))
    );

    let firstname = document.getElementById("firstName").value;
    let lastname = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;

    let data = {
        firstName: firstname,
        lastName: lastname,
        emailId: email
    };
    console.log(JSON.stringify(data))

    try {
        let response = await fetch("https://customerrelationshipmanager-production.up.railway.app/Customer/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": headers.get("Authorization")
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let result = await response.json();
            console.log("Customer saved:", result);
            alert("Customer saved successfully!");
        } else {
            console.error("Error:", response.statusText);
            alert("Failed to save customer!");
        }
    } catch (err) {
        console.error("Request failed", err);
    }
})