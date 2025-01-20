"use client"
import { useState } from "react"

import { getCompletion } from "@/app/server-actions/getCompletion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import type { ChatCompletionMessage } from "../types/chat-completion-message"

export default function Chat() {
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([])
  const [message, setMessage] = useState("")

  const onClick = async () => {
    // noinspection TypeScriptValidateTypes
    const completions = await getCompletion([
      ...messages,
      {
        role: "user",
        content: message,
      },
    ])
    setMessage("")
    setMessages(completions.messages)
  }

  return (
    <div className='flex flex-col'>
      {messages.map((message: ChatCompletionMessage, i) => (
        <div
          key={i}
          className={`mb-1 flex flex-col ${
            message.role === "user" ? "items-start" : "items-start pl-3"
          }`}
        >
          <div
            className={`${
              message.role === "user"
                ? "border border-gray-200 bg-blue-50"
                : "bg-blue-400 text-white"
            } rounded-md px-8 py-1`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div className='mt-2 flex'>
        <Input
          className='text-md grow'
          placeholder='ChatGPT Prompt?'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onClick()
            }
          }}
        />
        <Button onClick={onClick} className='text-md ml-3'>
          Send
        </Button>
      </div>
    </div>
  )
}
