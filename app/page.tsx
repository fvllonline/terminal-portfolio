"use client"

import { useState, useEffect } from "react"

const conversation = [
  {
    sender: "NAWFAL",
    text: "Are you looking for a full-stack web developer skilled in React, Next.js, and Tailwind CSS?",
  },
  { sender: "Response", text: "Yes." },
  {
    sender: "NAWFAL",
    text: "Do you also need someone who can develop a robust backend with Laravel and MySQL?",
  },
  { sender: "Response", text: "Yes." },
  { sender: "NAWFAL", text: "Are you interested in a self-driven, creative profile who can work in a team?" },
  { sender: "Response", text: "Yes." },
  { sender: "NAWFAL", text: "Would you like to see my projects and achievements?" },
  { sender: "Response", text: "Yes." },
  { sender: "NAWFAL", text: "Here is My portfolio: nawfalsportfolio.vercel.app" },
]

export default function TerminalConversation() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentMessageIndex >= conversation.length) {
      setIsComplete(true)
      return
    }

    const currentMessage = conversation[currentMessageIndex]
    const fullText = `${currentMessage.sender}: ${currentMessage.text}`

    if (currentText.length < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1))
      }, 50) // Typing speed

      return () => clearTimeout(timer)
    } else {
      // Message complete, pause then move to next
      const pauseTimer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1)
        setCurrentText("")
      }, 1000)

      return () => clearTimeout(pauseTimer)
    }
  }, [currentText, currentMessageIndex])

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  const renderMessage = (message: string, index: number) => {
    const parts = message.split(": ")
    const sender = parts[0]
    const text = parts.slice(1).join(": ")

    // Check if this message contains the portfolio link
    if (text.includes("nawfalsportfolio.vercel.app")) {
      const beforeLink = text.split("nawfalsportfolio.vercel.app")[0]
      const afterLink = text.split("nawfalsportfolio.vercel.app")[1]

      return (
        <p key={index} className="mb-1 sm:mb-2 break-words">
          <span className="font-bold text-green-400">{sender}:</span> {beforeLink}
          <a
            href="https://nawfalsportfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-300 hover:text-green-100 underline break-all"
          >
            nawfalsportfolio.vercel.app
          </a>
          {afterLink}
        </p>
      )
    }

    return (
      <p key={index} className="mb-1 sm:mb-2 break-words">
        <span className="font-bold text-green-400">{sender}:</span> {text}
      </p>
    )
  }

  return (
    <div className="bg-black text-green-500 font-mono min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl w-full">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-lg sm:text-2xl mb-4 text-green-400 break-words">{">"} Terminal de recrutement...</h1>
        </div>

        <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
          {/* Display completed messages */}
          {conversation
            .slice(0, currentMessageIndex)
            .map((message, index) => renderMessage(`${message.sender}: ${message.text}`, index))}

          {/* Display current typing message */}
          {currentMessageIndex < conversation.length && (
            <p className="mb-1 sm:mb-2 break-words">
              {currentText}
              {showCursor && <span className="animate-pulse">|</span>}
            </p>
          )}

          {/* Display completion message */}
          {isComplete && (
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-green-300 text-lg sm:text-xl">_ Fin de la conversation _</p>
              <p className="text-green-400 mt-4 animate-pulse text-sm sm:text-base break-words">
                {">"} Connexion établie avec succès...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
