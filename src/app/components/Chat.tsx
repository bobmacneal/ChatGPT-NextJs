"use client";
import { useState } from "react";
import { ChatCompletionMessage } from '../types/chat-completion-message'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCompletion } from "@/app/server-actions/getCompletion";


export default function Chat() {
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
  const [message, setMessage] = useState("");

  const onClick = async () => {
    // noinspection TypeScriptValidateTypes
    const completions = await getCompletion([
      ...messages,
      {
        role: "user",
        content: message,
      },
    ]);
    setMessage("");
    setMessages(completions.messages);
  };

  return (
    <div className="flex flex-col">
      {messages.map((message:ChatCompletionMessage, i) => (
        <div
          key={i}
          className={`mb-1 flex flex-col ${
            message.role === "user" ? "items-start" : "items-start pl-3"
          }`}
        >
          <div
            className={`${
              message.role === "user" ? "bg-blue-50 border border-gray-200" : "bg-blue-400 text-white"
            } rounded-md py-1 px-8`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div className="flex mt-2">
        <Input
          className="flex-grow text-md"
          placeholder="ChatGPT Prompt?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onClick();
            }
          }}
        />
        <Button onClick={onClick} className="ml-3 text-md">
          Send
        </Button>
      </div>
    </div>
  );
}
