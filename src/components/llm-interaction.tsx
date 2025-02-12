"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock, Cpu, Hash, Info } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkBreaks from 'remark-breaks'

interface LLMInteractionProps {
    response: {
        id: string
        model: string
        prompt: string
        system: string
        promptJson: string
        optionsJson: string
        response: string
        responseJson: string
        conversationId: string
        durationMs: number
        datetimeUtc: string
        inputTokens: number
        outputTokens: number
        tokenDetails: string
    }
}

const Markdown = ({ children }: { children: string }) => {
    return (
        <ReactMarkdown className="prose
    text-foreground
    text-base
    prose-h1:font-bold
    prose-h1:text-3xl
    prose-img:rounded-xl
    prose-em:px-0.5
    prose-em:rounded-sm
    prose-strong:px-0.5
    prose-strong:font-medium
    prose-strong:rounded-sm
    prose-a:decoration-1
    prose-a:transition-text-decoration
    prose-a:font-medium
    prose-a:underline
    prose-a:underline-offset-4
    prose-a:hover:decoration-2
    prose-code:text-sm
    prose-code:font-medium
    prose-code-inline:rounded-md
    prose-code-inline:text-sm
    prose-code-inline:px-2
    prose-code-inline:py-1
    prose-code-inline:ring-1
    prose-code-inline:ring-inset
    prose-blockquote:text-lg
    prose-blockquote:font-light
    prose-blockquote:border-l-4
    prose-blockquote:pl-4
    prose-blockquote:ml-4
    prose-blockquote:mt-4"
            remarkPlugins={[remarkBreaks]}>
            {children}
        </ReactMarkdown>
    )
}

const Header = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="sticky top-0">
            <div className="border-b border-border bg-background ">
                {children}
            </div>
        </div>
    )
}


export function LLMInteraction({ response }: LLMInteractionProps) {
    const [showJson, setShowJson] = useState(false)
    const options = JSON.parse(response.optionsJson)
    const inputTokens = response.inputTokens
    const outputTokens = response.outputTokens
    const totalTokens = inputTokens + outputTokens
    const durationSeconds = Math.round((response.durationMs / 1000) * 100) / 100

    return (
        <div className="w-full mx-auto border border-border">
            <Header>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                    <div className="text-sm font-medium">
                        <Badge variant="outline" className="mr-2">
                            {response.model}
                        </Badge>
                        {new Date(response.datetimeUtc).toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex items-center">
                                        <Hash className="w-4 h-4 mr-1" />
                                        <span className="text-sm">{totalTokens}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Total Tokens: {totalTokens}</p>
                                    <p>Prompt Tokens: {inputTokens}</p>
                                    <p>Completion Tokens: {outputTokens}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span className="text-sm">{durationSeconds}s</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Duration: {durationSeconds}s</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex items-center">
                                        <Cpu className="w-4 h-4 mr-1" />
                                        <span className="text-sm">{options.temperature}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Temperature: {options.temperature}</p>
                                    <p>Max Tokens: {options.max_tokens}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="w-4 h-4 cursor-pointer" onClick={() => setShowJson(!showJson)} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Toggle JSON view</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="text-sm text-muted-foreground mb-4 line-clamp-2 px-4">
                    <div className="border-l pl-2 pr-32">
                        System: {response.system}
                    </div>
                </div>
            </Header>
            <div>
                <div className="grid grid-cols-2 divide-x">
                    <div className="p-6">
                        <h3 className="text-sm font-semibold mb-2">Prompt</h3>
                        {showJson ? (
                            <pre className="text-xs overflow-auto">{response.promptJson}</pre>
                        ) : (
                            <Markdown>{response.prompt}</Markdown>
                        )}
                    </div>
                    <div className="p-6">
                        <h3 className="text-sm font-semibold mb-2">Response</h3>
                        {showJson ? (
                            <pre className="text-xs overflow-auto">{response.responseJson}</pre>
                        ) : (
                            <Markdown>{response.response}</Markdown>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}