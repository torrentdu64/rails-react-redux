export default function( state = [] , action){
  if(state === undefined){
    return {}
  }
  switch(action.type) {


      case 'FETCH_PROFILE_BUSY_NOW':
        console.log('FETCH_PROFILE_BUSY_NOW', action.payload)
        return action.payload;


  default:
      return state;
  }
}
