import { useState, useEffect } from 'react';

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
};

const ALL_QUESTIONS: Question[] = [
  { id: 1, text: "Which country has won the most FIFA World Cup titles?", options: ["Germany", "Brazil", "Italy", "Argentina"], correctAnswer: "Brazil" },
  { id: 2, text: "Who is the all-time leading goalscorer in World Cup history?", options: ["Pelé", "Ronaldo", "Miroslav Klose", "Lionel Messi"], correctAnswer: "Miroslav Klose" },
  { id: 3, text: "Which nation hosted the first ever World Cup in 1930?", options: ["Uruguay", "France", "England", "Brazil"], correctAnswer: "Uruguay" },
  { id: 4, text: "How many teams will participate in the 2026 World Cup?", options: ["32", "40", "48", "64"], correctAnswer: "48" },
  { id: 5, text: "Which player has won the most World Cup tournaments?", options: ["Diego Maradona", "Pelé", "Cafu", "Ronaldo"], correctAnswer: "Pelé" },
  { id: 6, text: "Which country won the 2010 FIFA World Cup?", options: ["Netherlands", "Spain", "Germany", "Argentina"], correctAnswer: "Spain" },
  { id: 7, text: "Who won the Golden Ball in the 2014 World Cup?", options: ["Thomas Müller", "James Rodríguez", "Lionel Messi", "Arjen Robben"], correctAnswer: "Lionel Messi" },
  { id: 8, text: "Which host nation was the first to be eliminated in the group stage?", options: ["South Africa", "Qatar", "Japan", "South Korea"], correctAnswer: "South Africa" },
  { id: 9, text: "Which player holds the record for the most goals in a single World Cup tournament?", options: ["Just Fontaine", "Sándor Kocsis", "Gerd Müller", "Eusébio"], correctAnswer: "Just Fontaine" },
  { id: 10, text: "What is the fastest goal ever scored in a World Cup match?", options: ["11 seconds", "15 seconds", "23 seconds", "30 seconds"], correctAnswer: "11 seconds" },
  { id: 11, text: "Which team has played in the most World Cup finals without ever winning?", options: ["Hungary", "Czechoslovakia", "Netherlands", "Sweden"], correctAnswer: "Netherlands" },
  { id: 12, text: "Who is the oldest player to score in a World Cup?", options: ["Roger Milla", "Pepe", "Cristiano Ronaldo", "Miroslav Klose"], correctAnswer: "Roger Milla" },
  { id: 13, text: "Which country won the inaugural FIFA Women's World Cup in 1991?", options: ["USA", "Norway", "Germany", "China"], correctAnswer: "USA" },
  { id: 14, text: "Which player famously missed a penalty in the 1994 World Cup final shootout?", options: ["Franco Baresi", "Roberto Baggio", "Daniele Massaro", "Paolo Maldini"], correctAnswer: "Roberto Baggio" },
  { id: 15, text: "What was the name of the official match ball for the 2010 World Cup?", options: ["Teamgeist", "Fevernova", "Jabulani", "Brazuca"], correctAnswer: "Jabulani" },
  { id: 16, text: "Which African nation was the first to reach a World Cup semi-final?", options: ["Senegal", "Ghana", "Cameroon", "Morocco"], correctAnswer: "Morocco" },
  { id: 17, text: "Who scored the 'Hand of God' goal in 1986?", options: ["Jorge Valdano", "Diego Maradona", "Gabriel Batistuta", "Claudio Caniggia"], correctAnswer: "Diego Maradona" },
  { id: 18, text: "Which country has appeared in every single World Cup tournament?", options: ["Germany", "Italy", "Argentina", "Brazil"], correctAnswer: "Brazil" },
  { id: 19, text: "Who won the Golden Boot in the 2018 World Cup?", options: ["Antoine Griezmann", "Kylian Mbappé", "Harry Kane", "Romelu Lukaku"], correctAnswer: "Harry Kane" },
  { id: 20, text: "Which stadium hosted the 2002 World Cup final?", options: ["Seoul World Cup Stadium", "International Stadium Yokohama", "Saitama Stadium 2002", "Daegu Stadium"], correctAnswer: "International Stadium Yokohama" }
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Trivia() {
  const [questions, setQuestions] = useState<(Question & { shuffledOptions: string[] })[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    initGame();
  }, []);

  function initGame() {
    // Pick 10 random questions
    const shuffledQuestions = shuffleArray(ALL_QUESTIONS).slice(0, 10);
    // Shuffle options for each question
    const preparedQuestions = shuffledQuestions.map(q => ({
      ...q,
      shuffledOptions: shuffleArray(q.options)
    }));
    
    setQuestions(preparedQuestions);
    setCurrentQIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
  }

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    if (answer === questions[currentQIndex].correctAnswer) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(i => i + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  if (questions.length === 0) return null; // Loading state

  if (isFinished) {
    return (
      <div className="w-full max-w-2xl bg-surface/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center fade-in">
        <span className="material-symbols-outlined text-6xl text-secondary mb-6 shadow-glow" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
        <h2 className="font-headline-lg text-4xl text-white mb-2">Quiz Completed!</h2>
        <p className="font-body-lg text-on-surface-variant mb-8">You scored <strong className="text-secondary">{score}</strong> out of {questions.length}</p>
        <button onClick={initGame} className="bg-secondary text-on-secondary font-label-caps px-8 py-3 rounded-full hover:shadow-[0_0_20px_rgba(233,195,73,0.4)] transition-all">
          Play Again
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    <div className="w-full max-w-2xl bg-surface/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col items-center fade-in" key={currentQ.id}>
      <div className="w-full flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h2 className="font-headline-md text-xl text-secondary">World Cup Trivia</h2>
        <span className="font-label-caps text-on-surface-variant">Question {currentQIndex + 1} of {questions.length}</span>
      </div>

      <h3 className="font-body-lg text-2xl text-center mb-8 h-20 flex items-center justify-center">{currentQ.text}</h3>

      <div className="w-full flex flex-col gap-4">
        {currentQ.shuffledOptions.map((option, index) => {
          let btnClass = "w-full p-4 rounded-xl text-left font-body-md transition-all border ";
          
          if (selectedAnswer === null) {
            btnClass += "bg-surface-container border-white/10 hover:border-secondary hover:bg-white/5 cursor-pointer hover:-translate-y-1";
          } else {
            if (option === currentQ.correctAnswer) {
              btnClass += "bg-green-900/50 border-green-500 text-green-300 scale-105 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
            } else if (option === selectedAnswer) {
              btnClass += "bg-red-900/50 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
            } else {
              btnClass += "bg-surface-container border-white/5 opacity-50";
            }
          }

          return (
            <button 
              key={index} 
              className={btnClass}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
