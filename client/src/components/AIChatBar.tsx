import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, X, ChevronDown, ChevronUp, Command, Sparkles, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const examplePrompts = [
  "What are the key support and resistance levels for Nifty today?",
  "Analyze Bank Nifty's trend and potential breakout levels",
  "What's the current market sentiment and FII/DII activity?",
  "Identify potential trading opportunities in IT sector",
  "Show me the top gainers and losers in Nifty 50"
];

const AIChatBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateMockResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMockResponse = (query: string): string => {
    if (query.toLowerCase().includes('support') || query.toLowerCase().includes('resistance')) {
      return "Based on today's technical analysis:\n\nNifty Support Levels:\n- S1: 22,150\n- S2: 22,000\n- S3: 21,850\n\nResistance Levels:\n- R1: 22,450\n- R2: 22,600\n- R3: 22,750\n\nKey level to watch: 22,300 acting as immediate resistance.";
    }
    
    if (query.toLowerCase().includes('bank nifty')) {
      return "Bank Nifty Analysis:\n- Current Trend: Bullish\n- Key Support: 47,200\n- Strong Resistance: 47,800\n- Moving Averages: Trading above 20 EMA\n- RSI: 65 (Moderately overbought)\n\nWatch for potential breakout above 47,800 for further upside.";
    }
    
    return "I apologize, but I need more specific information to provide accurate market analysis. Could you please clarify your question?";
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <motion.div
      initial={false}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      className="fixed bottom-8 right-8 w-96 backdrop-blur-xl bg-gradient-to-b from-gray-900/95 to-gray-800/95 rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden"
      style={{
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
        height: isExpanded ? '600px' : '60px'
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer border-b border-gray-700/50 bg-gradient-to-r from-gray-900 to-gray-800"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="relative">
            <Bot className="h-6 w-6 text-blue-500" />
            <motion.div
              className="absolute -inset-1 bg-blue-500/20 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
              Market Analysis AI
            </h3>
            <div className="flex items-center">
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5" />
              <span className="text-xs text-gray-400">Online</span>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp className="h-5 w-5 text-gray-400" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[calc(100%-4rem)] relative"
          >
            {/* Messages Container */}
            <div className="h-[calc(100%-4rem)] overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-4"
                >
                  <div className="relative inline-block">
                    <Sparkles className="h-12 w-12 text-blue-500 mb-2" />
                    <motion.div
                      className="absolute inset-0 bg-blue-500/20 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <p className="text-gray-300 mb-6">
                    Your AI-powered market analysis assistant
                  </p>
                  <div className="space-y-2">
                    {examplePrompts.map((prompt, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleExampleClick(prompt)}
                        className="block w-full text-left p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-blue-600/20 hover:to-blue-500/20 border border-gray-700/50 hover:border-blue-500/50 text-sm transition-all duration-300"
                      >
                        <div className="flex items-center">
                          <Command className="h-4 w-4 mr-2 text-blue-500" />
                          {prompt}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100'
                  }`}>
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {message.content}
                    </pre>
                    <div className="text-xs mt-2 opacity-60 flex items-center">
                      {message.type === 'ai' && (
                        <Zap className="h-3 w-3 mr-1 text-blue-500" />
                      )}
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-4">
                    <div className="flex space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about market analysis..."
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-700 focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors group"
                >
                  <Send className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AIChatBar;