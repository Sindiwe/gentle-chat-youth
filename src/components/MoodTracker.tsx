
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodHistory, setMoodHistory] = useState<Array<{
    mood: number;
    date: string;
    note?: string;
  }>>([]);
  const [note, setNote] = useState('');

  const moodEmojis = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: 'text-red-500' },
    { value: 2, emoji: '😔', label: 'Sad', color: 'text-orange-500' },
    { value: 3, emoji: '😐', label: 'Okay', color: 'text-yellow-500' },
    { value: 4, emoji: '🙂', label: 'Good', color: 'text-green-500' },
    { value: 5, emoji: '😊', label: 'Great', color: 'text-blue-500' },
  ];

  const handleMoodSubmit = () => {
    if (selectedMood) {
      const newEntry = {
        mood: selectedMood,
        date: new Date().toLocaleDateString(),
        note: note.trim() || undefined,
      };
      setMoodHistory(prev => [newEntry, ...prev]);
      setSelectedMood(null);
      setNote('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Mood Selection */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl text-gray-800">
            How are you feeling today?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {moodEmojis.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                  selectedMood === mood.value
                    ? 'bg-blue-50 border-2 border-blue-300 scale-105'
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <span className="text-3xl mb-2">{mood.emoji}</span>
                <span className={`text-xs font-medium ${mood.color}`}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Want to add a note about how you're feeling? (optional)"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                onClick={handleMoodSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Save Mood Entry
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mood History */}
      {moodHistory.length > 0 && (
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Your Mood Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {moodHistory.slice(0, 5).map((entry, index) => {
                const moodData = moodEmojis.find(m => m.value === entry.mood);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-2xl">{moodData?.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${moodData?.color}`}>
                          {moodData?.label}
                        </span>
                        <span className="text-sm text-gray-500">
                          {entry.date}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-gray-600 mt-1">{entry.note}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MoodTracker;
