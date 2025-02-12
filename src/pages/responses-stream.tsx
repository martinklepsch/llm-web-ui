import { useQuery } from "@tanstack/react-query"
import { LLMInteraction } from "@/components/llm-interaction"

const ResponsesStream = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['responses'],
        queryFn: async () => {
            const response = await fetch('/api/query?type=responses&limit=100')
            const data = await response.json()
            return data.responses
        }
    })

    if (isLoading) return <div>Loading...</div>
    console.log(data)
    return <div className="p-4 space-y-4">
        {data.map((response) => (
            <LLMInteraction key={response.id} response={response} />
        ))}
    </div>
}

export default ResponsesStream;