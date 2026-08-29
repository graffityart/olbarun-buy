'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../board.module.css';

export default function QnaWriteForm(){
  const router=useRouter();
  const [question,setQuestion]=useState('불러오는 중');
  const [token,setToken]=useState('');
  const [status,setStatus]=useState('');
  const [sending,setSending]=useState(false);

  async function loadCaptcha(){
    try{
      const res=await fetch('/api/captcha',{cache:'no-store'});
      const data=await res.json();
      if(!res.ok||!data.ok) throw new Error(data.message||'보안 확인 오류');
      setQuestion(data.question); setToken(data.token);
    }catch{ setQuestion('오류'); setToken(''); }
  }
  useEffect(()=>{loadCaptcha();},[]);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); setSending(true); setStatus('');
    const form=e.currentTarget; const fd=new FormData(form);
    const payload={nickname:fd.get('nickname'),password:fd.get('password'),title:fd.get('title'),content:fd.get('content'),secret:fd.get('secret')==='on',captcha:fd.get('captcha'),captchaToken:token,website:fd.get('website')};
    try{
      const res=await fetch('/api/qna',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await res.json();
      if(!res.ok||!data.ok) throw new Error(data.message||'등록 중 오류가 발생했습니다.');
      setStatus('문의가 등록되었습니다.');
      form.reset();
      setTimeout(()=>{
        router.push('/customer/qna');
        router.refresh();
      },900);
    }catch(err){
      setStatus(err instanceof Error?err.message:'등록 중 오류가 발생했습니다.');
      await loadCaptcha();
      setSending(false);
    }
  }

  return <form className={styles.form} onSubmit={submit}>
    <label className={styles.row}><span>닉네임 *</span><div className={styles.field}><input name="nickname" required maxLength={40}/></div></label>
    <label className={styles.row}><span>비밀번호 *</span><div className={styles.field}><input name="password" type="password" required minLength={4} maxLength={60} placeholder="글 확인·수정·삭제 시 필요합니다."/></div></label>
    <label className={styles.row}><span>제목 *</span><div className={styles.field}><input name="title" required maxLength={160}/></div></label>
    <label className={styles.row}><span>내용 *</span><div className={styles.field}><textarea name="content" required minLength={5} maxLength={5000} placeholder="문의 내용을 입력해주세요."/></div></label>
    <label className={styles.privacyRow}><input type="checkbox" name="secret" defaultChecked/> <strong>비밀글로 등록합니다.</strong></label>
    <div className={styles.captcha}><strong>스팸 방지 확인</strong><div className={styles.captchaLine}><span className={styles.captchaCode}>{question}</span><input name="captcha" inputMode="numeric" required placeholder="정답 입력"/></div><p className={styles.spamNote}>보안문제는 5분 후 만료되며 동일 IP에서 10분 동안 3건을 초과해 등록할 수 없습니다.</p></div>
    <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off"/>
    <div className={styles.actions}><button type="submit" disabled={sending||!token}>{sending?'등록 중...':'글쓰기'}</button><a href="/customer/qna">취소</a></div>
    {status&&<p style={{textAlign:'center',fontWeight:800,marginTop:16,color:'#0c63d4'}}>{status}</p>}
  </form>
}