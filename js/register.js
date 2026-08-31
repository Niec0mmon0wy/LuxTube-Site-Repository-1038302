const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_PUBLISHABLE_KEY";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        alert("Passwords do not match.");
        return;
    }

    const { error } = await supabase.auth.signUp({

        email: email,
        password: password,

        options:{
            data:{
                username: username
            }
        }

    });

    if(error){

        alert(error.message);
        return;

    }

    alert("Account created! Please check your email to verify your account.");

    window.location.href = "login.html";

});