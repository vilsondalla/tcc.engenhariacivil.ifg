import React, { useState } from 'react';
import { FileText, User, CheckCircle, AlertCircle } from 'lucide-react';

export default function TCCEvaluationSystem() {
  const [currentStep, setCurrentStep] = useState('login');
  const [professorName, setProfessorName] = useState('');
  const [selectedTCC, setSelectedTCC] = useState('');
  const [evaluatedWritten, setEvaluatedWritten] = useState(null);
  const [writtenScore, setWrittenScore] = useState('');
  const [presentationScore, setPresentationScore] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tccList = [
    { 
      id: 1, 
      title: 'Análise da resistência mecânica de concretos reforçados externamente com compósitos de fibras de carbono', 
      students: 'Heloisa Gabriela Evangelista Lopes',
      advisor: 'Prof. Dr. Roger Otávio Pires Montes'
    },
    { 
      id: 2, 
      title: 'Aplicação de técnicas compensatórias ao sistema de drenagem no refeitório acadêmico do Instituto Federal de Goiás – Câmpus Uruaçu', 
      students: 'Joyce Heloísa Braz Nonato, Lara Marielle Lima Rodrigues',
      advisor: 'Profa. Ma. Raíssa Faria de Araújo'
    },
    { 
      id: 3, 
      title: 'Travessias urbanas nas rodovias: estudo de caso para a cidade de Uruaçu-GO', 
      students: 'Kamilla Katrine de Araujo Garcia, Victor Almeida Gomes',
      advisor: 'Profa. Dra. Juliana de Souza e Silva Arrais'
    }
  ];

  const writtenCriteria = [
    'Delimitação adequada do objeto',
    'Relevância do desenvolvimento do objeto',
    'Abordagem adequada do problema objeto da pesquisa',
    'Domínio do conteúdo',
    'Abordagem teórica-crítica, analítica e propositiva',
    'Clareza e objetividade',
    'Coesão e unidade do trabalho',
    'Análise interdisciplinar',
    'Observância dos aspectos formais da língua',
    'Respeito às diretrizes técnicas e formais definidas pela ABNT'
  ];

  const presentationCriteria = [
    'Controle e organização do tempo de apresentação',
    'Domínio do conteúdo',
    'Clareza e objetividade',
    'Adequação das ideias ao discurso',
    'Relevância da pesquisa',
    'Viabilidade do cronograma',
    'Viabilidade técnica-orçamentária',
    'Consistência das respostas aos questionamentos da banca examinadora'
  ];

  const handleLogin = () => {
    if (professorName.trim()) {
      setCurrentStep('instructions');
    }
  };

  const handleTCCSelection = () => {
    if (selectedTCC) {
      setCurrentStep('evaluation');
    }
  };

  const handleSubmit = () => {
    if (evaluatedWritten === 'yes' && !writtenScore) {
      alert('Por favor, insira a nota da parte escrita.');
      return;
    }
    
    if (!presentationScore) {
      alert('Por favor, insira a nota da apresentação.');
      return;
    }

    const written = evaluatedWritten === 'yes' ? parseFloat(writtenScore) : null;
    const presentation = parseFloat(presentationScore);

    if (written !== null && (written < 0 || written > 5)) {
      alert('A nota da parte escrita deve estar entre 0 e 5.');
      return;
    }

    if (presentation < 0 || presentation > 5) {
      alert('A nota da apresentação deve estar entre 0 e 5.');
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setProfessorName('');
    setSelectedTCC('');
    setEvaluatedWritten(null);
    setWrittenScore('');
    setPresentationScore('');
    setSubmitted(false);
    setCurrentStep('login');
  };

  const calculateFinalScore = () => {
    const written = evaluatedWritten === 'yes' ? parseFloat(writtenScore) : 0;
    const presentation = parseFloat(presentationScore);
    return (written + presentation).toFixed(1);
  };

  if (currentStep === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Sistema de Avaliação de TCC I</h1>
              <p className="text-gray-600 mt-2">Seminário de Qualificação</p>
              <p className="text-sm text-gray-500">Engenharia Civil - IFG Câmpus Uruaçu</p>
              <p className="text-sm text-green-600 font-medium mt-1">03/12/2025 - 16:30 - Sala 401</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Nome do Professor(a)
              </label>
              <input
                type="text"
                value={professorName}
                onChange={(e) => setProfessorName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Digite seu nome completo"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Instruções para Avaliação de TCC I
            </h1>
            
            <div className="mb-8">
              <p className="text-gray-700 mb-4">
                Bem-vindo(a), <span className="font-semibold text-green-600">{professorName}</span>!
              </p>
              <p className="text-gray-700 mb-4">
                De acordo com a <strong>Resolução nº 28/2014 do IFG (Art. 22)</strong> e o <strong>Edital do Seminário de Qualificação</strong>, a avaliação do TCC I será composta pela análise da <strong>parte escrita</strong> e da <strong>apresentação oral</strong>.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
              <h2 className="text-xl font-bold text-amber-900 mb-3">
                Composição das Notas
              </h2>
              <p className="text-amber-800 mb-3">
                <strong>NF = TE + A</strong>
              </p>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Trabalho Escrito (TE):</strong> 0 a 5 pontos (média aritmética das notas de dois professores avaliadores)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Apresentação (A):</strong> 0 a 5 pontos (média aritmética das notas da banca examinadora)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Nota Final (NF):</strong> 0 a 10 pontos</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Critérios de Avaliação - Parte Escrita do TCC
              </h2>
              <p className="text-blue-800 mb-3">
                Na avaliação do TCC (parte escrita) serão considerados:
              </p>
              <ul className="space-y-2">
                {writtenCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 font-bold">{index + 1}.</span>
                    <span className="text-blue-800">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h2 className="text-xl font-bold text-green-900 mb-4">
                Critérios de Avaliação - Apresentação e Arguições Orais
              </h2>
              <p className="text-green-800 mb-3">
                Na avaliação da apresentação e das respostas às arguições serão levados em conta:
              </p>
              <ul className="space-y-2">
                {presentationCriteria.map((criterion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2 font-bold">{index + 1}.</span>
                    <span className="text-green-800">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
              <h2 className="text-lg font-bold text-purple-900 mb-2">
                Rito do Seminário
              </h2>
              <ul className="space-y-2 text-purple-800">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Discente(s): <strong>15 minutos</strong> para apresentação</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Arguições: até <strong>30 minutos</strong> (20 min para avaliadores da parte escrita + 10 min para demais membros)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>A avaliação da apresentação será realizada pelos avaliadores em conjunto com o(a) orientador(a)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentStep('selectTCC')}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Prosseguir para Seleção de TCC
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'selectTCC') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Selecione o TCC a Avaliar
            </h1>
            <p className="text-gray-600 mb-2">
              Avaliador(a): <span className="font-semibold">{professorName}</span>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Seminário de Qualificação - 03/12/2025 às 16:30 - Sala 401 - BL300
            </p>

            <div className="space-y-4 mb-8">
              {tccList.map((tcc) => (
                <div
                  key={tcc.id}
                  onClick={() => setSelectedTCC(tcc.id)}
                  className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${
                    selectedTCC === tcc.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      selectedTCC === tcc.id ? 'bg-green-600' : 'bg-gray-300'
                    }`}>
                      <span className="text-white font-bold">{tcc.id}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                        {tcc.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Aluno(s):</strong> {tcc.students}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Orientador(a):</strong> {tcc.advisor}
                      </p>
                    </div>
                    {selectedTCC === tcc.id && (
                      <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('instructions')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleTCCSelection}
                disabled={!selectedTCC}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  selectedTCC
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Iniciar Avaliação
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'evaluation' && !submitted) {
    const selectedTCCData = tccList.find(tcc => tcc.id === selectedTCC);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Formulário de Avaliação
            </h1>
            <p className="text-gray-600 mb-2">
              Avaliador(a): <span className="font-semibold">{professorName}</span>
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">{selectedTCCData.id}</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-blue-900 mb-1">
                    {selectedTCCData.title}
                  </h2>
                  <p className="text-sm text-blue-700 mb-1">
                    <strong>Aluno(s):</strong> {selectedTCCData.students}
                  </p>
                  <p className="text-sm text-blue-700">
                    <strong>Orientador(a):</strong> {selectedTCCData.advisor}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                1. Avaliação da Parte Escrita
              </h3>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">
                  Você avaliou a parte escrita deste trabalho?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="evaluatedWritten"
                      value="yes"
                      checked={evaluatedWritten === 'yes'}
                      onChange={(e) => setEvaluatedWritten(e.target.value)}
                      className="mr-2 w-4 h-4 text-green-600"
                    />
                    <span className="text-gray-700">Sim</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="evaluatedWritten"
                      value="no"
                      checked={evaluatedWritten === 'no'}
                      onChange={(e) => {
                        setEvaluatedWritten(e.target.value);
                        setWrittenScore('');
                      }}
                      className="mr-2 w-4 h-4 text-green-600"
                    />
                    <span className="text-gray-700">Não</span>
                  </label>
                </div>
              </div>

              {evaluatedWritten === 'yes' && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <label className="block text-gray-700 font-medium mb-2">
                    Nota da Parte Escrita (0 a 5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={writtenScore}
                    onChange={(e) => setWrittenScore(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ex: 4.5"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Considere os 10 critérios apresentados nas instruções (delimitação do objeto, relevância, abordagem, domínio, análise crítica, etc.)
                  </p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                2. Avaliação da Apresentação Oral
              </h3>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2">
                  Nota da Apresentação (0 a 5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={presentationScore}
                  onChange={(e) => setPresentationScore(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: 4.8"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Considere os 8 critérios: controle do tempo, domínio do conteúdo, clareza, adequação das ideias, relevância, viabilidade do cronograma, viabilidade técnica-orçamentária e consistência nas respostas
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('selectTCC')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Enviar Avaliação
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    const selectedTCCData = tccList.find(tcc => tcc.id === selectedTCC);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-3xl mx-auto mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Avaliação Enviada com Sucesso!
            </h1>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-4 text-center">Resumo da Avaliação:</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Avaliador(a):</span> {professorName}</p>
                <p><span className="font-medium">TCC nº {selectedTCCData.id}:</span> {selectedTCCData.title}</p>
                <p><span className="font-medium">Aluno(s):</span> {selectedTCCData.students}</p>
                <p><span className="font-medium">Orientador(a):</span> {selectedTCCData.advisor}</p>
                <div className="border-t border-gray-300 pt-3 mt-3">
                  {evaluatedWritten === 'yes' && (
                    <p><span className="font-medium">Nota Parte Escrita (TE):</span> <span className="text-blue-600 font-bold">{writtenScore}</span></p>
                  )}
                  {evaluatedWritten === 'no' && (
                    <p className="text-gray-600"><span className="font-medium">Parte Escrita:</span> Não avaliada</p>
                  )}
                  <p><span className="font-medium">Nota Apresentação (A):</span> <span className="text-green-600 font-bold">{presentationScore}</span></p>
                  {evaluatedWritten === 'yes' && (
                    <p className="text-lg mt-2 pt-2 border-t border-gray-300">
                      <span className="font-medium">Nota Final Sugerida (NF = TE + A):</span> 
                      <span className="text-green-700 font-bold ml-2">{calculateFinalScore()}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              Sua avaliação foi registrada. A nota final do TCC será definida pelos componentes da banca examinadora logo após a conclusão da defesa, considerando a média aritmética das avaliações.
            </p>
            
            <button
              onClick={resetForm}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Avaliar Outro TCC
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
