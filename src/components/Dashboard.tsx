import { Page } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  Heart, 
  Gamepad2, 
  Apple, 
  Wind, 
  Calendar, 
  BookHeart, 
  Library,
  LogOut,
  Sparkles,
  Dumbbell
} from 'lucide-react';

interface DashboardProps {
  userName: string;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const motivationalQuotes = [
  "You are stronger than you think 💜",
  "Take care of yourself, you deserve it ✨",
  "Your mental health matters 🌸",
  "Every small step counts 🌟",
  "You are not alone in this journey 💖",
  "Be gentle with yourself today 🦋"
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export function Dashboard({ userName, onNavigate, onLogout }: DashboardProps) {
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const modules = [
    {
      id: 'quizzes' as Page,
      title: 'Games & Quizzes',
      description: 'Fun activities to learn',
      icon: Gamepad2,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'breathing' as Page,
      title: 'Breathing Exercises',
      description: 'Calm your mind',
      icon: Wind,
      color: 'from-teal-400 to-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'exercise' as Page,
      title: 'Home Exercises',
      description: 'Stay active & fit',
      icon: Dumbbell,
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'diet' as Page,
      title: 'Daily Diet',
      description: 'Track your meals',
      icon: Apple,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'calendar' as Page,
      title: 'Monthly Calendar',
      description: 'Track moods & cycles',
      icon: Calendar,
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'journal' as Page,
      title: 'Journal',
      description: 'Express yourself freely',
      icon: BookHeart,
      color: 'from-rose-400 to-rose-600',
      bgColor: 'bg-rose-50'
    },
    {
      id: 'resources' as Page,
      title: 'Resources',
      description: 'Articles & support',
      icon: Library,
      color: 'from-violet-400 to-violet-600',
      bgColor: 'bg-violet-50'
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl">
                {getGreeting()}, {userName}!
              </h1>
              <Heart className="w-6 h-6 text-pink-500 fill-pink-400" />
            </div>
            <p className="text-gray-600">How are you feeling today?</p>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="rounded-xl border-purple-200 hover:bg-purple-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Motivational Quote */}
        <Card className="mb-8 bg-gradient-to-r from-purple-100 via-pink-100 to-teal-100 border-none shadow-lg p-6 rounded-2xl">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-600 flex-shrink-0" />
            <p className="text-lg text-gray-800">{quote}</p>
          </div>
        </Card>

        {/* Quick Access Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card
                key={module.id}
                className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-none rounded-2xl"
                onClick={() => onNavigate(module.id)}
              >
                <div className={`absolute inset-0 ${module.bgColor} opacity-50`} />
                <div className="relative p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="mb-2">{module.title}</h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <Card className="p-4 text-center rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm">
            <div className="text-2xl mb-1">🔥</div>
            <p className="text-sm text-gray-600">7 day streak</p>
          </Card>
          <Card className="p-4 text-center rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm">
            <div className="text-2xl mb-1">⭐</div>
            <p className="text-sm text-gray-600">12 activities</p>
          </Card>
          <Card className="p-4 text-center rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm">
            <div className="text-2xl mb-1">💜</div>
            <p className="text-sm text-gray-600">Feeling good</p>
          </Card>
        </div>
      </div>
    </div>
  );
}