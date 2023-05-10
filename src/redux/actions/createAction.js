import axios from 'axios'

export const userAuth = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5500/api/auth/login', {
                email: credentials.email,
                password: credentials.password,
            });
            if (response.data.success) {
                const token = response.data.authToken;
                localStorage.setItem("authToken1", token);

                dispatch({
                    type: 'userLogin',
                    payload: response.data.success,
                })
                // console.log(response.data.authToken);
                // console.log(response.data.success);
            } else {
                return console.log(response.data.error);
            }



            // console.log(response);
        } catch (error) {
            console.log('error', error);
        }


    }
}
export const userLogout = () =>{
    return async (dispatch) => {
        dispatch({
            type: 'userLogout',
            payload: false,
        })
    }
}