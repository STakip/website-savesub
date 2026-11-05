const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
const fail=(message,status=400)=>json({error:message},status);
const uid=()=>crypto.randomUUID();
const enc=s=>new TextEncoder().encode(s);
async function digest(s){const b=await crypto.subtle.digest("SHA-256",enc(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
async function passwordHash(password,salt){const key=await crypto.subtle.importKey("raw",enc(password),"PBKDF2",false,["deriveBits"]);const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt:enc(salt),iterations:150000,hash:"SHA-256"},key,256);return [...new Uint8Array(bits)].map(x=>x.toString(16).padStart(2,"0")).join("")}
function cookie(token){return `ss_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`}
function clearCookie(){return "ss_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0"}
async function session(request,env){const raw=request.headers.get("Cookie")?.match(/(?:^|;\s*)ss_session=([^;]+)/)?.[1];if(!raw)return null;const row=await env.DB.prepare("SELECT users.id,users.email,users.role FROM sessions JOIN users ON users.id=sessions.user_id WHERE sessions.token_hash=? AND sessions.expires_at>?").bind(await digest(raw),Math.floor(Date.now()/1000)).first();return row||null}
async function body(request){try{return await request.json()}catch{return null}}
export {json,fail,uid,digest,passwordHash,cookie,clearCookie,session,body};