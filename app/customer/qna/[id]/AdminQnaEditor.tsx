'use client';
import {useState} from 'react';

export default function AdminQnaEditor({id,title,nickname,content,answer}:{id:string,title:string,nickname:string,content:string,answer:string}){
 const [form,setForm]=useState({title,nickname,content,answer});
 const [busy,setBusy]=useState(false); const [msg,setMsg]=useState('');
 const save=async()=>{setBusy(true);setMsg('');try{const r=await fetch(`/api/admin/qna/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const j=await r.json();if(!r.ok)throw new Error(j.message||'저장 실패');setMsg('수정 및 답변이 저장되었습니다.');location.reload();}catch(e:any){setMsg(e.message||'저장 중 오류가 발생했습니다.');}finally{setBusy(false);}};
 return <div style={{marginTop:28,padding:24,border:'1px solid #cbd9e8',borderRadius:14,background:'#f7fbff'}}>
  <strong style={{display:'block',fontSize:18,color:'#0c63d4',marginBottom:16}}>관리자 수정 / 답변</strong>
  <label style={{display:'block',marginBottom:12}}>작성자<input value={form.nickname} onChange={e=>setForm({...form,nickname:e.target.value})} style={{display:'block',width:'100%',marginTop:6,padding:12}}/></label>
  <label style={{display:'block',marginBottom:12}}>제목<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{display:'block',width:'100%',marginTop:6,padding:12}}/></label>
  <label style={{display:'block',marginBottom:12}}>문의 내용<textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} rows={7} style={{display:'block',width:'100%',marginTop:6,padding:12,resize:'vertical'}}/></label>
  <label style={{display:'block',marginBottom:14}}>관리자 답변<textarea value={form.answer} onChange={e=>setForm({...form,answer:e.target.value})} rows={6} style={{display:'block',width:'100%',marginTop:6,padding:12,resize:'vertical'}} placeholder="답변을 입력하세요."/></label>
  <button type="button" onClick={save} disabled={busy} style={{padding:'12px 22px',border:0,borderRadius:8,background:'#0c63d4',color:'#fff',fontWeight:800,cursor:'pointer'}}>{busy?'저장 중...':'수정 및 답변 저장'}</button>
  {msg&&<span style={{marginLeft:12,fontSize:14}}>{msg}</span>}
 </div>;
}