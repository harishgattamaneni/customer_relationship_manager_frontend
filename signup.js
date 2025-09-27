let save_button = document.querySelectorAll(".save-btn")
save_button[0].addEventListener('click',async (e)=> {
    let form = e.target.closest("form");
    if (!form.checkValidity()) {
        form.reportValidity(); // shows browser’s native messages
        return;
    }
    e.preventDefault(); // only stop submission if valid
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let data = {
        emailId: email,
        password: password
    };
    try {

        let response = await fetch("https://customerrelationshipmanager-production.up.railway.app/owner/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let result = await response.text();
            console.log(result)
            if(result=="Owner Added"){
                alert("Owner saved successfully!");
            }else{
                alert("Owner with specified email is already registered");
            }
        } else {
            console.error("Error:", response.statusText);
            alert("Failed to save customer!");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }

})

let button = document.querySelectorAll(".button")
button[0].addEventListener('click',(e)=>{
    window.location.href = `index.html`
})