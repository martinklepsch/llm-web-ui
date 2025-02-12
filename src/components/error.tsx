
import { CircleX, type LucideIcon } from "lucide-react"

const Error = () => {
    return (
        <div className="w-full h-full flex items-center justify-center text-center">
            <div>
                <CircleX className="block mx-auto mb-4 w-10 h-10 text-muted-foreground" />
                <div className="text-lg font-bold">
                    There was a problem.
                </div>
                <div className="text-sm text-muted-foreground">
                    If the issue persists, please <a href="https://github.com/martinklepsch/llm-web-ui/issues" target="_blank" rel="noopener noreferrer" className="text-primary underline">file an issue</a>.
                </div>
            </div>
        </div>
    )
}

export default Error
