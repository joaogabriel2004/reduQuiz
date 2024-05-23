import React, { useState, useEffect, useCallback } from 'react';
import bcrypt from 'bcryptjs';
import Footer from '../components/footer/footer';
import '../style/global.css';
import '../style/quiz.css';

function QuizPage() {
    const [counter, setCounter] = useState(10);
    const [backgroundColor, setBackgroundColor] = useState("");
    const [perguntas, setPerguntas] = useState([]);
    const [indicePergunta, setIndicePergunta] = useState(0);
    const [shouldStartTimer, setShouldStartTimer] = useState(true);
    const [numAcerto, setNumAcerto] = useState(0);


    /* Funçao responsável por verificar se tem alguma informação no localStorage e, se tiver, ele irá passar as perguntas para o quiz. Se não tiver, ele redirecionará o usuário para a página inicial */
    const loadQuizData = useCallback(() => {
        const dataQuiz = JSON.parse(localStorage.getItem("quizData"));
        if (!dataQuiz) {
            window.location.href = "/";
        } else {
            setPerguntas(dataQuiz);
        }
    }, []);

    useEffect(() => {
        loadQuizData();
    }, [loadQuizData]);


    /* Função responsável pelo contador de tempo. Irá diminuir 1 a cada segundo e, quando chegar a 0, chamará a função apra passar de questão */
    useEffect(() => {
        if (!shouldStartTimer) return;

        const timer = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter > 0) {
                    return prevCounter - 1;
                } else {
                    clearInterval(timer);
                    handleNextQuestion();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [indicePergunta, perguntas, shouldStartTimer]);


    /* Função responsável por verificar se ainda tem pergunta e passar a questão ou encerrar o quiz */
    const handleNextQuestion = () => {
        if (indicePergunta < perguntas.length - 1) {
            setIndicePergunta(prevIndice => prevIndice + 1);
            setCounter(10); 
        } else {
            alert("Fim do Quiz!");
        }
    };


    /* Função responsável pela formatação do tempo mm:ss */
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    /* Função responsável por analisar se a resposta selecionada está correta ou incorreta e contar +1 acerto ao total de acertos */
    const handleAnswerClick = (event) => {
        const selectedAnswer = event.target.id;
        const correctAnswerHash = perguntas[indicePergunta]?.Gab;
        
        if (bcrypt.compareSync(selectedAnswer, correctAnswerHash)) {
            alert("Certo");
            setNumAcerto(prevNumAcerto => prevNumAcerto + 1);
        } else {
            alert("Errado");
            
        }
        
        handleNextQuestion();
    };

    return (
        <div className='container_quiz' style={{ backgroundColor }}>
            <div className='faixa_topo'>
                <div><h1>{formatTime(counter)}</h1></div>
                <div><h1 className='texto_Pergunta'>{perguntas[indicePergunta]?.pergunta || ''}</h1></div>
                <div><h1 className='contadorTempo'>{indicePergunta + 1}/10</h1></div>
            </div>
            <div className='div_Principal'>
                {['A', 'B', 'C', 'D'].map((option) => (
                    <button
                        key={option}
                        className={option === 'A' || option === 'C' ? 'button_left' : 'button_right'}
                        onClick={handleAnswerClick}
                        id={option}
                    >
                        {perguntas[indicePergunta]?.[option] || ''}
                    </button>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default QuizPage;
