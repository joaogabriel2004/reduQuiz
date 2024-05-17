import React, { useState, useEffect, useCallback } from 'react';
import Footer from '../components/footer/footer';
import '../style/global.css';
import '../style/quiz.css';
import { getQuizData, fetchQuizData } from '../api'; // Importando as funções do arquivo api.js

function QuizPage() {
    const [counter, setCounter] = useState(10);
    const [backgroundColor, setBackgroundColor] = useState(""); // Cor inicial do fundo
    const [perguntas, setPerguntas] = useState([]);
    const [indicePergunta, setIndicePergunta] = useState(0);
    const [shouldStartTimer, setShouldStartTimer] = useState(true);
    let numAcerto = 0;

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

    const handleNextQuestion = () => {
        if (indicePergunta < perguntas.length - 1) {
            setIndicePergunta(prevIndice => prevIndice + 1);
            setCounter(10);  // Reiniciar o contador de tempo apenas se houver mais perguntas
        } else {
            alert("Fim do Quiz!");
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleAnswerClick = (event) => {
        const selectedAnswer = event.target.id;
        const correctAnswer = perguntas[indicePergunta]?.Gab;

        if (selectedAnswer === correctAnswer) {
            alert("Certo");
            numAcerto++;
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
