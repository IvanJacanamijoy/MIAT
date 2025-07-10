const API_BASE_URL = 'http://localhost:3000'; // O tu base URL

//pendiente hacer la logica de inicio y registro
export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        });
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.error(`Hay un error : ${error}`);
    }
}

export const register = async ( formData ) => {
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData}),
        });
        return await response.json();
    }catch(error){
        console.error('Hubo un error registrando al usuario : ' + error)
    }

}