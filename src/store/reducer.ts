const defaultState = {
    counter: 0
};

let reducer = (state = defaultState) => {
    let newState = JSON.parse(JSON.stringify(state));
    return newState;
}

export default reducer;
