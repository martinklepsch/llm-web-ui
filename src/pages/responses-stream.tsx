import { useQuery } from "@tanstack/react-query"
import { LLMInteraction, LLMInteractionHeader, LoadingSkeleton } from "@/components/llm-interaction"
import { useVirtualizer, defaultRangeExtractor } from '@tanstack/react-virtual'
import Error from "@/components/error"
import { useSearch } from 'wouter';
import * as React from "react";

const ResponsesStream = () => {
    const search = useSearch()
    const { data, isLoading, error } = useQuery({
        queryKey: ['responses', search],
        queryFn: async () => {
            const response = await fetch('/api/query?type=responses&' + search)
            const data = await response.json()
            return data.responses
        }
    })

    const parentRef = React.useRef<HTMLDivElement>(null)
    const [enabled, setEnabled] = React.useState(true)
    const firstVisibleIndexRef = React.useRef(0)
    const [activeStickyIndex, setActiveStickyIndex] = React.useState(0)

    const count = data?.length ?? 0
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 400,
        enabled,
        rangeExtractor: React.useCallback((range) => {
            const newFirstVisible = range.startIndex
            if (newFirstVisible !== firstVisibleIndexRef.current) {
                firstVisibleIndexRef.current = newFirstVisible
                setActiveStickyIndex(newFirstVisible)
                console.log('First visible index changed to:', newFirstVisible)
            }
            return defaultRangeExtractor(range)
        }, [])
    })

    const items = virtualizer.getVirtualItems()

    if (isLoading) return <LoadingSkeleton />
    if (error) return <Error />

    return (
        <>
            <div className="top-0 z-10 bg-background">
                <LLMInteractionHeader response={data[activeStickyIndex]} />
            </div>
            <div ref={parentRef} className="grow h-[calc(100vh-100px)] overflow-y-auto">
                <div
                    style={{
                        height: virtualizer.getTotalSize(),
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${items[0]?.start ?? 0}px)`,
                        }}
                    >
                        {items.map((virtualRow) => (
                            <div
                                key={virtualRow.key}
                                data-index={virtualRow.index}
                                ref={virtualizer.measureElement}
                            >
                                <LLMInteraction response={data[virtualRow.index]} hideHeader={virtualRow.index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResponsesStream;