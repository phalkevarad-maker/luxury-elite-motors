'use client'

import { motion } from "framer-motion"
import { Container, Section, SectionTitle } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { MessageCircle, Send, Bot, User } from "lucide-react"
import { useState } from "react"

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "assistant", text: "Welcome to Luxury Elite Motors. How may I assist you today?" }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { role: "user", text: input }])
    setInput("")

    setTimeout(() => {
      const responses = [
        "I'd be happy to help you find the perfect luxury vehicle.",
        "Would you like to schedule a test drive?",
        "Let me connect you with our premium concierge team.",
        "Our Rolls Royce customization studio is available for booking.",
        "We offer competitive financing options starting at 1.99% APR."
      ]
      setMessages(prev => [...prev, {
        role: "assistant",
        text: responses[Math.floor(Math.random() * responses.length)]
      }])
    }, 1000)
  }

  return (
    <div className="pt-20 min-h-screen flex flex-col">
      <Section className="!pt-8 flex-1 flex flex-col">
        <Container className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="w-6 h-6 text-gold" />
            <SectionTitle title="Luxury Assistant" subtitle="AI-powered concierge service" className="!mb-0 text-left" />
          </div>

          <div className="flex-1 glass rounded-2xl p-4 space-y-4 overflow-y-auto max-h-[60vh] mb-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "assistant" ? "bg-gold/20" : "bg-white/10"}`}>
                    {msg.role === "assistant" ? <Bot className="w-4 h-4 text-gold" /> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`rounded-xl p-3 ${msg.role === "assistant" ? "bg-white/5 text-white" : "bg-gold/20 text-gold"}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about luxury cars, financing, or customization..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
            />
            <Button variant="gold" onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
