export function Authuser(state={},action){
switch(action.type){
   case "add_user":
       return {user:action.payload};
    case "remove_user":
        return {user:null};
    case "get_user":
            return state;
    default:
        return state;
}
}

export function Blogpost(state =[],action){
    switch(action.type){
        case "get_posts":
            return [...state,...action.payload]
        case "add_post":
            return [...state,action.payload];
         case "remove_post":
             return state.filter(data=> data._id != action.payload);
        case "remove_all_post":
            return []
         default:
             return state;
     }
}

