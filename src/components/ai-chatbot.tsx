import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTED_PROMPTS = [
  "Find books for CSE",
  "Suggest affordable gadgets",
  "Show trending items",
  "Find hostel essentials",
];

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (text: string, sender: "user" | "assistant") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    addMessage(input, "user");
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = [
        "I'd love to help! Browse our CSE section to find textbooks and course materials.",
        "Great choice! Check out our gadgets collection for budget-friendly items under ₹5,000.",
        "Trending items this week include laptops, stationery, and gaming accessories.",
        "Our hostel essentials collection includes bedding, storage, and room decor.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, "assistant");
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    addMessage(prompt, "user");
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        "I'd recommend checking our filtered listings for that category!",
        "Let me help you find exactly what you're looking for.",
        "Great! I found several options that match your interest.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, "assistant");
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elegant",
          "flex items-center justify-center gap-2 transition-all duration-300 z-40",
          "bg-brand-gradient text-primary-foreground hover:shadow-lg hover:scale-105",
          "border border-primary/20 backdrop-blur-sm"
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-24 right-6 w-96 rounded-3xl shadow-elegant overflow-hidden z-40",
              "border border-border/60 bg-background/95 backdrop-blur-xl",
              "max-h-[600px] flex flex-col",
              "md:bottom-28 md:right-8",
              "sm:bottom-24 sm:right-6 sm:w-80",
              "max-sm:bottom-20 max-sm:right-4 max-sm:w-[calc(100%-2rem)]"
            )}
          >
            {/* Header */}
            <div className="border-b border-border/40 bg-gradient-to-r from-brand-blue/10 to-transparent p-4">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-primary-foreground">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Campus Assistant</h3>
                  <p className="text-xs text-muted-foreground">Powered by AI</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-4">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-4"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary/50 text-foreground/60 mb-3">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">Hi! 👋</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ask me anything about campus marketplace
                  </p>
                </motion.div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-2",
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-xs px-3 py-2 rounded-2xl text-sm",
                          msg.sender === "user"
                            ? "bg-brand-gradient text-primary-foreground rounded-br-none"
                            : "bg-secondary/60 text-foreground rounded-bl-none"
                        )}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2 justify-start"
                    >
                      <div className="bg-secondary/60 text-foreground px-3 py-2 rounded-2xl rounded-bl-none">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                duration: 0.6,
                                delay: i * 0.1,
                                repeat: Infinity,
                              }}
                              className="h-2 w-2 rounded-full bg-muted-foreground"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Suggested Prompts */}
            {messages.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="border-t border-border/40 p-3 space-y-2"
              >
                <p className="text-xs text-muted-foreground font-medium px-1">Quick suggestions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <motion.button
                      key={prompt}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "text-xs px-3 py-2 rounded-lg text-left transition-all",
                        "bg-secondary/50 hover:bg-secondary text-foreground",
                        "border border-border/40 hover:border-border/80"
                      )}
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input */}
            <div className="border-t border-border/40 p-3 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask something..."
                  className={cn(
                    "flex-1 bg-secondary/50 text-sm rounded-lg px-3 py-2 outline-none",
                    "placeholder:text-muted-foreground/60 transition-colors",
                    "focus:bg-secondary border border-border/40 focus:border-border/80"
                  )}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "h-9 w-9 rounded-lg flex items-center justify-center transition-all",
                    "bg-brand-gradient text-primary-foreground",
                    "hover:shadow-soft disabled:opacity-60"
                  )}
                >
                  {isLoading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </motion.button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                AI-powered marketplace assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
