export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_PROFILES':
      return action.payload;
    // case FETCH_POST:
    //   // action.payload is an object
    //   return [ action.payload ];
     case 'BOOKING_CREATE':
     if (state.map(booking => booking.id).includes(action.payload.id)) {
        return state;
      } else if(action.payload.errors === 'errors') {
          return action.payload.errors
      }else {
        const copiedState = state.slice(0);
        copiedState.push(action.payload);
        return copiedState;
      }
      case 'MESSAGE_POSTED':
       if (state.map(message => message.id).includes(action.payload.id)) {
          return state;
        } else {
        const copiedState = state.slice(0);
        copiedState.push(action.payload);
        return copiedState;
        }
    default:
      return state;
  }
}
