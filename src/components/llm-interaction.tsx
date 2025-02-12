"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock, Cpu, Hash, Info } from "lucide-react"
import ReactMarkdown from "react-markdown"

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

export function LLMInteraction({ response }: LLMInteractionProps) {
    const [showJson, setShowJson] = useState(false)
    const options = JSON.parse(response.optionsJson)
    const tokenDetails = JSON.parse(response.tokenDetails)

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    <Badge variant="outline" className="mr-2">
                        {response.model}
                    </Badge>
                    {new Date(response.datetimeUtc).toLocaleString()}
                </CardTitle>
                <div className="flex items-center space-x-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center">
                                    <Hash className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{tokenDetails.total_tokens}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Total Tokens: {tokenDetails.total_tokens}</p>
                                <p>Prompt Tokens: {tokenDetails.prompt_tokens}</p>
                                <p>Completion Tokens: {tokenDetails.completion_tokens}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{response.durationMs}ms</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Duration: {response.durationMs}ms</p>
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
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground mb-4">System: {response.system}</div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-border rounded-md p-4">
                        <h3 className="text-sm font-semibold mb-2">Prompt</h3>
                        {showJson ? (
                            <pre className="text-xs overflow-auto">{response.promptJson}</pre>
                        ) : (
                            <ReactMarkdown className="text-sm prose prose-sm max-w-none">{response.prompt}</ReactMarkdown>
                        )}
                    </div>
                    <div className="border border-border rounded-md p-4">
                        <h3 className="text-sm font-semibold mb-2">Response</h3>
                        {showJson ? (
                            <pre className="text-xs overflow-auto">{response.responseJson}</pre>
                        ) : (
                            <ReactMarkdown className="text-sm prose prose-sm max-w-none">{response.response}</ReactMarkdown>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}