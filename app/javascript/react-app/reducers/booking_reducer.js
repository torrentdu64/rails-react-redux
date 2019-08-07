export default function( state = [] , action){
  if(state === undefined){
    return {}
  }
  switch(action.type) {
      case 'BOOKING_POSTED':

        return action.payload;
  default:
      return state;
  }
}
