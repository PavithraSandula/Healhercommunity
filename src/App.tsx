import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { BreathingExercise } from './components/BreathingExercise';
import { QuizzesGames } from './components/QuizzesGames';
import { DietTracker } from './components/DietTracker';
import { MonthlyCalendar } from './components/MonthlyCalendar';
import { Journal } from './components/Journal';
import { Resources } from './components/Resources';
import { HomeExercise } from './components/HomeExercise';

export type Page = 'login' | 'dashboard' | 'breathing' | 'quizzes' | 'diet' | 'calendar' | 'journal' | 'resources' | 'exercise';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [userName, setUserName] = useState('');

  const handleLogin = (name: string) => {
    setUserName(name);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUserName('');
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard userName={userName} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'breathing':
        return <BreathingExercise onBack={() => setCurrentPage('dashboard')} />;
      case 'quizzes':
        return <QuizzesGames onBack={() => setCurrentPage('dashboard')} />;
      case 'diet':
        return <DietTracker onBack={() => setCurrentPage('dashboard')} />;
      case 'calendar':
        return <MonthlyCalendar onBack={() => setCurrentPage('dashboard')} />;
      case 'journal':
        return <Journal onBack={() => setCurrentPage('dashboard')} />;
      case 'resources':
        return <Resources onBack={() => setCurrentPage('dashboard')} />;
      case 'exercise':
        return <HomeExercise onBack={() => setCurrentPage('dashboard')} />;
      default:
        return <Dashboard userName={userName} onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50">
      {renderPage()}
    </div>
  );
}