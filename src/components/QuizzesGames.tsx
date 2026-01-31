import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Trophy, Star, CheckCircle2 } from 'lucide-react';
import { Progress } from './ui/progress';

interface QuizzesGamesProps {
  onBack: () => void;
}

const quizzes = [
  {
    id: 1,
    title: 'Mental Health Awareness Quiz',
    description: 'Test your knowledge about mental wellness',
    questions: [
      {
        question: 'What is self-care?',
        options: [
          'Being selfish',
          'Taking time to care for your mental and physical health',
          'Ignoring problems',
          'Only for when you\'re sick'
        ],
        correct: 1
      },
      {
        question: 'How often should you practice stress management?',
        options: ['Only when stressed', 'Daily', 'Once a week', 'Never'],
        correct: 1
      },
      {
        question: 'What is a healthy way to cope with anxiety?',
        options: [
          'Avoiding all stressful situations',
          'Deep breathing and talking to someone',
          'Ignoring it',
          'Working more'
        ],
        correct: 1
      }
    ],
    badge: '🧠'
  },
  {
    id: 2,
    title: 'PCOS/PCOD Awareness',
    description: 'Learn about hormonal health',
    questions: [
      {
        question: 'What does PCOS stand for?',
        options: [
          'Polycystic Ovary Syndrome',
          'Primary Care Ovary System',
          'Polycystic Organ Syndrome',
          'Primary Cystic Ovary Syndrome'
        ],
        correct: 0
      },
      {
        question: 'Which lifestyle change can help manage PCOS?',
        options: [
          'Skipping meals',
          'Regular exercise and balanced diet',
          'Avoiding all carbs',
          'Extreme dieting'
        ],
        correct: 1
      },
      {
        question: 'Is PCOS manageable?',
        options: [
          'No, there\'s nothing you can do',
          'Yes, with proper lifestyle and medical care',
          'Only with surgery',
          'It goes away on its own'
        ],
        correct: 1
      }
    ],
    badge: '💜'
  }
];

export function QuizzesGames({ onBack }: QuizzesGamesProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const handleQuizSelect = (quizId: number) => {
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions.includes(currentQuestion)) return;
    
    setSelectedAnswer(answerIndex);
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (!quiz) return;

    if (answerIndex === quiz.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const handleNext = () => {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (!quiz) return;

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  if (selectedQuiz === null) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 hover:bg-white/50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="text-center mb-8">
            <h1 className="mb-2">Games & Quizzes</h1>
            <p className="text-gray-600">Learn while having fun!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                onClick={() => handleQuizSelect(quiz.id)}
              >
                <div className="text-5xl mb-4">{quiz.badge}</div>
                <h3 className="mb-2">{quiz.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
                <div className="flex items-center gap-2 text-sm text-purple-600">
                  <Star className="w-4 h-4" />
                  {quiz.questions.length} Questions
                </div>
              </Card>
            ))}
          </div>

          {/* Simple Mood Game */}
          <Card className="mt-8 p-8 rounded-2xl border-purple-100 bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="text-center">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="mb-2">Mood Tracker Challenge</h3>
              <p className="text-sm text-gray-600 mb-6">
                Track your mood daily for 7 days to unlock special badges!
              </p>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div
                    key={day}
                    className={`w-10 h-10 rounded-full ${
                      day <= 3 ? 'bg-gradient-to-br from-purple-400 to-pink-400' : 'bg-gray-200'
                    } flex items-center justify-center text-white`}
                  >
                    {day <= 3 && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                ))}
              </div>
              <p className="text-sm text-purple-600">3/7 days completed</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const quiz = quizzes.find(q => q.id === selectedQuiz);
  if (!quiz) return null;

  if (showResult) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <Card className="max-w-lg w-full p-8 rounded-3xl border-purple-100 bg-white/80 backdrop-blur-sm shadow-xl text-center">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="mb-4">Quiz Complete!</h2>
          <div className="text-6xl mb-4">{percentage >= 70 ? '🎉' : '💪'}</div>
          <p className="text-xl mb-6">
            You scored {score} out of {quiz.questions.length}
          </p>
          <p className="text-gray-600 mb-8">
            {percentage >= 70
              ? 'Great job! You have a good understanding of this topic.'
              : 'Keep learning! Every step counts.'}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleRestart}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Back to Quizzes
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={handleRestart}
          className="mb-6 hover:bg-white/50 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>

        <Card className="p-8 rounded-3xl border-purple-100 bg-white/80 backdrop-blur-sm shadow-xl">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-sm text-purple-600">Score: {score}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <h3 className="mb-6">{question.question}</h3>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showAnswer = answeredQuestions.includes(currentQuestion);

              return (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showAnswer}
                  className={`w-full p-4 h-auto text-left justify-start rounded-xl transition-all ${
                    showAnswer
                      ? isCorrect
                        ? 'bg-green-100 border-green-400 text-green-800 hover:bg-green-100'
                        : isSelected
                        ? 'bg-red-100 border-red-400 text-red-800 hover:bg-red-100'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-100'
                      : isSelected
                      ? 'bg-purple-100 border-purple-400 text-purple-800'
                      : 'bg-white border-gray-200 hover:bg-purple-50'
                  }`}
                  variant="outline"
                >
                  <span className="mr-3 font-semibold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                  {showAnswer && isCorrect && <CheckCircle2 className="ml-auto w-5 h-5 text-green-600" />}
                </Button>
              );
            })}
          </div>

          {answeredQuestions.includes(currentQuestion) && (
            <Button
              onClick={handleNext}
              className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
