export default function( state = [] , action){
  if(state === undefined){
    return {}
  }
  switch(action.type) {

      case 'FETCH_PROFILE_BUSY_TIME':

        return action.payload;

  default:
      return state;
  }
}
