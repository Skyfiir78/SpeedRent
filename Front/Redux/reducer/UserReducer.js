const initialState = {
      isLogged: false,
      token: '',
      email: '',
      cars: [],
}

export default function UserReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_USER':
        nextState = {
            ...state,
            ...action.value
        }
    return nextState || state
  default:
    return state
  }
}
