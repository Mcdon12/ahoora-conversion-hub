import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { AccountSelector } from "@/components/AccountSelector";
import { mockData, sampleQuestions } from "@/data/mockData";
import { ChatSession, ChatMessage, MCCAccount, GoogleAdsAccount, ChartData } from "@/types/dashboard";
import { pushGTMEvent } from "@/types/gtm";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedMCC, setSelectedMCC] = useState<MCCAccount>();
  const [selectedAccount, setSelectedAccount] = useState<GoogleAdsAccount>();
  const [currentChat, setCurrentChat] = useState<ChatSession>();
  const [chatHistory, setChatHistory] = useState(mockData.chatHistory);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);

  useEffect(() => {
    // Track dashboard page view
    pushGTMEvent({
      event: 'page_view',
      page_title: 'Dashboard',
      page_path: '/dashboard'
    });
  }, []);

  const handleChatSelect = (chat: ChatSession) => {
    setCurrentChat(chat);
    
    // Find and set the corresponding account
    const account = mockData.mccAccounts
      .flatMap(mcc => mcc.childAccounts)
      .find(acc => acc.id === chat.accountId);
    
    if (account) {
      setSelectedAccount(account);
      // Also set the MCC
      const mcc = mockData.mccAccounts.find(m => 
        m.childAccounts.some(c => c.id === account.id)
      );
      if (mcc) setSelectedMCC(mcc);
    }

    pushGTMEvent({
      event: 'chat_selected',
      chat_id: chat.id,
      account_name: chat.accountName
    });
  };

  const handleNewChat = (accountId: string, accountName: string) => {
    const newChat: ChatSession = {
      id: `chat-${Date.now()}`,
      title: `New ${accountName} Conversation`,
      accountId,
      accountName,
      lastMessage: "",
      timestamp: "Just now",
      messages: []
    };

    setCurrentChat(newChat);
    
    // Add to history
    setChatHistory(prev => ({
      ...prev,
      [accountId]: [newChat, ...(prev[accountId] || [])]
    }));

    pushGTMEvent({
      event: 'new_chat_created',
      account_id: accountId,
      account_name: accountName
    });
  };

  const generateMockChartData = (message: string, account?: GoogleAdsAccount, dateRange?: DateRange): ChartData | undefined => {
    const lowerMessage = message.toLowerCase();
    
    // Generate chart data based on keywords in the message
    if (lowerMessage.includes('performance') || lowerMessage.includes('trend') || lowerMessage.includes('chart')) {
      const days = 30;
      const data = Array.from({ length: days }, (_, i) => ({
        date: format(new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000), 'MMM dd'),
        clicks: Math.floor(Math.random() * 1000) + 500,
        impressions: Math.floor(Math.random() * 10000) + 5000,
        conversions: Math.floor(Math.random() * 50) + 10,
        cost: Math.floor(Math.random() * 500) + 200
      }));

      if (lowerMessage.includes('comparison') || lowerMessage.includes('compare')) {
        return {
          type: "bar",
          data: [
            { name: 'Clicks', current: 8420, previous: 7230 },
            { name: 'Impressions', current: 45200, previous: 38900 },
            { name: 'Conversions', current: 320, previous: 280 },
            { name: 'Cost', current: 12500, previous: 11200 }
          ],
          config: {
            current: { label: 'Current Period', color: 'hsl(var(--primary))' },
            previous: { label: 'Previous Period', color: '#9b87f5' }
          },
          title: `${account?.name || 'Campaign'} Performance Comparison`,
          xAxisKey: 'name'
        };
      }

      return {
        type: "line",
        data,
        config: {
          clicks: { label: 'Clicks', color: 'hsl(var(--primary))' },
          conversions: { label: 'Conversions', color: '#9b87f5' }
        },
        title: `${account?.name || 'Campaign'} Performance Trend`,
        xAxisKey: 'date'
      };
    }

    if (lowerMessage.includes('budget') || lowerMessage.includes('spend')) {
      return {
        type: "pie",
        data: [
          { name: 'Search Campaigns', value: 45, fill: 'hsl(var(--primary))' },
          { name: 'Display Campaigns', value: 30, fill: '#9b87f5' },
          { name: 'Shopping Campaigns', value: 15, fill: '#6E59A5' },
          { name: 'Video Campaigns', value: 10, fill: '#0EA5E9' }
        ],
        config: {},
        title: `${account?.name || 'Account'} Budget Distribution`,
        yAxisKey: 'value'
      };
    }

    return undefined;
  };

  const generateMockResponse = (userMessage: string, account?: GoogleAdsAccount, dateRange?: DateRange): string => {
    const responses = [
      `Great question about ${account?.name || 'your account'}! Based on the recent performance data, I can see some interesting trends...`,
      `Here's what I found for ${account?.name || 'your campaigns'}: Your campaigns are showing strong performance in several key areas...`,
      `Let me analyze ${account?.name || 'your account'} data. I notice some optimization opportunities that could improve your ROI...`,
      `For ${account?.name || 'your account'}, I recommend focusing on these key areas to maximize performance...`
    ];
    
    const dateRangeText = dateRange?.from && dateRange?.to 
      ? `for the period from ${format(dateRange.from, 'MMM dd')} to ${format(dateRange.to, 'MMM dd, yyyy')}`
      : '';
    
    return responses[Math.floor(Math.random() * responses.length)] + 
      ` ${dateRangeText}\n\n📊 **Key Insights:**\n• Click-through rate is trending upward\n• Cost per conversion has decreased by 12%\n• Top performing keywords are driving quality traffic\n\n💡 **Recommendation:** Consider increasing budget for your best performing ad groups.\n\nWould you like me to dive deeper into any specific metrics?`;
  };

  const handleSendMessage = async (message: string, chatSession?: ChatSession) => {
    if (!selectedAccount) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      content: message,
      sender: 'user',
      timestamp: new Date(),
      accountContext: selectedAccount.name
    };

    // Update current chat or create new one
    let updatedChat = chatSession;
    if (!updatedChat) {
      updatedChat = {
        id: `chat-${Date.now()}`,
        title: message.length > 50 ? message.substring(0, 50) + "..." : message,
        accountId: selectedAccount.id,
        accountName: selectedAccount.name,
        lastMessage: message,
        timestamp: "Just now",
        messages: []
      };
      setCurrentChat(updatedChat);
    }

    // Add user message
    const updatedMessages = [...(updatedChat.messages || []), userMessage];
    updatedChat = { ...updatedChat, messages: updatedMessages, lastMessage: message };
    setCurrentChat(updatedChat);

    // Update chat history
    setChatHistory(prev => ({
      ...prev,
      [selectedAccount.id]: [
        updatedChat!,
        ...(prev[selectedAccount.id] || []).filter(chat => chat.id !== updatedChat!.id)
      ]
    }));

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const chartData = generateMockChartData(message, selectedAccount, updatedChat?.dateRange);
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        content: generateMockResponse(message, selectedAccount, updatedChat?.dateRange),
        sender: 'agent',
        timestamp: new Date(),
        accountContext: selectedAccount.name,
        chart: chartData
      };

      const finalMessages = [...updatedMessages, aiResponse];
      const finalChat = { ...updatedChat!, messages: finalMessages, lastMessage: aiResponse.content };
      
      setCurrentChat(finalChat);
      setChatHistory(prev => ({
        ...prev,
        [selectedAccount.id]: [
          finalChat,
          ...(prev[selectedAccount.id] || []).filter(chat => chat.id !== finalChat.id)
        ]
      }));
      
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);

    pushGTMEvent({
      event: 'message_sent',
      account_name: selectedAccount.name,
      message_length: message.length
    });
  };

  const handleLogout = () => {
    pushGTMEvent({
      event: 'user_logout',
      page: 'dashboard'
    });
    navigate('/');
  };

  const handleDateRangeChange = (range: DateRange | undefined, chatSession?: ChatSession) => {
    if (!chatSession || !selectedAccount) return;

    // Add system message about date range change
    const systemMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      content: range?.from && range?.to 
        ? `📅 Updated analysis period to ${format(range.from, 'MMM dd')} - ${format(range.to, 'MMM dd, yyyy')}`
        : '📅 Date range cleared',
      sender: 'system',
      timestamp: new Date()
    };

    const updatedMessages = [...(chatSession.messages || []), systemMessage];
    const updatedChat = { 
      ...chatSession, 
      messages: updatedMessages,
      dateRange: range ? { from: range.from!, to: range.to! } : undefined
    };
    
    setCurrentChat(updatedChat);
    setChatHistory(prev => ({
      ...prev,
      [selectedAccount.id]: [
        updatedChat,
        ...(prev[selectedAccount.id] || []).filter(chat => chat.id !== updatedChat.id)
      ]
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="lg:hidden"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-ahoora-purple to-ahoora-purple-light flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg">Ahoora</span>
          </div>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Chat History */}
        <div className={cn(
          "transition-all duration-300 ease-in-out border-r border-border",
          isSidebarCollapsed ? "w-0 -ml-80" : "w-80",
          "lg:relative lg:ml-0 lg:w-80"
        )}>
          <ChatSidebar
            chatHistory={chatHistory}
            currentChatId={currentChat?.id}
            onChatSelect={handleChatSelect}
            onNewChat={handleNewChat}
            selectedAccountId={selectedAccount?.id}
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatInterface
            currentChat={currentChat}
            selectedAccount={selectedAccount}
            onSendMessage={handleSendMessage}
            onDateRangeChange={handleDateRangeChange}
            isTyping={isTyping}
          />
        </div>

        {/* Right Panel - Account Selector */}
        <div className={cn(
          "transition-all duration-300 ease-in-out border-l border-border bg-background",
          isRightPanelCollapsed ? "w-0 overflow-hidden" : "w-80",
          "lg:w-80"
        )}>
          <div className="h-full overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Account Settings</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                  className="lg:hidden"
                >
                  {isRightPanelCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
              
              <AccountSelector
                mccAccounts={mockData.mccAccounts}
                selectedMCC={selectedMCC}
                selectedAccount={selectedAccount}
                onMCCSelect={(mcc) => {
                  setSelectedMCC(mcc);
                  setSelectedAccount(undefined);
                  setCurrentChat(undefined);
                  pushGTMEvent({
                    event: 'mcc_account_selected',
                    mcc_name: mcc.name
                  });
                }}
                onAccountSelect={(account) => {
                  setSelectedAccount(account);
                  setCurrentChat(undefined);
                  pushGTMEvent({
                    event: 'client_account_selected',
                    account_name: account.name
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;