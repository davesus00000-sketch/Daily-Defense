import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { sendChatMessage } from "../services/aiService";
import { Heart, Send, Loader2, RotateCcw } from "lucide-react";

const COMPANION_PROMPTS = [
  "I am experiencing spiritual dryness and finding it hard to pray.",
  "A close friend left the Catholic Church, and my heart aches for them.",
  "How can I practice deeper humility when sharing my faith?",
  "Can you share an inspiring story or quote from a Catholic saint on perseverance?",
];

export const FaithCompanionView: React.FC = () => {
  const { incrementStat } = useApp();
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend = input) => {
    if (!textToSend.trim() || loading) return;

    const userText = textToSend.trim();
    setInput("");
    const newMessages = [...messages, { role: "user" as const, content: userText }];
    setMessages(newMessages);
    setLoading(true);

    const systemPrompt = `You are a gentle, prayerful Catholic Spiritual Companion. You have deep love for Jesus, Mary, and the Sacraments.
Provide compassionate, biblically sound Catholic spiritual guidance and encouragement. When someone shares struggles, pray with them, reference the Saints, and direct their gaze to Christ's infinite Divine Mercy.`;

    try {
      const reply = await sendChatMessage(newMessages, systemPrompt, false);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      incrementStat("prayersGenerated", 1);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Peace be with your spirit. Remember the comforting words of St. Padre Pio: 'Pray, hope, and don't worry. Worry is useless. God is merciful and will hear your prayer.' Bring your worries to the foot of the Cross, for Christ's grace is sufficient for you.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 pb-12 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-5 border border-[#e2ddd6] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-rose-600" />
          </div>
          <div>
            <h2 className="font-bold text-base text-gray-900">Faith Companion</h2>
            <p className="text-xs text-gray-500">
              Spiritual dialogue, encouragement, and counsel in Christ
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2ddd6] shadow-sm min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="py-8 text-center space-y-3">
            <Heart className="w-10 h-10 text-rose-300 mx-auto" />
            <h3 className="font-bold text-gray-800 text-sm">
              Peace be with you. How can I walk with you today?
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Share what is on your heart, ask for spiritual advice, or explore one of these reflections:
            </p>

            <div className="flex flex-col gap-2 max-w-lg mx-auto pt-2 text-left">
              {COMPANION_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="p-2.5 text-xs bg-rose-50/50 hover:bg-rose-50 text-rose-950 rounded-xl border border-rose-100 transition flex items-center justify-between"
                >
                  <span>"{prompt}"</span>
                  <span className="text-rose-400 font-bold ml-2">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <div
                key={idx}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? "bg-rose-600 text-white rounded-tr-none shadow-xs"
                      : "bg-[#fcfaf7] text-gray-800 border border-gray-200 rounded-tl-none font-serif"
                  }`}
                >
                  <div className="text-[10px] font-bold opacity-75 mb-1 uppercase tracking-wide">
                    {isUser ? "You" : "Faith Companion"}
                  </div>
                  <p className="whitespace-pre-line leading-relaxed">{m.content}</p>
                </div>
              </div>
            );
          })
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#fcfaf7] border border-gray-200 rounded-2xl rounded-tl-none p-3.5 text-xs text-gray-500 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
              <span>Contemplating in prayer...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your reflection or prayer..."
          disabled={loading}
          className="flex-1 min-w-0 bg-white border border-gray-300 focus:border-rose-600 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm outline-none transition shadow-xs"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 sm:px-5 py-2.5 sm:py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4 text-rose-200" />
          <span className="hidden xs:inline">Send</span>
        </button>
      </form>
    </div>
  );
};
