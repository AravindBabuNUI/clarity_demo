import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, GraduationCap, HelpCircle } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  { icon: GraduationCap, text: "What credits will transfer to my program?" },
  { icon: BookOpen, text: "What are my missing requirements?" },
  { icon: HelpCircle, text: "How do I apply for transfer admission?" },
];

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your AI Transfer Advisor. I can help you understand how your credits will transfer, identify missing requirements, and guide you through the admission process. How can I assist you today?",
    timestamp: new Date()
  }
];

const AIAdvisor = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let response = "";

      if (userMessage.toLowerCase().includes('credit') || userMessage.toLowerCase().includes('transfer')) {
        response = "Based on your transcript from Community College of Denver, I can see that you have 21 credits that are eligible for transfer. Here's a breakdown:\n\n" +
          "✅ **Auto-approved (17 credits):**\n" +
          "• CS 101 → CS 105 (3 credits)\n" +
          "• MATH 201 → MATH 180 (4 credits)\n" +
          "• CS 201 → CS 261 (3 credits)\n" +
          "• ENG 110 → ENGL 101 (3 credits)\n" +
          "• CHEM 101 → CHEM 121 (4 credits)\n\n" +
          "⏳ **Pending faculty review (4 credits):**\n" +
          "• PHYS 150 → Awaiting Physics Dept. approval\n\n" +
          "Would you like me to explain any specific course equivalency?";
      } else if (userMessage.toLowerCase().includes('requirement') || userMessage.toLowerCase().includes('missing')) {
        response = "For your B.S. Computer Science degree, here are your remaining requirements after transfer credits are applied:\n\n" +
          "📋 **Core Requirements Remaining:**\n" +
          "• CS 251: Computer Organization (3 cr)\n" +
          "• CS 362: Data Structures II (3 cr)\n" +
          "• CS 466: Operating Systems (3 cr)\n\n" +
          "📋 **General Education:**\n" +
          "• Social Science elective (3 cr)\n" +
          "• Humanities elective (3 cr)\n\n" +
          "Total credits needed: 45 credits\n\n" +
          "Based on full-time enrollment, you could complete your degree in 3 semesters.";
      } else if (userMessage.toLowerCase().includes('admission') || userMessage.toLowerCase().includes('apply')) {
        response = "Here are the steps to complete your transfer admission:\n\n" +
          "1️⃣ **Submit Application** - Complete the online application at admissions.university.edu\n\n" +
          "2️⃣ **Official Transcripts** - Request official transcripts from all previously attended institutions\n\n" +
          "3️⃣ **Application Fee** - $50 non-refundable fee (waiver available)\n\n" +
          "4️⃣ **Deadlines:**\n" +
          "• Fall semester: June 1\n" +
          "• Spring semester: November 1\n\n" +
          "Would you like me to help you with any of these steps?";
      } else {
        response = "I understand you're asking about your transfer process. I can help with:\n\n" +
          "• **Credit evaluation** - See which courses will transfer\n" +
          "• **Degree requirements** - Identify remaining courses needed\n" +
          "• **Admission steps** - Guide through the application process\n" +
          "• **Timeline planning** - Estimate time to graduation\n\n" +
          "What specific information would be most helpful for you?";
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    simulateResponse(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    simulateResponse(question);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground">AI Transfer Advisor</h1>
          <p className="text-muted-foreground">
            Get instant answers about transfer eligibility, requirements, and admission
          </p>
        </div>

        <div className="flex-1 grid lg:grid-cols-4 gap-6 min-h-0">
          {/* Chat Area */}
          <Card className="lg:col-span-3 bg-card flex flex-col">
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.role === 'user' && "flex-row-reverse"
                      )}
                    >
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className={cn(
                          message.role === 'assistant'
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        )}>
                          {message.role === 'assistant' ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          "rounded-lg px-4 py-3 max-w-[80%]",
                          message.role === 'assistant'
                            ? "bg-accent"
                            : "bg-primary text-primary-foreground"
                        )}
                      >
                        <p className={cn(
                          "text-sm whitespace-pre-wrap",
                          message.role === 'user' && "text-primary-foreground"
                        )}>
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-accent rounded-lg px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex gap-3 pt-4 border-t border-border mt-4">
                <Input
                  placeholder="Ask a question about your transfer..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="bg-background"
                />
                <Button onClick={handleSend} disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Suggested Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-3"
                    onClick={() => handleSuggestedQuestion(question.text)}
                  >
                    <question.icon className="h-4 w-4 mr-2 shrink-0 text-primary" />
                    <span className="text-sm">{question.text}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Your Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Student</p>
                  <p className="font-medium text-foreground">Sarah Johnson</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Source Institution</p>
                  <p className="font-medium text-foreground">Community College of Denver</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Target Program</p>
                  <p className="font-medium text-foreground">B.S. Computer Science</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Credits Evaluated</p>
                  <p className="font-medium text-foreground">21 credits</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AIAdvisor;
