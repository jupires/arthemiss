import React, { useState } from 'react';

const CepFinder = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const buscarCep = async () => {
    // Limpa estados anteriores
    setErro(null);
    setEndereco(null);
    
    // Validação básica
    if (!cep || cep.length !== 8) {
      setErro('CEP deve conter exatamente 8 dígitos');
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      
      if (!resposta.ok) {
        throw new Error('Falha na rede');
      }
      
      const dados = await resposta.json();

      if (dados.erro) {
        setErro('CEP não encontrado');
      } else {
        setEndereco(dados);
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      setErro('Erro ao consultar CEP. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="component-container">
      <h2>Buscador de CEP</h2>
      
      <div className="cep-input-container">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
          placeholder="Digite o CEP (apenas números)"
          maxLength="8"
        />
        <button 
          onClick={buscarCep} 
          disabled={carregando || cep.length !== 8}
        >
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {erro && <p className="error-message">{erro}</p>}

      {endereco && (
        <div className="resultado-cep">
          <h3>Resultado:</h3>
          <p><strong>CEP:</strong> {endereco.cep}</p>
          <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade/UF:</strong> {endereco.localidade}/{endereco.uf}</p>
          {endereco.complemento && <p><strong>Complemento:</strong> {endereco.complemento}</p>}
        </div>
      )}

      <style jsx>{`
        .cep-input-container {
          margin: 20px 0;
          display: flex;
          gap: 10px;
        }
        input {
          padding: 8px;
          width: 200px;
        }
        button {
          padding: 8px 16px;
        }
        .error-message {
          color: red;
        }
        .resultado-cep {
          text-align: left;
          margin-top: 20px;
          padding: 15px;
          background: #f5f5f5;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default CepFinder;
