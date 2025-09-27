let login = document.getElementById("login")
login.addEventListener('click',(e)=>{
    window.location.href="index.html"
})

let verify_button = document.getElementById("verify_email")
verify_button.addEventListener('click',async (e)=>{
    let form = e.target.closest("form");
    if (!form.checkValidity()) {
        form.reportValidity(); // shows browser’s native messages
        return;
    }
    e.preventDefault();
    let email = document.getElementById("email").value;
    try{
        let response = await fetch(`https://customerrelationshipmanager-production.up.railway.app/owner/getOwnerByEmailId/${email}`)
        console.log(response)
        if(response.ok){
            let result = await response.text()
            console.log(result)
            if(result=="User found"){
                document.getElementById("idForLabelPassword").setAttribute("style","display: block;")
                document.getElementById("password").setAttribute("style","display: block;")
                document.getElementById("idForLabelRePassword").setAttribute("style","display: block;")
                document.getElementById("rePassword").setAttribute("style","display: block;")
                document.getElementById("verify_email").setAttribute("style","display: none;")
                document.getElementById("Change_password").setAttribute("style","display: block;")
                document.getElementById("password").setAttribute("required", true);
                document.getElementById("rePassword").setAttribute("required", true);

                let Change_password= document.getElementById("Change_password")

                Change_password.addEventListener('click',async (e)=>{
                    let password = document.getElementById("password").value
                    let rePassword = document.getElementById("rePassword").value
                    if(password!=rePassword){
                        alert("passwords doesn't match")
                    }else{
                        let data={
                            emailId:email,
                            password:password
                        }
                        console.log(data)
                        
                        try{
                            let response = await fetch("https://customerrelationshipmanager-production.up.railway.app/owner/forgot_password", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(data)
                            });
                            if (response.ok) {
                                let result = await response.text();
                                console.log(result)
                                if(result=="password updated successfully"){
                                    alert("password updated successfully");
                                    window.location.href="index.html"
                                }else{
                                    alert("There is no customer with this email id");
                                }
                            } else {
                                console.error("Error:", response.statusText);
                                alert("Failed to save customer!");
                            }
                        }catch{
                            console.error(err);
                            alert("Something went wrong");
                        }
                    }
                })

            }
        }
    }catch{
        console.error(err);
        alert("Something went wrong");
    }
})