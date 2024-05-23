import bcrypt from 'bcryptjs';

let cachedQuizData = null;

export const fetchQuizData = () => {
    console.log("Chamando a API...");
    return fetch('https://backend-reduquiz.onrender.com/firestore/quiz')
      .then(response => response.json())
      .then(data => {
        console.log("Dados recebidos:", data);
        const newData = data.map(item => {
          const hashedGab = bcrypt.hashSync(item.Gab, 10);
          return { ...item, Gab: hashedGab };
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
