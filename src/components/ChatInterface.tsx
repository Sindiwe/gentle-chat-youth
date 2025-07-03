
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { callGeminiAPI } from '../services/geminiService';
import ApiKeyModal from './ApiKeyModal';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const CHAT_HISTORY_KEY = 'safespace_chat_history';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load chat history and API key on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }

    const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        // Convert timestamp strings back to Date objects
        const historyWithDates = parsedHistory.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(historyWithDates);
      } catch (error) {
        console.error('Error loading chat history:', error);
        // If there's an error, start with welcome message
        setMessages([{
          id: '1',
          text: "Hi there! I'm here to listen and support you. How are you feeling today?",
          sender: 'bot',
          timestamp: new Date(),
        }]);
      }
    } else {
      // No stored history, start with welcome message
      setMessages([{
        id: '1',
        text: "Hi there! I'm here to listen and support you. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }
  }, []);

  // Save chat history whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Create conversation context for the AI
      const conversationHistory = messages.slice(-10); // Last 10 messages for context
      const contextString = conversationHistory.map(msg => 
        `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
      ).join('\n');
      
      const messageWithContext = `Previous conversation:\n${contextString}\n\nCurrent message: ${currentMessage}`;
      
      const botResponseText = await callGeminiAPI(messageWithContext, apiKey);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please check your API key and try again.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  const handleApiKeySet = (newApiKey: string) => {
    setApiKey(newApiKey);
  };

  const handleSettingsClick = () => {
    setShowApiKeyModal(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot size={24} />
            <div>
              <h3 className="font-semibold">SafeSpace Assistant</h3>
              <p className="text-sm text-blue-100">Always here to listen</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSettingsClick}
            className="text-white hover:bg-white/20"
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-gray-600" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={apiKey ? "Type your message here..." : "Set up API key to start chatting..."}
            className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <ApiKeyModal
          onApiKeySet={handleApiKeySet}
          onClose={() => setShowApiKeyModal(false)}
        />
      )}
    </div>
  );
};

export default ChatInterface;
