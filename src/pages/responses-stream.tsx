import { useQuery } from "@tanstack/react-query"
import { LLMInteraction, LoadingSkeleton } from "@/components/llm-interaction"
import Error from "@/components/error"

const ResponsesStream = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['responses'],
        queryFn: async () => {
            const response = await fetch('/api/query?type=responses&limit=100')
            const data = await response.json()
            return data.responses
        }
    })

    if (isLoading) return <LoadingSkeleton />
    if (error) return <Error />

    return (
        <div>
            {data.map((response) => (
                <LLMInteraction key={response.id} response={response} />
            ))}
        </div>
    )
}

export default ResponsesStream;