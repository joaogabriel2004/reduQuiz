import { BrowserRouter, Route, Routes  } from "react-router-dom";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

const AppRoutes = ({ quizData }) => {
   return(
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Quiz" element={<Quiz quizData={quizData} />} />
            </Routes>
       </BrowserRouter>
   )
}

export default AppRoutes;