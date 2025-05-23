import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Minimize2, Maximize2, Send, Command } from 'lucide-react';

interface MarketAnalysisAIProps {
  onClose: () => void;
}

const examplePrompts = [
  "What are the key support and resistance levels for Nifty today?",
  "Analyze Bank Nifty's trend and potential breakout levels",
  "What's the current market sentiment and FII/DII activity?",
  "Identify potential trading opportunities in IT sector",
  "Show me the top gainers and losers in Nifty 50"
];

const MarketAnalysisAI: React.FC<MarketAnalysisAIProps> = ({ onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; content: string }>>([
    {
      type: 'ai',
      content: "Hello! I'm your AI market analysis assistant. I can help you with technical analysis, market sentiment, and trading strategies. How can I assist you today?"
    }
  ]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: "I'm analyzing your request. This is a placeholder response. In a real implementation, this would be connected to an AI service."
      }]);
    }, 1000);
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    const container = e.currentTarget as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const container = e.currentTarget as HTMLDivElement;
    container.style.left = `${e.clientX - position.x}px`;
    container.style.top = `${e.clientY - position.y}px`;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-4 right-4 z-50"
      style={{ position: 'fixed', cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <motion.div
        layout
        className={`bg-gray-900 rounded-xl shadow-xl border border-gray-800 overflow-hidden
          ${isMinimized ? 'w-[300px] h-[60px]' : 'w-[400px] h-[600px]'}`}
      >
        {/* Header */}
        <motion.div
          layout="position"
          className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/95 backdrop-blur-lg cursor-pointer"
          onClick={() => !isMinimized && setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="h-6 w-6 text-blue-500" />
              <motion.div
                className="absolute -inset-1 bg-blue-500/20 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h3 className="font-semibold">Market Analysis AI</h3>
              <div className="flex items-center text-sm text-gray-400">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
                Online
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="h-5 w-5 text-gray-400" />
              ) : (
                <Minimize2 className="h-5 w-5 text-gray-400" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </motion.div>

        {/* Chat Content */}
        <AnimatePresence mode="wait">
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="h-[400px] overflow-y-auto p-4 space-y-4 custom-scrollbar"
              >
                {messages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                  >
                    <p className="text-gray-400">Try asking about:</p>
                    <div className="space-y-2">
                      {examplePrompts.map((prompt, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleExampleClick(prompt)}
                          className="block w-full text-left p-3 rounded-xl bg-gray-800/50 hover:bg-blue-600/20 border border-gray-700 hover:border-blue-500/50 text-sm transition-all duration-300"
                        >
                          <div className="flex items-center">
                            <Command className="h-4 w-4 mr-2 text-blue-500" />
                            {prompt}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-100'
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-800 bg-gray-900/95 backdrop-blur-lg">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about market analysis..."
                    className="w-full px-4 py-2 pr-10 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MarketAnalysisAI;