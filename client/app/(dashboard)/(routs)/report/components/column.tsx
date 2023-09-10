"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "campaign_name",
        header: "CAMPAIGN",
    },
    {
        accessorKey: "start_time",
        header: "START",
    },
    {
        accessorKey: "end_time",
        header: "END",
    },
    {
        accessorKey: "masking",
        header: "MASKING",
    },
    {
        accessorKey: "number",
        header: "NUM",
    },
    {
        accessorKey: "operator",
        header: "OP",
    },
    {
        accessorKey: "status",
        header: "STATUS",
    },
    {
        accessorKey: "reward",
        header: "PACKAGE",
    },
    {
        accessorKey: "description",
        header: "DESC",
    },
];
