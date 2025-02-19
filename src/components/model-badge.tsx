import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ModelInfo {
    name: string
    company: 'anthropic' | 'google' | 'openai' | 'deepseek' | 'perplexity'
    description: string
    color: string
    pricing: {
        input_per_million: number
        output_per_million: number
    }
}

// define schema for this
// input token pricing
// output token pricing
// model name
// company
const MODEL_INFO: Record<string, ModelInfo> = {
    "claude-3-5-sonnet-latest": {
        family: "claude",
        description: "Claude 3.5 Sonnet - Anthropic's latest mid-tier model, balancing performance and efficiency",
        color: "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100"
    },
    "deepseek-chat": {
        family: "deepseek",
        description: "DeepSeek Chat - Open source large language model optimized for chat interactions",
        color: "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
    },
    "gemini-1.5-flash-8b-latest": {
        family: "gemini",
        description: "Gemini 1.5 Flash 8B - Compact and efficient version of Google's Gemini model",
        color: "bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100"
    },
    "gemini-1.5-flash-latest": {
        family: "gemini",
        description: "Gemini 1.5 Flash - Latest version of Google's efficient Gemini model",
        color: "bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100"
    },
    "gemini-2.0-flash-exp": {
        family: "gemini",
        description: "Gemini 2.0 Flash (Experimental) - Next generation of Google's Gemini model",
        color: "bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100"
    },
    "gpt-4o": {
        family: "gpt",
        description: "GPT-4 Optimized - Enhanced version of OpenAI's GPT-4 model",
        color: "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100"
    },
    "gpt-4o-mini": {
        family: "gpt",
        description: "GPT-4 Optimized Mini - Compact version of the optimized GPT-4 model",
        color: "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100"
    },
    "sonar-pro": {
        family: "sonar",
        description: "Sonar Pro - Advanced model for specialized tasks",
        color: "bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100"
    },
    "sonar-reasoning": {
        family: "sonar",
        description: "Sonar Reasoning - Specialized model focused on logical reasoning tasks",
        color: "bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100"
    }
}

interface ModelBadgeProps {
    model: string
    className?: string
}

export function ModelBadge({ model, className }: ModelBadgeProps) {
    const modelInfo = MODEL_INFO[model]

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Badge
                        variant="secondary"
                        className={cn(modelInfo.color, "transition-colors", className)}
                    >
                        {model}
                    </Badge>
                </TooltipTrigger>
                {/* <TooltipContent>
                    <p>{modelInfo.description}</p>
                </TooltipContent> */}
            </Tooltip>
        </TooltipProvider>
    )
} 