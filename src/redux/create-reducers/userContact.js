const userContact = (state = {
    userContacts: []
    }, action) => {

    switch (action.type) {
        case 'userContacts':
            return {
                ...state,
                userContacts: action.payload,
                // userContacts: {
                //     ...state.userContacts,
                //     success: action.payload,
                // console.log("inside reducer", state),
            };
        default:
            return state;
    }
};

export default userContact;