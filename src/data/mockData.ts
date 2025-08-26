import { MockData, ChatMessage } from "@/types/dashboard";

export const mockData: MockData = {
  mccAccounts: [
    {
      id: "mcc-001",
      name: "Agency Master Account",
      childAccounts: [
        { id: "child-001", name: "Nike", spend: "$45,320" },
        { id: "child-002", name: "Adidas", spend: "$32,150" },
        { id: "child-003", name: "Under Armour", spend: "$18,900" },
        { id: "child-004", name: "Puma", spend: "$25,670" }
      ]
    },
    {
      id: "mcc-002",
      name: "E-commerce Hub",
      childAccounts: [
        { id: "child-005", name: "Amazon Store", spend: "$67,200" },
        { id: "child-006", name: "Shopify Plus", spend: "$23,400" },
        { id: "child-007", name: "WooCommerce", spend: "$15,800" }
      ]
    }
  ],
  chatHistory: {
    "child-001": [
      {
        id: "chat-001",
        title: "Campaign Performance Analysis",
        accountId: "child-001",
        accountName: "Nike",
        lastMessage: "Your Nike Air campaign is performing 23% above industry average...",
        timestamp: "2 hours ago",
        messages: [
          {
            id: "msg-001",
            content: "How is my Nike Air campaign performing this month?",
            sender: "user",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            accountContext: "Nike"
          },
          {
            id: "msg-002",
            content: "Your Nike Air campaign is performing exceptionally well this month! Here's a detailed breakdown:\n\n📈 **Key Metrics:**\n• Click-through rate: 3.2% (23% above industry average)\n• Conversion rate: 4.1% (15% improvement from last month)\n• Cost per acquisition: $47.20 (18% decrease)\n• Total conversions: 1,247\n\n🎯 **Top performing keywords:**\n1. \"nike air max\" - $2.85 CPC, 5.2% CTR\n2. \"running shoes nike\" - $3.10 CPC, 4.8% CTR\n3. \"nike sneakers\" - $2.95 CPC, 4.5% CTR\n\n💡 **Recommendations:**\n• Increase budget for top-performing ad groups by 15%\n• Add negative keywords to reduce irrelevant clicks\n• Test new ad copy focusing on \"performance\" messaging\n\nWould you like me to dive deeper into any specific aspect?",
            sender: "agent",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000),
            accountContext: "Nike"
          }
        ]
      },
      {
        id: "chat-002",
        title: "Keyword Optimization Strategy",
        accountId: "child-001",
        accountName: "Nike",
        lastMessage: "I recommend focusing on long-tail keywords for better ROI...",
        timestamp: "1 day ago",
        messages: []
      }
    ],
    "child-002": [
      {
        id: "chat-003",
        title: "Conversion Rate Issues",
        accountId: "child-002",
        accountName: "Adidas",
        lastMessage: "The landing page optimization should improve conversions by 20%...",
        timestamp: "3 hours ago",
        messages: []
      }
    ],
    "child-005": [
      {
        id: "chat-004",
        title: "Amazon Store Setup",
        accountId: "child-005",
        accountName: "Amazon Store",
        lastMessage: "Your sponsored product campaigns are ready to launch...",
        timestamp: "5 hours ago",
        messages: []
      }
    ]
  }
};

export const sampleQuestions = {
  generic: [
    "Show me a performance chart for this month",
    "How can I reduce cost per acquisition?",
    "Compare current vs previous period",
    "What's my budget distribution by campaign type?"
  ],
  "Nike": [
    "Show Nike performance trends over time",
    "Which Nike keywords have the highest ROI?",
    "Compare Nike vs Adidas campaign performance",
    "Chart Nike conversion trends this month"
  ],
  "Adidas": [
    "Analyze Adidas performance with charts",
    "How do Adidas campaigns compare to Nike?",
    "What's driving Adidas conversion rates?",
    "Show Adidas seasonal performance trends"
  ],
  "Amazon Store": [
    "Chart my sponsored product performance",
    "Show Amazon spend distribution by campaign",
    "Compare Amazon performance vs last month",
    "Analyze Amazon keyword performance trends"
  ]
};