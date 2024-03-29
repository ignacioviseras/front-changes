let loginPageView = true;
let singUpPageView = true;

async function handleSubmitRegister(e) {
    e.preventDefault()
    // Get the input values
    const username = document.querySelector('#new_username').value;
	const password = document.querySelector('#new_password').value;

	const loginData = {
        username: username,
        password: password,
    };
    try {
        const response = await fetch('http://localhost:80/api/pong_auth/register/', {
    	    method: 'POST',
            headers: {
        	'Content-Type': 'application/json',
            },body: JSON.stringify(loginData),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }
    catch (error) {
            console.error('Error:', error.message);
    }
        
}

export function register(e) {
	// Select the login form
	const registerForm = document.querySelector('#RegisterForm');
	// Add event listener to the form submission
	registerForm.addEventListener('submit', handleSubmitRegister);
}

async function handleSubmitLogin (e) {
	e.preventDefault()
	// Get the input values
	const username = document.querySelector('#username').value;
	const password = document.querySelector('#password').value;

	const loginData = {
        username: username,
        password: password,
      };
	try {
    // Make a POST request to the specified endpoint
        const response = await fetch('http://localhost:80/api/pong_auth/login/', {
    	method: 'POST',
        headers: {
        	'Content-Type': 'application/json',
        },body: JSON.stringify(loginData),
    });
    if (!response.ok) {
    	throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Check if the response content type is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format. Expected JSON.');
    }

    const data = await response.json();
    // Handle the response data as needed
	const token = data.access_token;
	localStorage.setItem('token', token);
    console.log(data);
    } catch (error) {
    	console.error('Error:', error.message);
	}
}

// export function login(e) {
// 	// Select the login form
// 	const loginForm = document.querySelector('#loginForm');
// 	// Add event listener to the form submission
// 	loginForm.addEventListener('submit', handleSubmitLogin);
// }

export async function callback42(e) {
	const urlParams = new URLSearchParams(window.location.search);
	const authorizationCode = urlParams.get('code');

    // Make a POST request to your backend with the authorization code
    if (authorizationCode) {
        const response = await fetch('http://localhost:80/api/pong_auth/42/callback/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: authorizationCode,
            }),
        })
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		data = await response.json()
		const token = data.access_token;
		localStorage.setItem('token', token);
    } else {
        console.error('Authorization code not found in the URL.');
    }
}

export function checkLoginStatus() {
	return localStorage.getItem('token') !== null;
}

// export function displayLoginForm() {
//     const authForm = document.getElementById('auth');

//     if (checkLoginStatus() === true ) {
//         authForm.style.display = 'none';}
//     else {
//         authForm.style.display = 'block';
//     }
// }

// export function importLogin(){
//     let loginPage = document.getElementById("login-page")
// }

export function importLogin(){
    console.log("qweqweqweqwe");
    loginPageView = !loginPageView; // Cambia el estado de la variable
    let loginPage = document.getElementById("login-page");
    if (loginPageView) {
        Promise.all([
            fetch('./login/login.html').then(response => response.text()),
            fetch('./login/login.css').then(response => response.text())
        ]).then(([html, css]) => {
            loginPage.innerHTML = html;
            let style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
        }).catch(error => {
            console.error('Error al cargar el formulario:', error);
        });
    } else {
        loginPage.innerHTML = ""
    }
}

export function importSingUp(){
    console.log("qweqweqweqwe");
    singUpPageView = !singUpPageView; // Cambia el estado de la variable
    let singUpPage = document.getElementById("sing-up-page");
    if (singUpPageView) {
        Promise.all([
            fetch('./sing-up/sing-up.html').then(response => response.text()),
            fetch('./sing-up/sing-up.css').then(response => response.text())
        ]).then(([html, css]) => {
            singUpPage.innerHTML = html;
            let style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
        }).catch(error => {
            console.error('Error al cargar el formulario:', error);
        });
    } else {
        singUpPage.innerHTML = ""
    }
}


export function inicializarEventos() {
    document.getElementById("htmlLogin").addEventListener("click", importLogin);
    document.getElementById("html-sing-up").addEventListener("click", importSingUp);
}
  
//   window.onload = function (){
//     inicializarVariables();
//     inicializarEventos();
//   }