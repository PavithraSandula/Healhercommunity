import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface BreathingExerciseProps {
  onBack: () => void;
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

export function BreathingExercise({ onBack }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const phases: Record<BreathingPhase, { duration: number; next: BreathingPhase; text: string; color: string }> = {
    inhale: { duration: 4, next: 'hold', text: 'Breathe In', color: 'from-teal-400 to-cyan-500' },
    hold: { duration: 4, next: 'exhale', text: 'Hold', color: 'from-blue-400 to-indigo-500' },
    exhale: { duration: 4, next: 'rest', text: 'Breathe Out', color: 'from-purple-400 to-pink-500' },
    rest: { duration: 2, next: 'inhale', text: 'Rest', color: 'from-violet-400 to-purple-500' }
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const currentPhase = phases[phase];
          setPhase(currentPhase.next);
          return phases[currentPhase.next].duration;
        }
        return prev - 1;
      });
      setTotalSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCountdown(4);
    setTotalSeconds(0);
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale':
        return 1.5;
      case 'hold':
        return 1.5;
      case 'exhale':
        return 0.8;
      case 'rest':
        return 0.8;
      default:
        return 1;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <h1 className="mb-2">Breathing Exercises</h1>
          <p className="text-gray-600">Take a moment to center yourself with guided breathing</p>
        </div>

        <Card className="p-8 md:p-12 rounded-3xl border-purple-100 bg-white/80 backdrop-blur-sm shadow-xl">
          {/* Breathing Circle Animation */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative w-72 h-72 flex items-center justify-center">
              <motion.div
                className={`absolute w-48 h-48 rounded-full bg-gradient-to-br ${phases[phase].color} opacity-30 blur-2xl`}
                animate={{
                  scale: getCircleScale()
                }}
                transition={{
                  duration: phases[phase].duration,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className={`absolute w-40 h-40 rounded-full bg-gradient-to-br ${phases[phase].color} shadow-2xl`}
                animate={{
                  scale: getCircleScale()
                }}
                transition={{
                  duration: phases[phase].duration,
                  ease: "easeInOut"
                }}
              />
              <div className="relative z-10 text-center">
                <p className="text-xl mb-2 text-white drop-shadow-lg">{phases[phase].text}</p>
                <p className="text-5xl text-white drop-shadow-lg">{countdown}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <Button
                onClick={() => setIsActive(!isActive)}
                className={`rounded-full w-16 h-16 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500'
                    : 'bg-gradient-to-r from-teal-500 to-cyan-500'
                } hover:opacity-90`}
              >
                {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="rounded-full w-16 h-16 border-purple-200 hover:bg-purple-50"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>
            <p className="text-gray-600">Total time: {formatTime(totalSeconds)}</p>
          </div>
        </Card>

        {/* Benefits Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 rounded-2xl border-purple-100 bg-white/60 backdrop-blur-sm">
            <div className="text-3xl mb-3">🧘‍♀️</div>
            <h3 className="mb-2">Reduce Stress</h3>
            <p className="text-sm text-gray-600">Calm your nervous system and reduce anxiety</p>
          </Card>
          <Card className="p-6 rounded-2xl border-purple-100 bg-white/60 backdrop-blur-sm">
            <div className="text-3xl mb-3">💭</div>
            <h3 className="mb-2">Clear Mind</h3>
            <p className="text-sm text-gray-600">Improve focus and mental clarity</p>
          </Card>
          <Card className="p-6 rounded-2xl border-purple-100 bg-white/60 backdrop-blur-sm">
            <div className="text-3xl mb-3">😌</div>
            <h3 className="mb-2">Better Sleep</h3>
            <p className="text-sm text-gray-600">Relax your body for restful sleep</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
