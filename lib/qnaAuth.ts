import { createHmac, timingSafeEqual } from 'node:crypto';

const secret=()=>process.env.ADMIN_SECRET||process.env.DATABASE_URL||'';
const sign=(value:string)=>createHmac('sha256',secret()).update(value).digest('hex');

export function makePostAccessToken(id:string){const exp=Date.now()+30*60*1000;const body=`qna:${id}:${exp}`;return `${body}:${sign(body)}`;}
export function verifyPostAccessToken(id:string,token?:string){if(!token||!secret())return false;const parts=token.split(':');if(parts.length!==4)return false;const [kind,pid,exp,sig]=parts;if(kind!=='qna'||pid!==id||Number(exp)<Date.now())return false;const expected=sign(`${kind}:${pid}:${exp}`);return expected.length===sig.length&&timingSafeEqual(Buffer.from(expected),Buffer.from(sig));}

export function makeAdminToken(){const exp=Date.now()+8*60*60*1000;const body=`admin:${exp}`;return `${body}:${sign(body)}`;}
export function verifyAdminToken(token?:string){if(!token||!secret())return false;const [kind,exp,sig]=token.split(':');if(kind!=='admin'||!exp||!sig||Number(exp)<Date.now())return false;const expected=sign(`${kind}:${exp}`);return expected.length===sig.length&&timingSafeEqual(Buffer.from(expected),Buffer.from(sig));}
