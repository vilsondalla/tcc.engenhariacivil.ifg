const { useState } = React;
const { FileText, User, CheckCircle, AlertCircle } = window.lucideReact || {};

// Ícones inline caso lucide não carregue
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

function TCCEvaluationSystem() {
  const [currentStep, setCurrentStep] = useState('login');
  const [professorEmail, setProfessorEmail] = useState('');
  const [professorName, setProfessorName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [selectedTCC, setSelectedTCC] = useState('');
  const [completedEvaluations, setCompletedEvaluations] = useState({});

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

  // Extrai primeiro nome do email e formata
  const extractFirstName = (email) => {
    const username = email.split('@')[0];
    const firstName = username.split('.')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  // Valida email institucional
  const handleLogin = () => {
    setEmailError('');
    
    if (!professorEmail.trim()) {
      setEmailError('Por favor, insira seu e-mail institucional.');
      return;
    }

    if (!professorEmail.endsWith('@ifg.edu.br')) {
      setEmailError('Email inadequado. Utilize apenas e-mails institucionais @ifg.edu.br');
      return;
    }

    const name = extractFirstName(professorEmail);
    setProfessorName(name);
    setCurrentStep('selectTCC'); // Vai direto para seleção
  };

  const handleTCCSelection = (tccId) => {
    setSelectedTCC(tccId);
    
    // Verifica se já foi avaliado
    if (completedEvaluations[tccId]) {
      if (window.confirm('Este TCC já foi avaliado. Deseja editar a nota existente?')) {
        setCurrentStep('instructions');
      }
    } else {
      if (window.confirm('Deseja iniciar a avaliação deste TCC?')) {
        setCurrentStep('instructions');
      }
    }
  };

  const handleSubmitEvaluation = (evaluationData) => {
    // Salva avaliação como concluída
    setCompletedEvaluations(prev => ({
      ...prev,
      [selectedTCC]: evaluationData
    }));
    
    // Volta para seleção de TCCs
    setCurrentStep('selectTCC');
    setSelectedTCC('');
  };

  // Componente interno para o formulário de avaliação
  const EvaluationForm = () => {
    const [evaluatedWritten, setEvaluatedWritten] = useState(
      completedEvaluations[selectedTCC]?.evaluatedWritten || null
    );
    const [writtenScore, setWrittenScore] = useState(
      completedEvaluations[selectedTCC]?.writtenScore || ''
    );
    const [presentationScore, setPresentationScore] = useState(
      completedEvaluations[selectedTCC]?.presentationScore || ''
    );

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

      handleSubmitEvaluation({
        evaluatedWritten,
        writtenScore,
        presentationScore
      });

      alert('Avaliação enviada com sucesso!');
    };

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
                Cancelar
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
  };

  // TELA DE LOGIN
  if (currentStep === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                <UserIcon />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Sistema de Avaliação de TCC I</h1>
              <p className="text-gray-600 mt-2">Seminário de Qualificação</p>
              <p className="text-sm text-gray-500">Engenharia Civil - IFG Câmpus Uruaçu</p>
              <p className="text-sm text-green-600 font-medium mt-1">03/12/2025 - 16:30 - Sala 401</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                E-mail Institucional
              </label>
              <input
                type="email"
                value={professorEmail}
                onChange={(e) => setProfessorEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="seu.nome@ifg.edu.br"
              />
              {emailError && (
                <div className="mt-3 flex items-start gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {AlertCircle && <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                  <span>{emailError}</span>
                </div>
              )}
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

  // TELA DE SELEÇÃO DE TCC
  if (currentStep === 'selectTCC') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Selecione o TCC para avaliar
            </h1>
            <p className="text-gray-600 mb-2">
              Avaliador(a): <span className="font-semibold">{professorName}</span>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Seminário de Qualificação - 03/12/2025 às 16:30 - Sala 401 - BL300
            </p>

            <div className="space-y-4 mb-8">
              {tccList.map((tcc) => {
                const isCompleted = completedEvaluations[tcc.id];
                
                return (
                  <div
                    key={tcc.id}
                    onClick={() => handleTCCSelection(tcc.id)}
                    className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${
                      isCompleted
                        ? 'border-green-500 bg-green-50 hover:bg-green-100'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-300'
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
                        {isCompleted && (
                          <p className="text-sm text-green-600 font-semibold mt-2">
                            ✓ Avaliação concluída
                            {isCompleted.evaluatedWritten === 'yes' && 
                              ` - Trabalho Escrito: ${isCompleted.writtenScore}`
                            }
                            {isCompleted.evaluatedWritten === 'no' && 
                              ` - Trabalho Escrito: —`
                            }
                            {` | Apresentação: ${isCompleted.presentationScore}`}
                          </p>
                        )}
                      </div>
                      {isCompleted && (
                        <div className="text-green-600 flex-shrink-0">
                          <CheckIcon />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TELA DE INSTRUÇÕES
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
              onClick={() => setCurrentStep('evaluation')}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Iniciar Avaliação
            </button>
          </div>
        </div>
      </div>
    );
  }

  // TELA DE AVALIAÇÃO
  if (currentStep === 'evaluation') {
    return <EvaluationForm />;
  }

  return null;
}

ReactDOM.render(<TCCEvaluationSystem />, document.getElementById('root'));
