export default function( state = [] , action){
  switch(action.type) {
      case 'BOOKING_POSTED':
        return action.payload;
  default:
      return state;
  }
}
