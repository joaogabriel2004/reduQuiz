import bcrypt from 'bcryptjs';

let cachedQuizData = null;

export const fetchQuizData = () => {
    console.log("Chamando a API...");
    return fetch('https://backend-reduquiz.onrender.com/firestore/quiz')
      .then(response => response.json())
      .then(data => {
        console.log("Dados recebidos:", data);
        // Iterar sobre os dados e alterar o valor da chave "Gab" usando bcrypt
        const newData = data.map(item => {
          const hashedGab = bcrypt.hashSync(item.Gab, 10); // Aqui usamos bcrypt para hash do valor de "Gab"
          return { ...item, Gab: hashedGab }; // Atualiza a chave "Gab" com o hash
        });
        cachedQuizData = newData;
        return newData;
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        throw error;
    });
};

export const getQuizData = () => {
  return cachedQuizData;
};
