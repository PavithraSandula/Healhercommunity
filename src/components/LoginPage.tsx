import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Heart, Sparkles, Flower2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (name: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-40 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-200 rounded-full opacity-40 blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-10 w-24 h-24 bg-teal-200 rounded-full opacity-40 blur-3xl animate-pulse delay-500" />
      
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center justify-center lg:justify-start mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-50 animate-pulse" />
              <Heart className="w-20 h-20 text-pink-500 fill-pink-400 relative" />
              <Sparkles className="w-8 h-8 text-teal-400 absolute -top-2 -right-2 animate-bounce" />
              <Flower2 className="w-6 h-6 text-purple-400 absolute -bottom-1 -left-1" />
            </div>
          </div>
          
          <h1 className="text-6xl mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-teal-500 bg-clip-text text-transparent">
            HealHer
          </h1>
          
          <p className="text-xl text-gray-700 mb-6">
            Your safe space for wellness
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🧘‍♀️</span>
              </div>
              <div className="text-left">
                <p className="text-sm">Mindfulness & Breathing</p>
                <p className="text-xs text-gray-600">Find your calm</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💪</span>
              </div>
              <div className="text-left">
                <p className="text-sm">Home Exercises & Wellness</p>
                <p className="text-xs text-gray-600">Stay active & healthy</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💜</span>
              </div>
              <div className="text-left">
                <p className="text-sm">Mental Health Support</p>
                <p className="text-xs text-gray-600">You're not alone</p>
              </div>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <p className="text-sm text-purple-800">Empowering young women worldwide</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="order-1 lg:order-2">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-purple-100">
            <div className="text-center mb-8">
              <h2 className="mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Begin your wellness journey today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-700">
                  What should we call you?
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border-purple-200 focus:border-purple-400 rounded-xl h-12 px-4"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-teal-500 hover:from-purple-600 hover:via-pink-600 hover:to-teal-600 text-white rounded-xl h-12 shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Journey
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-purple-100">
              <p className="text-center text-sm text-gray-500 mb-4">Or continue with</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all"
                  onClick={() => onLogin('Guest User')}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all"
                  onClick={() => onLogin('Guest User')}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>

            <p className="text-center mt-6 text-xs text-gray-500">
              By continuing, you agree to our safe and supportive community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}