import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Save, Trash2, Lock } from 'lucide-react';

interface JournalProps {
  onBack: () => void;
}

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
}

const journalPrompts = [
  "What made you smile today?",
  "What are you grateful for right now?",
  "How did you take care of yourself today?",
  "What's something you're proud of this week?",
  "What emotions are you feeling, and why?",
  "What would make tomorrow better?",
  "What challenges did you overcome today?"
];

export function Journal({ onBack }: JournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: new Date(2026, 0, 28).toISOString(),
      content: "Today was a good day. I finished my assignment early and had time to relax. Feeling grateful for small wins! 💜",
      mood: '😊'
    },
    {
      id: '2',
      date: new Date(2026, 0, 25).toISOString(),
      content: "Felt a bit stressed about upcoming exams, but the breathing exercises really helped. Need to remember to take breaks more often.",
      mood: '😰'
    },
    {
      id: '3',
      date: new Date(2026, 0, 22).toISOString(),
      content: "Had a nice chat with a friend today. It's amazing how much better I feel after talking to someone. Not alone in this journey! 🌸",
      mood: '🙂'
    }
  ]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);

  const moods = ['😊', '🙂', '😐', '😔', '😰', '😌', '🥰', '💪'];

  const handleSave = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: currentEntry,
      mood: selectedMood || undefined
    };

    setEntries([newEntry, ...entries]);
    setCurrentEntry('');
    setSelectedMood('');
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const usePrompt = (prompt: string) => {
    setCurrentEntry(currentEntry + (currentEntry ? '\n\n' : '') + prompt + '\n\n');
    setShowPrompts(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-white/50 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <h1 className="mb-2">Your Safe Space</h1>
          <p className="text-gray-600">Express yourself freely - your thoughts are private and secure</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Entry */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-purple-500" />
                <h3>New Entry</h3>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">How are you feeling?</p>
                <div className="flex gap-2 flex-wrap">
                  {moods.map(mood => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`text-2xl p-2 rounded-lg transition-all ${
                        selectedMood === mood
                          ? 'bg-purple-100 scale-110'
                          : 'hover:bg-purple-50'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="Write your thoughts here... No judgment, just you."
                className="min-h-[200px] mb-4 border-purple-200 focus:border-purple-400 rounded-xl resize-none"
              />

              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  disabled={!currentEntry.trim()}
                  className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </Button>
                <Button
                  onClick={() => setShowPrompts(!showPrompts)}
                  variant="outline"
                  className="rounded-xl border-purple-200 hover:bg-purple-50"
                >
                  {showPrompts ? 'Hide' : 'Show'} Prompts
                </Button>
              </div>

              {showPrompts && (
                <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-3">Need inspiration? Try one of these:</p>
                  <div className="space-y-2">
                    {journalPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => usePrompt(prompt)}
                        className="w-full text-left p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors text-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Past Entries */}
            <div className="space-y-4">
              <h3>Past Entries</h3>
              {entries.map(entry => (
                <Card
                  key={entry.id}
                  className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {entry.mood && <span className="text-2xl">{entry.mood}</span>}
                      <div>
                        <p className="text-sm text-gray-500">
                          {formatDate(entry.date)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 rounded-2xl border-purple-100 bg-gradient-to-br from-purple-100 to-pink-100">
              <div className="text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="mb-2">Your Privacy Matters</h4>
                <p className="text-sm text-gray-700">
                  All your journal entries are stored securely and privately. No one can read them but you.
                </p>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm">
              <h4 className="mb-4">Journaling Benefits</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-xl">💭</span>
                  <div>
                    <p className="text-sm">Process Emotions</p>
                    <p className="text-xs text-gray-600">Understand your feelings better</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🌱</span>
                  <div>
                    <p className="text-sm">Track Growth</p>
                    <p className="text-xs text-gray-600">See how far you've come</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">😌</span>
                  <div>
                    <p className="text-sm">Reduce Stress</p>
                    <p className="text-xs text-gray-600">Release pent-up thoughts</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-xl">🎯</span>
                  <div>
                    <p className="text-sm">Clarify Goals</p>
                    <p className="text-xs text-gray-600">Focus on what matters</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="mb-2">Your Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Entries</span>
                    <span>{entries.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Streak</span>
                    <span>5 days 🔥</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
