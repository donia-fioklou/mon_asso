const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                token: action.payload,
                refresh: false
            };
        }
        case "TOKEN_EXPIRED": {
            return {
                token: action.payload,
                refresh: true
            };
        }
        case "LOGOUT": {
            return {
                token: null,
                refresh: false
            }
        }
        default:
            return state;
    }
}

export default AuthReducer;