import React from 'react';
import RegisterModal from './components/RegisterModal';

function App(){ 
  return (
    <>
      {/* ...existing code... */}
      {/* link que abre o modal - mantenha onde desejar na UI */}
      <a className="link" id="openRegister" href="#">Cadastre-se agora</a>

      {/* componente do modal (mantém comportamento via id openRegister) */}
      <RegisterModal />

      {/* ...existing code... */}
    </>
  );
}

export default App;