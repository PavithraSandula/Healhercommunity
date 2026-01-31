import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Play, CheckCircle2, Timer, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeExerciseProps {
  onBack: () => void;
}

interface Exercise {
  id: string;
  name: string;
  duration: string;
  reps: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits: string[];
  instructions: string[];
  gif: string;
}

const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Jumping Jacks',
    duration: '1 min',
    reps: '30 reps',
    category: 'Cardio',
    difficulty: 'Beginner',
    benefits: ['Improves cardiovascular health', 'Burns calories', 'Full body workout'],
    instructions: [
      'Stand straight with feet together',
      'Jump while spreading legs shoulder-width apart',
      'Raise arms above head simultaneously',
      'Jump back to starting position',
      'Repeat in a smooth, continuous motion'
    ],
    gif: '🤸‍♀️'
  },
  {
    id: '2',
    name: 'Squats',
    duration: '2 min',
    reps: '15 reps',
    category: 'Strength',
    difficulty: 'Beginner',
    benefits: ['Strengthens legs and glutes', 'Improves core stability', 'Boosts metabolism'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Keep back straight and chest up',
      'Lower body as if sitting in a chair',
      'Go down until thighs are parallel to floor',
      'Push through heels to return to start'
    ],
    gif: '🦵'
  },
  {
    id: '3',
    name: 'Push-ups',
    duration: '2 min',
    reps: '10 reps',
    category: 'Strength',
    difficulty: 'Intermediate',
    benefits: ['Builds upper body strength', 'Strengthens core', 'Improves posture'],
    instructions: [
      'Start in plank position, hands shoulder-width',
      'Keep body in straight line from head to heels',
      'Lower body until chest nearly touches floor',
      'Keep elbows at 45-degree angle',
      'Push back up to starting position'
    ],
    gif: '💪'
  },
  {
    id: '4',
    name: 'Plank',
    duration: '30-60 sec',
    reps: 'Hold',
    category: 'Core',
    difficulty: 'Beginner',
    benefits: ['Strengthens core muscles', 'Improves posture', 'Reduces back pain'],
    instructions: [
      'Start on forearms and toes',
      'Keep body in straight line',
      'Engage core and glutes',
      'Don\'t let hips sag or rise',
      'Hold position while breathing normally'
    ],
    gif: '🧘‍♀️'
  },
  {
    id: '5',
    name: 'Lunges',
    duration: '2 min',
    reps: '10 each leg',
    category: 'Strength',
    difficulty: 'Beginner',
    benefits: ['Strengthens legs', 'Improves balance', 'Tones glutes'],
    instructions: [
      'Stand with feet hip-width apart',
      'Step forward with one leg',
      'Lower hips until both knees bent at 90°',
      'Keep front knee above ankle',
      'Push back to starting position'
    ],
    gif: '🏃‍♀️'
  },
  {
    id: '6',
    name: 'Mountain Climbers',
    duration: '1 min',
    reps: '20 reps',
    category: 'Cardio',
    difficulty: 'Intermediate',
    benefits: ['Full body workout', 'Burns calories', 'Builds endurance'],
    instructions: [
      'Start in high plank position',
      'Bring right knee toward chest',
      'Quickly switch legs',
      'Keep core engaged',
      'Maintain steady rhythm'
    ],
    gif: '🏔️'
  },
  {
    id: '7',
    name: 'Bicycle Crunches',
    duration: '2 min',
    reps: '15 each side',
    category: 'Core',
    difficulty: 'Intermediate',
    benefits: ['Strengthens abs', 'Works obliques', 'Improves coordination'],
    instructions: [
      'Lie on back, hands behind head',
      'Lift shoulders off ground',
      'Bring right elbow to left knee',
      'Alternate sides in cycling motion',
      'Keep lower back pressed to floor'
    ],
    gif: '🚴‍♀️'
  },
  {
    id: '8',
    name: 'Wall Sit',
    duration: '30-60 sec',
    reps: 'Hold',
    category: 'Strength',
    difficulty: 'Beginner',
    benefits: ['Builds leg endurance', 'Strengthens quads', 'Low impact'],
    instructions: [
      'Stand with back against wall',
      'Slide down until thighs parallel to floor',
      'Keep knees directly above ankles',
      'Hold position',
      'Keep back flat against wall'
    ],
    gif: '🧱'
  },
  {
    id: '9',
    name: 'Burpees',
    duration: '1 min',
    reps: '10 reps',
    category: 'Cardio',
    difficulty: 'Advanced',
    benefits: ['Full body conditioning', 'Burns maximum calories', 'Builds strength and cardio'],
    instructions: [
      'Start standing',
      'Drop into squat, hands on floor',
      'Jump feet back to plank',
      'Do a push-up (optional)',
      'Jump feet to hands, then jump up'
    ],
    gif: '🔥'
  }
];

