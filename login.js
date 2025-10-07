document.getElementById("forgot_password").addEventListener('click',(e)=>{
    window.location.href="forgot_password.html"
})
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

    const headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(email + ":" + password))

    try {
        let response = await fetch("https://customer-relationship-manager-latest-nlml.onrender.com/owner/dummy", { headers });

        if (response.status === 401) {
            // Credentials incorrect
            alert("Credentials incorrect");
            return; // stop execution
        }

        // If credentials are correct (status 200)
        let data = await response.text();

        if (data === "login checked") {
            window.location.href = "home.html";
            sessionStorage.setItem("email",email)
            sessionStorage.setItem("password",password)
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }

})

let button = document.getElementById("signup").addEventListener('click',(e)=>{
    window.location.href = `signup.html`
})