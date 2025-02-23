"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock, Cpu, Hash, Info, ArrowDownToLine, ArrowUpFromLine, MoreHorizontal, DollarSign } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown"
import remarkBreaks from 'remark-breaks'
import { ModelBadge, ModelIcon } from "@/components/model-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { calculateCost } from "@/calculateCost"

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
    dark:prose-invert
    prose-h1:font-medium
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

const LoadingHeader = () => {
    return (
        <div className="">
            <div className="border-b border-t border-border bg-secondary ">
                <div className="flex flex-row items-center justify-between space-y-0 p-4">
                    <Skeleton className="h-6 w-92" />
                    <div className="flex flex-row items-center gap-2">
                        <Skeleton className="h-6 w-6" />
                        <Skeleton className="h-6 w-6" />
                        <Skeleton className="h-6 w-6" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const LLMInteractionHeader = ({ response }: { response: { inputTokens: number, outputTokens: number, durationMs: number, model: string, datetimeUtc: string } }) => {
    const fallback = <span className="text-foreground/50 text-xs font-semibold">N/A</span>
    const inputTokens = response.inputTokens || fallback
    const outputTokens = response.outputTokens || fallback
    const durationSeconds = Math.round((response.durationMs / 1000) * 100) / 100
    const cost = calculateCost(response.inputTokens, response.outputTokens, response.model)

    return (
        <div className="">
            <div className="border-b border-t border-border bg-secondary py-2 px-1">
                <div className="flex flex-row items-center justify-between space-y-0 py-2 px-4">
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <ModelIcon model={response.model} />
                        <ModelBadge model={response.model} className="mr-2" />
                        <Tooltip>
                            <TooltipTrigger>
                                {formatDistanceToNow(new Date(response.datetimeUtc), { addSuffix: true, includeSeconds: true })}
                            </TooltipTrigger>
                            <TooltipContent>
                                {format(new Date(response.datetimeUtc), 'MMM d, yyyy h:mm a')}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center">
                                    <DollarSign className="w-4 h-4 mr-1" />
                                    {cost?.totalCost ? cost.totalCost.toFixed(6).toString().split('').map((char: string, index: number) => (
                                        <span key={index}
                                            style={{ opacity: Math.max(0.3, 1 - index * 0.1) }}
                                            className="text-sm">
                                            {char}</span>
                                    )) : fallback}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                Total Cost {!cost?.totalCost ? "not available for this model" : null}
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center">
                                    <ArrowDownToLine className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{inputTokens}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                Input Tokens
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center">
                                    <ArrowUpFromLine className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{outputTokens}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                Output Tokens
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{durationSeconds}s</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                Duration
                            </TooltipContent>
                        </Tooltip>
                        {/* TODO: Add menu to toggle JSON view */}
                        {/* <Menu toggleJson={() => setShowJson(!showJson)}
                            collapseJson={() => setShowJson(false)}
                            expandJson={() => setShowJson(true)} /> */}
                    </div>
                </div>
            </div>
        </div >
    )
}


export function LoadingSkeleton() {
    return (
        <div className="w-full h-full mx-auto">
            <LoadingHeader />
            <div className="grid grid-cols-2 h-full divide-x">
                <div className="p-8 space-y-2">
                    <Skeleton className="h-4 w-48 mb-6" />
                    <Skeleton className="h-4 w-92" />
                    <Skeleton className="h-4 w-92" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="p-8 space-y-2">
                    <Skeleton className="h-4 w-48 mb-6" />
                    <Skeleton className="h-4 w-92" />
                    <Skeleton className="h-4 w-92" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>
        </div>
    )
}

const Menu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">More options</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function LLMInteraction({ response, hideHeader = false }: LLMInteractionProps) {
    const [showJson, setShowJson] = useState(false)

    return (
        <div className="w-full mx-auto">
            {!hideHeader && <LLMInteractionHeader response={response} />}
            <div className="">
                <div className="grid grid-cols-2 divide-x">
                    <div className="p-8 pb-24">
                        <h3 className="text-sm font-semibold mb-2">Prompt</h3>
                        {showJson ? (
                            <pre className="text-xs overflow-auto">{response.promptJson}</pre>
                        ) : (
                            <Markdown>{response.prompt}</Markdown>
                        )}
                    </div>
                    <div className="p-8 pb-24">
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