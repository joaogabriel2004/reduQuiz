import React from 'react';
import reguaMarcas from '../assets/regua branca.png'
import '../style/global.css';


function Footer() {
    return (
        <div className='linhaLogosFooter'>
            <img id="reguaMarcas" src={reguaMarcas} width="50%" alt="Régua de marcas do programa Corra pro Abraço"></img>
        </div>
    );
}

export default Footer;
