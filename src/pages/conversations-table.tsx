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
    { accessorKey: "name", header: "Name" },
    { accessorKey: "model", header: "Model" },
    { accessorFn: (row) => row.responses.reduce((acc, response) => acc + response.inputTokens, 0), header: "Input Tokens" },
    { accessorFn: (row) => row.responses.reduce((acc, response) => acc + response.outputTokens, 0), header: "Output Tokens" },
    {
        accessorKey: "responses",
        header: "Responses",
        size: 64,
        cell: ({ row }) => {
            const responses = row.getValue("responses") as Array<any>
            return responses.length
        },
    },
    { accessorKey: "id", header: "ID" },
]

function ConversationsTableContent() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['conversations'],
        queryFn: async () => {
            const response = await fetch('/api/query?type=conversations&limit=100')
            const data = await response.json()
            return data.conversations
        }
    })

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const cellStyles = (column) => {
        return {
            width: column.size,
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading conversations</div>

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} style={cellStyles(header.column.columnDef)}>
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
            <div className="flex items-center justify-end space-x-2 p-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export function ConversationsTable() {
    return (
        <div className="p-4">
            <ConversationsTableContent />
        </div>
    )
} 