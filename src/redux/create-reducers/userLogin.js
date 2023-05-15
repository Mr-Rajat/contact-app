
const userLogin = (state = {
    loginStatus: { success: false, authToken: "" },
    // isFetchSuccess:false,
    // isFetchFail:false,
    registerStatus: { success: false } } , action) => {
    // console.log(state )

    switch (action.type) {
        case 'userLogin':
            return {
                ...state,
                loginStatus: {
                    ...state.loginStatus,
                    success: action.payload,
                    // console.log("inside reducer", state),
                }
            };
        case 'userLogout':
            return {
                ...state,
                loginStatus: {
                    ...state.loginStatus,
                    success: false,
                    // console.log("inside reducer", state),
                }
                // success: false,
                // console.log("inside reducer", state),
            };
        case 'userRegister':
            return {
                ...state,
                registerStatus: {
                    ...state.registerStatus,
                    success: action.payload,
                    // console.log("inside reducer", state),
                }
                // success: false,
                // console.log("inside reducer", state),
            };
            default:
                return state;
    }

}

// if (action.type === 'userLogin') {

//     state.success = action.payload;
//     console.log("inside reducer", state);
//     return { ...state }
// }
// else {
//     return state
// }




// }

export default userLogin;