import {json,session} from "../_lib.js";
export async function onRequestGet({request,env}){return json({user:await session(request,env)})}