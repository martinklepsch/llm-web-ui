import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import AnthropicIcon from "@/assets/anthropic.svg?react"
import GeminiIcon from "@/assets/gemini.svg?react"
import OpenaiIcon from "@/assets/openai.svg?react"
import DeepseekIcon from "@/assets/deepseek.svg?react"
import PerplexityIcon from "@/assets/perplexity.svg?react"

interface ModelInfo {
    name: string
    company: 'anthropic' | 'google' | 'openai' | 'deepseek' | 'perplexity'
    pricing?: {
        input_per_million: number
        output_per_million: number
    }
}

// define schema for this
// input token pricing
// output token pricing
// model name
// company
const MODEL_INFO: ModelInfo[] = [
    {
        name: "claude-3-5-sonnet-latest",
        company: "anthropic"
    },
    {
        name: "deepseek-chat",
        company: "deepseek",
    },
    {
        name: "gemini-1.5-flash-8b-latest",
        company: "google",
    },
    {
        name: "gemini-1.5-flash-latest",
        company: "google",
    },
    {
        name: "gemini-2.0-flash-experimental",
        company: "google",
    },
    {
        name: "gpt-4o",
        company: "openai",
    },
    {
        name: "gpt-4o-mini",
        company: "openai",
    },
    {
        name: "sonar-pro",
        company: "perplexity",
    },
    {
        name: "sonar-reasoning",
        company: "perplexity",
    }
]

const getModelInfo = (model: string) => {
    return MODEL_INFO.find(m => m.name === model)
};

interface ModelBadgeProps {
    model: string
    className?: string
}

function inferModelCompany(model: string) {
    if (model.startsWith("claude") || model.startsWith("haiku") || model.startsWith("opus")) {
        return "anthropic"
    }
    if (model.startsWith("gemini")) {
        return "google"
    }
    if (model.startsWith("gpt") || model.startsWith("o1") || model.startsWith("o3")) {
        return "openai"
    }
    if (model.startsWith("deepseek")) {
        return "deepseek"
    }
    if (model.startsWith("sonar")) {
        return "perplexity"
    }
}

export function ModelIcon({ model }: ModelIconProps) {
    const modelInfo = getModelInfo(model)
    const maker = modelInfo?.company || inferModelCompany(model)
    let classes = "size-4 text-foreground"
    switch (maker) {
        case "anthropic":
            return (<AnthropicIcon className={classes} />)
        case "google":
            return (<GeminiIcon className={classes} />)
        case "openai":
            return (<OpenaiIcon className={classes} />)
        case "deepseek":
            return (<DeepseekIcon className={classes} />)
        case "perplexity":
            return (<PerplexityIcon className={classes} />)
    }
}

export function ModelBadge({ model, className }: ModelBadgeProps) {
    const modelInfo = MODEL_INFO[model]

    return (
        <Tooltip>
            <TooltipTrigger>
                <Badge
                    variant="outline"
                    className="font-mono text-xs"
                >
                    {model}
                </Badge>
            </TooltipTrigger>
            {/* <TooltipContent>
                    <p>{modelInfo.description}</p>
                </TooltipContent> */}
        </Tooltip>
    )
} 