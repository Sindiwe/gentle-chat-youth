
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Save, Trash2 } from 'lucide-react';

interface JournalEntryType {
  id: string;
  title: string;
  content: string;
  date: string;
  timestamp: Date;
}

const JournalEntry = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  const handleSaveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntryType = {
      id: Date.now().toString(),
      title: getEntryTitle(currentEntry),
      content: currentEntry,
      date: new Date().toLocaleDateString(),
      timestamp: new Date(),
    };

    setEntries(prev => [newEntry, ...prev]);
    setCurrentEntry('');
    setIsWriting(false);
  };

  const getEntryTitle = (content: string): string => {
    const firstLine = content.split('\n')[0];
    return firstLine.length > 30 ? firstLine.substring(0, 30) + '...' : firstLine;
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const prompts = [
    "What am I grateful for today?",
    "How did I take care of myself today?",
    "What challenged me today and how did I handle it?",
    "What made me smile today?",
    "What would I tell a friend who was feeling the way I feel right now?",
  ];

  return (
    <div className="space-y-6">
      {/* Writing Area */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <BookOpen size={24} />
            Your Personal Journal
          </CardTitle>
          <p className="text-sm text-gray-600">
            A safe space to express your thoughts and feelings
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isWriting ? (
            <div className="space-y-4">
              <Button
                onClick={() => setIsWriting(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Start Writing
              </Button>
              
              {/* Writing Prompts */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Need inspiration? Try one of these prompts:
                </h4>
                <div className="space-y-1">
                  {prompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentEntry(prompt + '\n\n');
                        setIsWriting(true);
                      }}
                      className="text-left w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
                    >
                      • {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="Write about your day, your feelings, your thoughts... This is your safe space."
                className="min-h-[200px] resize-none border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveEntry}
                  disabled={!currentEntry.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  <Save size={16} className="mr-2" />
                  Save Entry
                </Button>
                <Button
                  onClick={() => {
                    setCurrentEntry('');
                    setIsWriting(false);
                  }}
                  variant="outline"
                  className="px-4"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Previous Entries */}
      {entries.length > 0 && (
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Your Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 bg-gray-50 rounded-lg space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{entry.title}</h4>
                      <p className="text-sm text-gray-500">{entry.date}</p>
                    </div>
                    <Button
                      onClick={() => handleDeleteEntry(entry.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {entry.content.length > 150 
                      ? entry.content.substring(0, 150) + '...'
                      : entry.content
                    }
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JournalEntry;
