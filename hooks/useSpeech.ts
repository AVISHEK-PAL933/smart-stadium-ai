import { useState, useCallback, useRef } from 'react';

export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startListening = useCallback((onResult: (text: string) => void) => {
    setIsListening(true);
    setSpokenText('');

    // Simulate user speaking after 2 seconds
    speechTimeoutRef.current = setTimeout(() => {
      setIsListening(false);
      const randomPrompts = [
        'Where is my seat?',
        'Recommend food nearby',
        'Guide me to Gate A',
        'Nearest washroom',
        'Emergency help',
      ];
      const selected = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
      setSpokenText(selected);
      onResult(selected);
    }, 2500);
  }, []);

  const stopListening = useCallback(() => {
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    setIsListening(false);
  }, []);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      // Mock TTS for non-web or legacy web
      setIsSpeaking(true);
      setTimeout(
        () => {
          setIsSpeaking(false);
        },
        Math.min(text.length * 50, 4000)
      );
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return {
    isListening,
    isSpeaking,
    spokenText,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
};
