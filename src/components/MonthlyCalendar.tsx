import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthlyCalendarProps {
  onBack: () => void;
}

type MoodType = 'great' | 'good' | 'okay' | 'low' | 'stressed' | null;
type EventType = 'cycle' | 'doctor' | 'exam' | 'goal' | null;

interface DayData {
  mood?: MoodType;
  event?: EventType;
  note?: string;
}

const moods = [
  { type: 'great' as MoodType, emoji: '😊', label: 'Great', color: 'bg-green-400' },
  { type: 'good' as MoodType, emoji: '🙂', label: 'Good', color: 'bg-teal-400' },
  { type: 'okay' as MoodType, emoji: '😐', label: 'Okay', color: 'bg-yellow-400' },
  { type: 'low' as MoodType, emoji: '😔', label: 'Low', color: 'bg-orange-400' },
  { type: 'stressed' as MoodType, emoji: '😰', label: 'Stressed', color: 'bg-red-400' }
];

const eventTypes = [
  { type: 'cycle' as EventType, emoji: '🌸', label: 'Period', color: 'bg-pink-300' },
  { type: 'doctor' as EventType, emoji: '⚕️', label: 'Doctor', color: 'bg-blue-300' },
  { type: 'exam' as EventType, emoji: '📚', label: 'Exam', color: 'bg-purple-300' },
  { type: 'goal' as EventType, emoji: '⭐', label: 'Goal', color: 'bg-yellow-300' }
];

export function MonthlyCalendar({ onBack }: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // January 2026
  const [calendarData, setCalendarData] = useState<Record<string, DayData>>({
    '2026-1-5': { mood: 'great', event: 'goal' },
    '2026-1-10': { mood: 'good', event: 'cycle' },
    '2026-1-15': { mood: 'okay' },
    '2026-1-20': { mood: 'stressed', event: 'exam' },
    '2026-1-25': { mood: 'good', event: 'doctor' }
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const getDayKey = (day: number) => {
    return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
  };

  const getDayData = (day: number): DayData => {
    return calendarData[getDayKey(day)] || {};
  };

  const updateDayMood = (day: number, mood: MoodType) => {
    const key = getDayKey(day);
    setCalendarData({
      ...calendarData,
      [key]: { ...calendarData[key], mood }
    });
  };

  const updateDayEvent = (day: number, event: EventType) => {
    const key = getDayKey(day);
    setCalendarData({
      ...calendarData,
      [key]: { ...calendarData[key], event }
    });
  };

  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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
          <h1 className="mb-2">Monthly Calendar</h1>
          <p className="text-gray-600">Track your moods, cycles, and important dates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  onClick={previousMonth}
                  className="rounded-full hover:bg-purple-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2>{monthYear}</h2>
                <Button
                  variant="ghost"
                  onClick={nextMonth}
                  className="rounded-full hover:bg-purple-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const dayData = getDayData(day);
                  const isSelected = selectedDay === day;
                  const isToday = day === 31 && currentDate.getMonth() === 0; // Jan 31, 2026

                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`aspect-square p-1 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-purple-200 to-pink-200 shadow-md'
                          : 'hover:bg-purple-50'
                      } ${isToday ? 'ring-2 ring-purple-400' : ''}`}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center relative">
                        <span className="text-sm mb-1">{day}</span>
                        <div className="flex gap-0.5">
                          {dayData.mood && (
                            <div className="text-xs">
                              {moods.find(m => m.type === dayData.mood)?.emoji}
                            </div>
                          )}
                          {dayData.event && (
                            <div className="text-xs">
                              {eventTypes.find(e => e.type === dayData.event)?.emoji}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Day Details & Controls */}
          <div className="space-y-6">
            {selectedDay ? (
              <>
                <Card className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm">
                  <h3 className="mb-4">
                    {currentDate.toLocaleDateString('en-US', { month: 'long' })} {selectedDay}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-3">How are you feeling?</p>
                      <div className="grid grid-cols-3 gap-2">
                        {moods.map(mood => {
                          const dayData = getDayData(selectedDay);
                          const isSelected = dayData.mood === mood.type;
                          return (
                            <Button
                              key={mood.type}
                              onClick={() => updateDayMood(selectedDay, mood.type)}
                              className={`h-auto py-3 rounded-xl ${
                                isSelected
                                  ? `${mood.color} text-white hover:opacity-90`
                                  : 'bg-white border border-gray-200 hover:bg-gray-50'
                              }`}
                              variant="outline"
                            >
                              <div className="flex flex-col items-center">
                                <span className="text-xl mb-1">{mood.emoji}</span>
                                <span className="text-xs">{mood.label}</span>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-3">Mark an event</p>
                      <div className="grid grid-cols-2 gap-2">
                        {eventTypes.map(event => {
                          const dayData = getDayData(selectedDay);
                          const isSelected = dayData.event === event.type;
                          return (
                            <Button
                              key={event.type}
                              onClick={() => updateDayEvent(selectedDay, event.type)}
                              className={`h-auto py-3 rounded-xl ${
                                isSelected
                                  ? `${event.color} text-gray-800 hover:opacity-90`
                                  : 'bg-white border border-gray-200 hover:bg-gray-50'
                              }`}
                              variant="outline"
                            >
                              <div className="flex flex-col items-center">
                                <span className="text-xl mb-1">{event.emoji}</span>
                                <span className="text-xs">{event.label}</span>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-6 rounded-2xl border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-center">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="text-gray-600">Select a day to track your mood and events</p>
                </div>
              </Card>
            )}

            {/* Legend */}
            <Card className="p-6 rounded-2xl border-purple-100 bg-white/80 backdrop-blur-sm">
              <h4 className="mb-4">Legend</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Moods</p>
                  <div className="flex flex-wrap gap-2">
                    {moods.map(mood => (
                      <div key={mood.type} className="flex items-center gap-1 text-sm">
                        <span>{mood.emoji}</span>
                        <span className="text-gray-600">{mood.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Events</p>
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map(event => (
                      <div key={event.type} className="flex items-center gap-1 text-sm">
                        <span>{event.emoji}</span>
                        <span className="text-gray-600">{event.label}</span>
                      </div>
                    ))}
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
