let cachedQuizData = null;

export const fetchQuizData = () => {
    console.log("Chamando a API...");
    return fetch('http://localhost:3001/firestore/quiz')
      .then(response => response.json())
      .then(data => {
        console.log("Dados recebidos:", data);
        cachedQuizData = data;
        return data;
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        throw error;
    });
};

export const getQuizData = () => {
  return cachedQuizData;
};