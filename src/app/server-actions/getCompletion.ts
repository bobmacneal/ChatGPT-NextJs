"use server"
import OpenAI from "openai"

import type { ChatCompletionMessage } from "../types/chat-completion-message"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function getCompletion(messageHistory: ChatCompletionMessage[]) {
  // noinspection TypeScriptValidateTypes
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messageHistory,
  })

  const messages = [
    ...messageHistory,
    response.choices[0].message as unknown as ChatCompletionMessage,
  ]

  return {
    messages,
  }
}
