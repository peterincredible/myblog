import {add_user,remove_user,add_post,remove_post,get_user,get_posts,remove_all_post} from "./action_type";
export function add_user_creator(payload){
   return{type:add_user,payload}
}
export function remove_user_creator(payload){
     return{type:remove_user,payload}
}
export function get_user_creator(){
    return{type:get_user}
}
export function add_post_creator(payload){
    return {type:add_post,payload}
}
export function remove_post_creator(payload){
    return{type:remove_post,payload}
}
export function get_posts_creator(payload){
    return{type:get_posts,payload}
}
export function remove_all_posts_creator(){
    return{type:remove_all_post}
}
