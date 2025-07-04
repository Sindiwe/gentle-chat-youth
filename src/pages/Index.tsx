
import { useState } from 'react';
import { MessageCircle, Heart, BookOpen, DollarSign } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import MoodTracker from '../components/MoodTracker';
import JournalEntry from '../components/JournalEntry';
import Resources from '../components/Resources';
import MonetizationDashboard from '../components/MonetizationDashboard';
import PremiumFeatures from '../components/PremiumFeatures';
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
      case 'resources':
        return <Resources />;
      case 'monetization':
        return <MonetizationDashboard />;
      case 'premium':
        return <PremiumFeatures />;
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
          {/* Demo Badge */}
          <div className="flex justify-center mt-2">
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              🚀 Hackathon Demo - Monetization Model
            </span>
          </div>
        </div>
      </header>

      {/* Demo Navigation Tabs */}
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('monetization')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'monetization'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <DollarSign size={16} />
            Revenue Dashboard
          </button>
          <button
            onClick={() => setActiveTab('premium')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'premium'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart size={16} />
            Premium Features
          </button>
        </div>
      </div>

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
