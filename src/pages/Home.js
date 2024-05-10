import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchQuizData } from '../api';
import iconeCorra from '../assets/ícone_branco.png'
import Footer from '../components/footer/footer'

import '../style/global.css';
import '../style/homepage.css';


function HomePage() {
    const [quizData, setQuizData] = useState([]);

    let dataQuiz = "";
    dataQuiz = JSON.parse(localStorage.getItem("quizData"));
    if(!dataQuiz){
        fetchQuizData()
        .then(data => {
            localStorage.setItem("quizData", JSON.stringify(data));
            setQuizData(data);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
    }

    return (
        <div className='homepage'>
            <div className='div-left'>
                <img id="iconeCorra" src={iconeCorra} width='130px'></img>
                <h3 className='h3_Titulo'>ReduQuiz de Danos</h3>

                <p className='p_descricao'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a tristique leo, vel malesuada felis. Praesent posuere sagittis nunc, et efficitur nibh. Sed a libero in orci condimentum congue a elementum nibh. Integer id mauris ut justo rhoncus scelerisque. Aliquam eu lorem cursus, bibendum erat feugiat, tincidunt eros.</p>                
                <h4 className='h4_ComoJogar'>COMO JOGAR</h4>
                <p><strong>1.</strong></p>
                <p><strong>2.</strong></p>
                <p><strong>3.</strong></p>
                <p><strong>4.</strong></p>
                <p><strong>5.</strong></p>

                <Link to="/Quiz">
                    <button>Começar a jogar</button>
                </Link>

                <Footer />

            </div>
        </div>
    );
}

export default HomePage;
