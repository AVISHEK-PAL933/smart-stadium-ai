import { useState, useCallback } from 'react';
import { askAIAssistant, AIResponse } from '../services/aiAssistant';

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  actionType?: string;
  actionPayload?: any;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I am your StadiumMind AI Assistant. Ask me where your seat is, find concessions, request accessibility assistance, or view live scores.',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response: AIResponse = await askAIAssistant(text);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        isBot: true,
        timestamp: new Date(),
        actionType: response.actionType,
        actionPayload: response.actionPayload,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I had trouble connecting to the stadium system. Please try again.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: Date.now().toString(),
        text: 'Conversation cleared. How can I help you today?',
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
  };
};
