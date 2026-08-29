'use client';
import { FormEvent,useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm(){
 const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const router=useRouter();
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setLoading(true);setError('');const fd=new FormData(e.currentTarget);try{const res=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:fd.get('password')})});const data=await res.json();if(!res.ok||!data.ok)throw new Error(data.message||'로그인에 실패했습니다.');router.push('/customer/qna');router.refresh();}catch(err){setError(err instanceof Error?err.message:'로그인에 실패했습니다.');}finally{setLoading(false);}}
 return <form onSubmit={submit} style={{maxWidth:420,margin:'40px auto',padding:30,border:'1px solid #dce5ef',borderRadius:14,background:'#fff'}}><h1 style={{fontSize:28,margin:'0 0 8px'}}>관리자 로그인</h1><p style={{color:'#738196',lineHeight:1.7}}>로그인하면 비밀글을 포함한 모든 1:1 문의를 바로 열람할 수 있습니다.</p><input name="password" type="password" required placeholder="관리자 비밀번호" style={{width:'100%',height:48,padding:'0 12px',border:'1px solid #cfd8e3',borderRadius:7}}/><button disabled={loading} style={{width:'100%',height:48,marginTop:12,border:0,borderRadius:7,background:'#0c63d4',color:'#fff',fontWeight:800}}>{loading?'로그인 중...':'로그인'}</button>{error&&<p style={{color:'#c93838',fontWeight:700,textAlign:'center'}}>{error}</p>}</form>;
}
