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

export function login(e) {
	// Select the login form
	const loginForm = document.querySelector('#loginForm');
	// Add event listener to the form submission
	loginForm.addEventListener('submit', handleSubmitLogin);
}

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

export function displayLoginForm() {
    const authForm = document.getElementById('auth');

    if (checkLoginStatus() === true ) {
        authForm.style.display = 'none';}
    else {
        authForm.style.display = 'block';
    }
}

// export function importLogin(){
//     let loginPage = document.getElementById("login-page")
// }

export function importLogin(){
    console.log("qweqweqweqwe");
    let loginPage = document.getElementById("login-page");
    loginPage.innerHTML = 
    "<form>" +
        "<h1>Formulario</h1>"+
            "<input type ='text'id='DNI' placeholder='DNI' > </input>"+
            "<input type='text' id='nombre' placeholder='Nombre' > </input>"+
            "<input type='text' id='apellidos' placeholder='Apellidos' ></input>"+
            "<input type='text' id='direccion' placeholder='Direccion'></input >"+
            "<label for='opcion1' ><input type='radio' name=´grupo1´>Opcion1 G1</label>"+
            "<label for='opcion2' ><input type='radio'name=´grupo1´>Opcion2 G1</label>"+
            "<label for='opcion3' ><input type='radio'name=´grupo1´>Opcion3 G1</label>"+
            "<label for='opcion4' ><input type='radio'name=´grupo1´>Opcion4 G1</label><br><br>"+
            "<label for='opcion1' ><input type='radio'name=´grupo2´>Opcion1 G2</label>"+
            "<label for='opcion2' ><input type='radio'name=´grupo2´>Opcion2 G2</label>"+
            "<label for='opcion3' ><input type='radio' name=´grupo2´>Opcion3 G2</label>"+
            "<label for='opcion4' ><input type='radio' name=´grupo2´>Opcion4 G2</label>"+
            "<br><br>"+
            "<label> <input type='checkbox' id='cbox1' > 1 Checkbox </label><br>"+
            "<label><input type='checkbox' id='cbox2'> 2 Checkbox</label>"+
            "<br> <label> <input type='checkbox' id ='cbox3'> 3 Checkbox </label>"+
            "<br><label><input type='checkbox' id='cbox4'> 4 Checkbox</label> <br> "+
            "<label><input type='checkbox' id='cbox5' > 5 Checkbox </label><br><br> "+
            "<img src='http://www.acn.cu/images/2019/OCTUBRE/1015-programaci%C3%B3n.jpg' width='500 ' height='600 '> "+
            "<img src='https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800' width='500' height='600'><br>"+
            "<select name='select'>"+
                    "<option value='value1'>Value 1</option>"+
                    "<option value='value2' selected>Value 2</option>"+
                    "<option value='value3'>Value 3</option>"+
            "</select>"+
            "<textarea name='textarea' rows='10' cols='50'>Escribir algo aqui</textarea>   <input type='submit' value='Enviar'>"+ 
    "</form>";

    // let loginPage = document.getElementById("login-page");
    // loginPage.innerHTML = `
    //     <div class="box">
    //         <div class="form">
    //             <h2><b>Login 42 transcende</h2>
    //             <div class="inputBox">
    //                 <input type="text" required="required">
    //                 <span>Username</span>
    //                 <i></i>
    //             </div>
    //             <div class="inputBox">
    //                 <input type="text" required="required">
    //                 <span>Password</span>
    //                 <i></i>
    //             </div>
    //             <div class="links">
    //                 <a href="#">Forget your password?</a>
    //                 <a href="#">Sing up</a>
    //             </div>
    //             <div class="login-buttons">
    //                 <input type="submit" value="Login">
    //                 <input type="submit" value="Login with 42"
    //                     class="login-42" onclick="location.href='https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-fabc70636434a6e13642cb70d96dd9b25d6d0d1416e676828df55c45808e06bc&redirect_uri=http%3A%2F%2Flocalhost%3A80&response_type=code'">
    //             </div>
    //         </div>
    //     </div>`;
}


export function inicializarEventos(){
    
    document.getElementById("htmlLogin").addEventListener("click", importLogin);
  }
  
//   window.onload = function (){
//     inicializarVariables();
//     inicializarEventos();
//   }