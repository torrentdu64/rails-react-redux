export default function(state = [], action) {
  switch(action.type) {
    case 'FETCH_PROFILES':
      return action.payload;
    // case FETCH_POST:
    //   // action.payload is an object
    //   return [ action.payload ];
    // // case POST_CREATED:
    // //   // TODO: push it to the array of posts
    // //   return state;
    default:
      return state;
  }
}
