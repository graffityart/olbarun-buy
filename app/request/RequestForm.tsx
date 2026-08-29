'use client';

import { FormEvent, useState } from 'react';
import styles from './request.module.css';

type Props = { mode: 'pickup' | 'visit' };

export default function RequestForm({ mode }: Props) {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const isPickup = mode === 'pickup';

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    setSending(true);
    setStatus('');
    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, type: mode, privacy: data.get('privacy') === 'on' }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.message || '접수 중 오류가 발생했습니다.');
      setStatus('접수가 완료되었습니다. 담당자가 확인 후 연락드리겠습니다.');
      form.reset();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : '접수 중 오류가 발생했습니다.');
    } finally {
      setSending(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <section className={styles.formSection}>
        <h2>기본정보 <span>* 필수 입력 항목입니다.</span></h2>
        <div className={styles.rows}>
          <label><span>상호 / 성명 *</span><input name="name" required placeholder="업체명 또는 성명" /></label>
          <label><span>담당자명 *</span><input name="manager" required /></label>
          <label><span>연락처 *</span><input name="phone" required inputMode="tel" placeholder="010-0000-0000" /></label>
          <label><span>이메일</span><input name="email" type="email" /></label>
          <label><span>주소 *</span><input name="address" required placeholder="수거 또는 방문 주소" /></label>
          <label><span>{isPickup ? '희망 수거일' : '희망 방문일'} *</span><input name="preferredDate" type="date" required /></label>
        </div>
      </section>

      <section className={styles.formSection}>
        <h2>{isPickup ? '수거 물품 내용' : '방문 견적 내용'}</h2>
        <div className={styles.rows}>
          <label><span>의뢰 목적 *</span><select name="purpose" required defaultValue=""><option value="" disabled>선택해주세요</option><option>폐컴퓨터 매입</option><option>서버·네트워크 장비 매입</option><option>통신스크랩·불용자재 매입</option><option>대량 장비 정리</option><option>기타</option></select></label>
          <label><span>품목 및 수량 *</span><input name="items" required placeholder="예: 데스크탑 30대, 모니터 20대" /></label>
          <label><span>HDD 데이터 파기</span><select name="dataDestroy" defaultValue="상담 필요"><option>상담 필요</option><option>천공 파기 요청</option><option>파기 불필요</option></select></label>
          <label><span>엘리베이터 / 주차</span><input name="access" placeholder="예: 화물엘리베이터 있음 / 1톤 진입 가능" /></label>
          <label className={styles.full}><span>상세 내용</span><textarea name="note" rows={7} placeholder="장비 상태, 층수, 반출 조건, 방문 시 참고사항 등을 적어주세요." /></label>
          <label className={styles.full}><span>첨부파일</span><input name="attachment" type="file" accept="image/*,.pdf" /><small>현재는 파일명만 접수 알림에 포함되며, 실제 파일 저장 기능은 다음 단계에서 연결합니다.</small></label>
        </div>
      </section>

      <section className={styles.privacy}>
        <h2>개인정보 수집 및 이용 안내</h2>
        <div className={styles.privacyBox}>수집항목: 상호/성명, 담당자명, 연락처, 이메일, 주소, 의뢰내용, 희망일자. 수집목적: 매입·수거·방문견적 상담 및 일정 확인. 상담 완료 후 관련 법령 및 내부 기준에 따라 보관 또는 파기합니다.</div>
        <label className={styles.check}><input type="checkbox" name="privacy" required /> 개인정보 수집 및 이용에 동의합니다.</label>
      </section>

      <input name="website" className={styles.honeypot} tabIndex={-1} autoComplete="off" />
      <button className={styles.submit} disabled={sending}>{sending ? '접수 중...' : isPickup ? '수거 신청 접수' : '방문견적 의뢰 접수'}</button>
      {status && <p className={styles.status}>{status}</p>}
    </form>
  );
}
