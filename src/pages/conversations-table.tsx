"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"
import { useQuery } from '@tanstack/react-query'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ModelBadge, ModelIcon } from "@/components/model-badge"
import { Skeleton } from "@/components/ui/skeleton"
import Error from "@/components/error"
import { useLocation } from "wouter"

interface Conversation {
    id: string
    created_at: string
    updated_at: string
    responses: Array<{
        id: string
        content: string
        created_at: string
    }>
}

const columns: ColumnDef<Conversation>[] = [
    {
        accessorKey: "name",
        header: "Name",
        size: 250,
        cell: ({ row }) => {
            return (
                <div className="line-clamp-1">
                    {row.original.name}
                </div>
            )
        }
    },
    {
        accessorKey: "model",
        header: "Model",
        cell: ({ getValue }) => {
            return (
                <div className="flex items-center gap-2">
                    <ModelIcon model={getValue()} />
                    <ModelBadge model={getValue()} />
                </div>
            )
        }
    },
    { accessorFn: (row) => row.total_input_tokens, header: "Input Tokens" },
    { accessorFn: (row) => row.total_output_tokens, header: "Output Tokens" },
    {
        accessorKey: "response_count",
        header: "Responses",
        size: 64,
        cell: ({ getValue }) => {
            return getValue()
        },
    },
    {
        accessorKey: "id",
        header: "ID",
        size: 60,
        cell: ({ getValue }) => {
            return (
                <div className="line-clamp-1 text-sm font-mono text-muted-foreground">
                    {getValue()}
                </div>
            )
        }
    },
]

function ConversationsTableContent({ data }) {
    const [location, navigate] = useLocation();

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
    })

    const cellStyles = (column) => {
        return {
            width: column.size,
        }
    }

    console.log("row-count", table.getRowModel().rows.length)

    return (
        <div className="rounded-md border h-full overflow-y-auto relative">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}
                            className="sticky top-0 bg-background">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}
                                        className="bg-secondary"
                                        style={cellStyles(header.column.columnDef)}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                role="button"
                                className="cursor-pointer"
                                onClick={() => navigate(`/responses?conversation=${row.original.id}`)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} style={cellStyles(cell.column.columnDef)}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No conversations found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div >
    )
}

export function ConversationsTable() {

    const { data, isLoading, error } = useQuery({
        queryKey: ['conversations'],
        queryFn: async () => {
            const response = await fetch('/api/query?type=conversations&limit=100')
            const data = await response.json()
            return data.conversations
        }
    })

    if (isLoading) return (<div className="p-4 h-full"><Skeleton className="w-full h-full bg-muted/50" /></div>)
    if (error) return <Error />

    return (
        <div className="p-4 grow h-[calc(100vh-100px)] flex flex-col">
            <ConversationsTableContent data={data} />
        </div>
    )
} 