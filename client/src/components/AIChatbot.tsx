import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Command, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const examplePrompts = [
  "What services do you offer?",
  "How can I get started?",
  "Tell me about your pricing",
  "What are your business hours?",
  "Do you offer support?"
];

const AIChatbot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
        content: generateResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    // Simple response generation logic
    if (query.toLowerCase().includes('hello') || query.toLowerCase().includes('hi')) {
      return "Hello! How can I help you today?";
    }
    if (query.toLowerCase().includes('help')) {
      return "I'm here to help! Please let me know what you need assistance with.";
    }
    return "I understand your question. Let me help you with that. What specific information would you like to know?";
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) return;
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setIsExpanded(true);
    }
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      onDoubleClick={handleDoubleClick}
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.div
        layout
        className={`bg-gray-900 rounded-xl shadow-xl border border-gray-800 overflow-hidden
          ${isMinimized ? 'w-[300px] h-[60px]' : isExpanded ? 'w-[400px] h-[600px]' : 'w-[400px] h-[60px]'}`}
      >
        {/* Header */}
        <motion.div
          layout="position"
          className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/95 backdrop-blur-lg cursor-pointer"
          onClick={() => !isMinimized && setIsExpanded(!isExpanded)}
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
              <h3 className="font-semibold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                AI Assistant
              </h3>
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5" />
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isMinimized && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isExpanded ? (
                  <Minimize2 className="h-5 w-5 text-gray-400" />
                ) : (
                  <Maximize2 className="h-5 w-5 text-gray-400" />
                )}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMinimized ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {!isMinimized && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-[calc(100%-4rem)]"
            >
              {/* Messages Container */}
              <div
                ref={chatContainerRef}
                className="h-[calc(100%-4rem)] overflow-y-auto p-4 space-y-4 custom-scrollbar"
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
                  messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
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

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-800 rounded-2xl p-4">
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
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
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
    </motion.div>
  );
};

export default AIChatbot;