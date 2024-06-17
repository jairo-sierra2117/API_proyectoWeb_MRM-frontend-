// Escuchar el evento de envío del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();  // Evitar el envío automático del formulario

    // Obtener los valores de email y contraseña del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Iniciando sesión con:', email, password);

    // Configurar los datos de la solicitud POST
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": email,
            "password": password
        })
    };

    try {
        console.log('Enviando solicitud a la API...');
        const response = await fetch("http://localhost:8080/api/auth/login", requestOptions);
        console.log('Respuesta de la API:', response);

        // Verificar si la respuesta es exitosa (código de estado HTTP 200-299)
        if (!response.ok) {
            console.error('Error en la respuesta de la API:', response.status, response.statusText);
            throw new Error('Error en el inicio de sesión');
        }

        // Extraer los datos JSON de la respuesta
        const data = await response.json();
        console.log('Datos recibidos:', data);  // Mostrar datos recibidos en la consola

        // Verificar si se recibió un accessToken en la respuesta
        if (data.accessToken) {
            // Almacenar el token en localStorage
            localStorage.setItem('accessToken', data.tokenType + data.accessToken);
            console.log('Token almacenado en localStorage');

            // Guardar el idRole en localStorage
            const idRole = data.rol[0].idRole; // Suponiendo que siempre hay un único rol
            localStorage.setItem('idRole', idRole);
            console.log('ID de Rol almacenado en localStorage:', idRole);

<<<<<<< HEAD
            // Redirigir según el tipo de usuario y rol obtenidos
            if (data.userType === 'EMPLEADO') {
                if (idRole === 1) {
                    console.log('Redirigiendo a BienvenidoAdm.html...');
                    window.location.href = '../Frotend/BienvenidoAdm.html';  // Redirigir a la página de administrador
                } else if (idRole === 2 || idRole === 3) {
                    console.log('Redirigiendo a BienvenidoEmpleado.html...');
                    window.location.href = '../Frotend/BienvenidoEmpleado.html';  // Redirigir a la página de empleado
=======
                // Redirigir según el tipo de usuario correguir!
                if (data.dtype === 'Empleado') {
                    window.location.href = '../Frotend/BienvenidoAdm.html';  // Redirige a la vista de bienvenida del empleado
                } else if (data.dtype === 'Cliente') {
                    window.location.href = '../Frotend/BienvenidoCliente.html';  // Redirige a la vista de bienvenida del cliente
>>>>>>> c6e05ef69cba9a96d5f8b9c3f2551fceb17cc511
                } else {
                    console.warn('Rol desconocido:', data.rol);
                    // Manejar el rol desconocido según tu lógica
                    // Por ejemplo:
                    // window.location.href = '../Frontend/ErrorPage.html';
                }
            } else if (data.userType === 'CLIENTE') {
                console.log('Redirigiendo a BienvenidoCliente.html...');
                window.location.href = '../Frotend/BienvenidoCliente.html';  // Redirigir a la página de cliente
            } else {
                console.warn('Tipo de usuario desconocido:', data.userType);
                // Manejar el tipo de usuario desconocido según tu lógica
                // Por ejemplo:
                // window.location.href = '../Frontend/ErrorPage.html';
            }
        } else {
            console.error('Token no encontrado en la respuesta:', data);
            throw new Error('Token de acceso no recibido');
        }

    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message);
        document.getElementById('loginMessage').innerText = 'Error en el inicio de sesión: ' + error.message;
    }
});
