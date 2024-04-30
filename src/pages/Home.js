import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchQuizData } from '../api';
import iconeCorra from '../assets/ícone_branco.png'
import Footer from '../components/footer'

import '../style/global.css';
import '../style/homepage.css';

function HomePage() {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        fetchQuizData()
        .then(data => {
            setQuizData(data);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    return (
        <div className='container'>
            <div className='div-left'>
                <img id="iconeCorra" src={iconeCorra} width='130px'></img>
                <h3 className='h3_Titulo'>ReduQuiz de Danos</h3>

                <p className='p_descricao'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a tristique leo, vel malesuada felis. Praesent posuere sagittis nunc, et efficitur nibh. Sed a libero in orci condimentum congue a elementum nibh. Integer id mauris ut justo rhoncus scelerisque. Aliquam eu lorem cursus, bibendum erat feugiat, tincidunt eros. In sit amet tortor porttitor, dictum tortor vitae, maximus lectus. Suspendisse suscipit semper purus, sit amet convallis nulla faucibus eu. Aenean viverra posuere tincidunt.</p>                
                <h4 className='h4_ComoJogar'>COMO JOGAR</h4>
                <p><strong>1.</strong></p>
                <p><strong>2.</strong></p>
                <p><strong>3.</strong></p>
                <p><strong>4.</strong></p>
                <p><strong>5.</strong></p>

                <h3 className='h3_SeDivirta'>SE DIVIRTA!</h3>

                <Footer />

            </div>
            <div className='div-right'>
                <input className='input_Nome' type='text' placeholder='Coloque aqui o seu nome'></input><br/>
                <Link to="/Quiz">
                    <button>Começar a jogar</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
