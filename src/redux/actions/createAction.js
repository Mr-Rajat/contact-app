import axios from 'axios'

// user Authentication Actions.

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

export const createUser = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5500/api/auth/createuser', {
                name:credentials.name,
                email: credentials.email,
                password: credentials.password,
            });
            if (response.data.success) {
                const token = response.data.authToken;
                console.log(token);
                console.log(response.data)
                // localStorage.setItem("authToken1", token);

                dispatch({
                    type: 'userRegister',
                    payload: response.data.success,
                })
                
                // dispatch ({
                //     type: 'userRegister',
                //     payload: false,
                // })
                
                // console.log(response.data.authToken);
                // console.log(response.data.success);
            } else {
                return console.log("inside try",response.data.error);
            }



            // console.log(response);
        } catch (error) {
            dispatch ({
                    type: 'userRegister',
                    payload: false,
                })
            console.log('error', error);
            console.clear();
        }


    }
}

// user Data actions

export const fetchData = (token) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5500/api/contacts/fetchallcontacts', {
                headers: {
                    'auth-token': token,
                  },
            });
            
            // console.log(response.data)

                dispatch({
                    type: 'userContacts',
                    payload: response.data,
                })
                // console.log(response.data.authToken);
                // console.log(response.data.success);
            



            // console.log(response);
        } catch (error) {
            console.log('error', error);
        }


    }
}


export const addData = (contactData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:5500/api/contacts/addcontact',{
                name: contactData.name,
                email: contactData.email,

            },
             {
                headers: {
                    'auth-token': localStorage.getItem('authToken1'),
                  },
            });
            
            // console.log(response.data)

                // dispatch({
                //     type: 'addContacts',
                //     payload: response.data,
                // })
                // console.log(response.data.authToken);
                // console.log(response.data.success);
            



            // console.log(response);
        } catch (AxiosError) {
            console.log('error', AxiosError.message);
        }


    }
}
