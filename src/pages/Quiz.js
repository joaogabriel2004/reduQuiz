import React, { useState, useEffect } from 'react';
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
    const [quizData, setQuizData] = useState([]);
    let numAcerto = 0;

    useEffect(() => {
        let dataQuiz = "";
        dataQuiz = JSON.parse(localStorage.getItem("quizData"));
        if(!dataQuiz) {
            window.location.href = "/";
        } else {
            setPerguntas(dataQuiz);
        }
    }, []);

    useEffect(() => {
        if (!shouldStartTimer) return;

        const timer = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter > 0) {
                    return prevCounter - 1;
                } else {
                    clearInterval(timer);
                    if (indicePergunta < perguntas.length - 1) {
                        alert("A");
                        setIndicePergunta(prevIndice => prevIndice + 1);
                        setCounter(10);  // Reiniciar o contador de tempo apenas se houver mais perguntas
                    } else {
                        alert("Fim do Quiz!");
                    }
                    return 0;
                }
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [indicePergunta, perguntas, shouldStartTimer]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const clickEvent = (event) => {
        setCounter(10);
        let id = event.target.id;
        if(id==perguntas[indicePergunta].Gab){
            alert("Certo");
        } else {
            alert("Errado");
        }
        console.log(perguntas[indicePergunta].Gab)
        setIndicePergunta(prevIndice => prevIndice + 1);
    }

    return (
        <div className='container_quiz' style={{ backgroundColor }}>
            <div className='faixa_topo'>
                <div><h1>{formatTime(counter)}</h1></div>
                <div><h1 className='texto_Pergunta'>{perguntas.length > 0 && perguntas[indicePergunta] ? perguntas[indicePergunta].pergunta : ''}</h1></div>
                <div><h1 className='contadorTempo'>{indicePergunta + 1}/10</h1></div>
            </div>
            <div className='div_Principal'>
                <button className='button_left' onClick={clickEvent} id={"A"}>{perguntas.length > 0 && perguntas[indicePergunta] ? perguntas[indicePergunta].A : ''}</button>
                <button className='button_right' onClick={clickEvent} id={"B"}>{perguntas.length > 0 && perguntas[indicePergunta] ? perguntas[indicePergunta].B : ''}</button>
                <br/>
                <button className='button_left' onClick={clickEvent} id={"C"}>{perguntas.length > 0 && perguntas[indicePergunta] ? perguntas[indicePergunta].C : ''}</button>
                <button className='button_right' onClick={clickEvent} id={"D"}>{perguntas.length > 0 && perguntas[indicePergunta] ? perguntas[indicePergunta].D : ''}</button>
            </div>
            <Footer />
        </div>
    );
}

export default QuizPage;
