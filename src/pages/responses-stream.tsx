import { useQuery } from "@tanstack/react-query"
import { LLMInteraction, LoadingSkeleton } from "@/components/llm-interaction"
import Error from "@/components/error"
import { useSearch } from 'wouter';

const ResponsesStream = () => {
    const search = useSearch()
    console.log(search)
    const { data, isLoading, error } = useQuery({
        queryKey: ['responses', search],
        queryFn: async () => {
            const response = await fetch('/api/query?type=responses&' + search)
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