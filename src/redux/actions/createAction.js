import axios from 'axios'
import api from '../axiosConfig'

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
export const userLogout = () => {
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
                name: credentials.name,
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
                return console.log("inside try", response.data.error);
            }



            // console.log(response);
        } catch (error) {
            dispatch({
                type: 'userRegister',
                payload: false,
            })
            console.log('error', error);
            console.clear();
        }


    }
}

// user Data actions

export const fetchData = () => {
    return async (dispatch) => {
        try {
            const response = await api.get('contacts/fetchallcontacts');
            // console.log(response.headers);

            // console.log(response.data)

            dispatch({
                type: 'userContacts',
                payload: response.data,
            })

        } catch (error) {
            console.log('error', error);
        }


    }
}


export const addData = (contactData) => {
    return async (dispatch) => {
        try {
            // eslint-disable-next-line
            const response = await api.post('contacts/addcontact', {
                name: contactData.name,
                email: contactData.email,

            },);

            // console.log(response)
            if (response.status === 200) {
                dispatch(fetchData());
            }

        } catch (AxiosError) {
            console.log('error', AxiosError.message);
        }

    }
}


export const deleteContact = (id) => {
    return async (dispatch) => {
        try {
            // eslint-disable-next-line
            const response = await api.delete(`contacts/deletecontact/${id}`);
            // console.log(response);
            if (response.status === 200) {
                dispatch(fetchData());
            }

        } catch (AxiosError) {
            console.log('error', AxiosError.message);
        }


    }
}

export const updateContact = (id, name, email, tag) => {
    return async (dispatch) => {
        try {
            const response = await api.put(`contacts/updatecontact/${id}`, {
                name: name,
                email: email,
                tag: tag,
            });

            // console.log("update", response);

            if(response.status === 200){
                dispatch(fetchData());
                // alert(response.data.msg);
            }

        } catch (AxiosError) {
            console.log('error', AxiosError.msg);
        }
    }
}