const workoutPlans = [
  {
    name: 'Beginner Full Body',
    duration: '15 min',
    exercises: ['1', '2', '4', '8'],
    calories: '~100 cal'
  },
  {
    name: 'PCOS Friendly',
    duration: '20 min',
    exercises: ['1', '2', '5', '4', '7'],
    calories: '~150 cal'
  },
  {
    name: 'Quick Cardio Burn',
    duration: '10 min',
    exercises: ['1', '6', '9'],
    calories: '~120 cal'
  }
];

export function HomeExercise({ onBack }: HomeExerciseProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Cardio', 'Strength', 'Core'];

  const filteredExercises = filterCategory === 'All' 
    ? exercises 
    : exercises.filter(ex => ex.category === filterCategory);

  const handleComplete = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (selectedExercise) {
    const isCompleted = completedExercises.includes(selectedExercise.id);
    
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setSelectedExercise(null)}
            className="mb-6 hover:bg-white/50 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Exercises
          </Button>

          <Card className="p-8 rounded-3xl border-purple-100 bg-white/80 backdrop-blur-sm shadow-xl">
            <div className="text-center mb-8">
              <motion.div
                className="text-8xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {selectedExercise.gif}
              </motion.div>
              <h1 className="mb-2">{selectedExercise.name}</h1>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Timer className="w-4 h-4" />
                  {selectedExercise.duration}
                </div>
                <span className="text-gray-400">•</span>
                <div className="text-sm text-gray-600">{selectedExercise.reps}</div>
                <span className="text-gray-400">•</span>
                <span className={`text-xs px-3 py-1 rounded-full ${getDifficultyColor(selectedExercise.difficulty)}`}>
                  {selectedExercise.difficulty}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="mb-4">How to Perform</h3>
                <ol className="space-y-3">
                  {selectedExercise.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-white flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="mb-4">Benefits</h3>
                <div className="space-y-2">
                  {selectedExercise.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                  <h4 className="mb-2">Pro Tip</h4>
                  <p className="text-sm text-gray-700">
                    Start slow and focus on proper form. It's better to do fewer reps correctly than many with poor form.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleComplete(selectedExercise.id)}
              disabled={isCompleted}
              className={`w-full rounded-xl h-12 ${
                isCompleted
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Completed!
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Mark as Complete
                </>
              )}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-white/50 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <h1 className="mb-2">Home Exercises</h1>
          <p className="text-gray-600">Simple exercises you can do anywhere, anytime</p>
        </div>

        {/* Progress Card */}
        <Card className="mb-8 p-6 rounded-2xl border-purple-100 bg-gradient-to-r from-purple-100 via-pink-100 to-teal-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3>Your Progress</h3>
                <p className="text-sm text-gray-600">
                  {completedExercises.length} of {exercises.length} exercises completed
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-1">{completedExercises.length > 0 ? '🔥' : '💪'}</div>
              <p className="text-sm text-gray-600">Keep going!</p>
            </div>
          </div>
        </Card>

        {/* Workout Plans */}
        <div className="mb-8">
          <h3 className="mb-4">Quick Workout Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workoutPlans.map((plan, index) => (
              <Card
                key={index}
                className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4>{plan.name}</h4>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {plan.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{plan.exercises.length} exercises</p>
                <div className="flex items-center gap-2 text-sm text-orange-600">
                  <Flame className="w-4 h-4" />
                  {plan.calories}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setFilterCategory(category)}
              variant={filterCategory === category ? 'default' : 'outline'}
              className={`rounded-xl ${
                filterCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'border-purple-200 hover:bg-purple-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map(exercise => {
            const isCompleted = completedExercises.includes(exercise.id);
            return (
              <Card
                key={exercise.id}
                className={`p-6 rounded-2xl cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
                  isCompleted
                    ? 'border-green-300 bg-green-50/50'
                    : 'border-purple-100 bg-white/80 backdrop-blur-sm'
                }`}
                onClick={() => setSelectedExercise(exercise)}
              >
                {isCompleted && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                )}
                <div className="text-5xl mb-4">{exercise.gif}</div>
                <h3 className="mb-2">{exercise.name}</h3>
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <Timer className="w-4 h-4" />
                  {exercise.duration} • {exercise.reps}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                  <span className="text-xs text-purple-600">{exercise.category}</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 rounded-2xl border-purple-100 bg-white/60 backdrop-blur-sm">
            <div className="text-3xl mb-3">💪</div>
            <h4 className="mb-2">Build Strength</h4>
            <p className="text-sm text-gray-600">Regular exercise helps build muscle and bone strength</p>
          </Card>
          <Card className="p-6 rounded-2xl border-purple-100 bg-white/60 backdrop-blur-sm">
            <div className="text-3xl mb-3">❤️</div>
            <h4 className="mb-2">Heart Health</h4>
            <p className="text-sm text-gray-600">Improve cardiovascular health and circulation</p>
          </Card>
          <Card className="p-6 rounded-2xl border-purple-100 bg-white/60 backdrop-blur-sm">
            <div className="text-3xl mb-3">😊</div>
            <h4 className="mb-2">Mood Boost</h4>
            <p className="text-sm text-gray-600">Exercise releases endorphins that improve mental health</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
