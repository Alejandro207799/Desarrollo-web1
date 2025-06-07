const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue === '' || passwordValue === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Llamar a la API para obtener todos los usuarios
    fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(data => {
            const users = data.users;
            const user = users.find(u => 
                (u.username === usernameValue || u.email === usernameValue) &&
                u.password === passwordValue
            );

            if (user) {
                // Guardar el usuario en localStorage (opcional)
                localStorage.setItem('user', JSON.stringify(user));
                // Redirigir al dashboard
                window.location.href = "dashboard.html";
            } else {
                alert('Usuario o contraseña incorrectos.');
            }
        })
        .catch(error => {
            console.error('Error al consultar la API:', error);
            alert('Error al conectar con el servidor. Intenta más tarde.');
        });
});
