
import { useState } from 'react';
import { MessageCircle, Heart, BookOpen } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import MoodTracker from '../components/MoodTracker';
import JournalEntry from '../components/JournalEntry';
import Navigation from '../components/Navigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'mood':
        return <MoodTracker />;
      case 'journal':
        return <JournalEntry />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            <span className="text-blue-600">Safe</span>
            <span className="text-green-600">Space</span>
          </h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            Your anonymous mental health companion
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {renderActiveComponent()}
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
