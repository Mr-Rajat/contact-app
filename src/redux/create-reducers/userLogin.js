
const userLogin = (state = { success: false }, action) => {
    // console.log(state )

    switch (action.type) {
        case 'userLogin':
            return {
                ...state,
                success: action.payload,
                // console.log("inside reducer", state),
            };
        case 'userLogout':
            return {
                ...state,
                success: false,
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