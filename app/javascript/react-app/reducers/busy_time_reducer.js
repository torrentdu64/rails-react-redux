export default function( state = [] , action){
  if(state === undefined){
    return {}
  }
  switch(action.type) {

      case 'FETCH_PROFILE_BUSY_TIME':

        return action.payload;

      case 'REMOVE_BOOKING':
      debugger
      if(state[0].id === action.payload){
        return [];
      }

  default:
      return state;
  }
}
