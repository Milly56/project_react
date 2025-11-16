import React, { useEffect, useRef, useState } from 'react';
import './RegisterModal.css';

export default function RegisterModal() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pwVisible1, setPwVisible1] = useState(false);
  const [pwVisible2, setPwVisible2] = useState(false);
  const overlayRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // atachar listener ao link com id openRegister (preserva integração com markup existente)
    const opener = document.getElementById('openRegister');
    const onOpen = (e) => {
      e?.preventDefault();
      setOpen(true);
      setShowSuccess(false);
    };
    if (opener) opener.addEventListener('click', onOpen);
    return () => { if (opener) opener.removeEventListener('click', onOpen); };
  }, []);

  useEffect(() => {
    // fechar ao clicar fora do modal
    const overlay = overlayRef.current;
    if (!overlay) return;
    const onClick = (ev) => {
      if (ev.target === overlay) {
        setOpen(false);
        setShowSuccess(false);
      }
    };
    overlay.addEventListener('click', onClick);
    return () => overlay.removeEventListener('click', onClick);
  }, [overlayRef.current]);

  const handleCancel = () => {
    setOpen(false);
    setShowSuccess(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const p1 = formRef.current.querySelector('#regPass');
    const p2 = formRef.current.querySelector('#regPass2');
    if (p1 && p2 && p1.value !== p2.value) {
      alert('As senhas não coincidem.');
      return;
    }
    setShowSuccess(true);
  };

  const gotoLogin = () => {
    setOpen(false);
    setShowSuccess(false);
    const email = document.querySelector('.left-card input[type="email"]');
    if (email) email.focus();
  };

  return (
    <div
      id="overlay"
      ref={overlayRef}
      className={`overlay ${!open ? 'hidden' : ''}`}
      aria-hidden={!open}
    >
      {/* Register Modal */}
      <div
        className={`modal register-modal ${showSuccess ? 'hidden' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="registerTitle"
      >
        <h3 id="registerTitle">Cadastre-se agora</h3>
        <form id="registerForm" ref={formRef} className="form modal-form" onSubmit={handleSubmit}>
          <label className="field"><span className="label-text">Nome</span><input name="name" required /></label>
          <label className="field"><span className="label-text">Data de nascimento</span><input name="dob" type="date" /></label>
          <label className="field"><span className="label-text">Email</span><input name="email" type="email" required /></label>

          <label className="field"><span className="label-text">Digite sua senha</span>
            <div className="pw-wrap">
              <input id="regPass" name="password" type={pwVisible1 ? 'text' : 'password'} required />
              <button
                type="button"
                className="eye"
                aria-label="mostrar senha"
                aria-pressed={pwVisible1}
                onClick={() => setPwVisible1(v => !v)}
              >
                <svg className="icon-open" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" stroke="#7f8fa3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#7f8fa3" strokeWidth="1.2"/></svg>
                <svg className="icon-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-6 0-10-8-10-8a18.14 18.14 0 0 1 4.14-5.49" stroke="#7f8fa3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 1l22 22" stroke="#7f8fa3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </label>

          <label className="field"><span className="label-text">Confirme sua senha</span>
            <div className="pw-wrap">
              <input id="regPass2" name="password2" type={pwVisible2 ? 'text' : 'password'} required />
              <button
                type="button"
                className="eye"
                aria-label="mostrar senha"
                aria-pressed={pwVisible2}
                onClick={() => setPwVisible2(v => !v)}
              >
                <svg className="icon-open" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" stroke="#7f8fa3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#7f8fa3" strokeWidth="1.2"/></svg>
                <svg className="icon-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-6 0-10-8-10-8a18.14 18.14 0 0 1 4.14-5.49" stroke="#7f8fa3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 1l22 22" stroke="#7f8fa3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </label>

          <div className="modal-actions">
            <button className="btn primary" type="submit">Cadastrar</button>
            <button className="btn ghost" id="cancelRegister" type="button" onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <div id="successModal" className={`modal success-modal ${!showSuccess ? 'hidden' : ''}`} role="dialog" aria-modal="true" aria-labelledby="successTitle">
        <div className="success-icon">✅</div>
        <h3 id="successTitle">Cadastrado com sucesso!</h3>
        <p>Parabéns! Seu cadastro foi criado com sucesso.</p>
        <div className="modal-actions">
          <button className="btn outline" id="closeSuccess" type="button" onClick={handleCancel}>Fechar</button>
          <button className="btn primary" id="gotoLogin" type="button" onClick={gotoLogin}>Fazer Login</button>
        </div>
      </div>
    </div>
  );
}