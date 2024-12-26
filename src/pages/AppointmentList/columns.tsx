import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBar from "./data-table-status-bar";
import { DataTableRowActions } from "./data-table-row-actions";

export interface Booking {
  referenceId: number;
  name: string;
  nic: string;
  contactNumber: string;
  email: string;
  address: string;
  scheduleId: number;
  status: "PENDING" | "ACTIVE" | "CANCEL" | "ABSENT" | "FINISHED";
  date: string;
  dayofweek: string;
  createdAt: string;
}
export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "referenceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference Id" />
    ),
    enableSorting: false,
    enableHiding: false,

    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("referenceId")}</div>
    ),
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "nic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIC" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("nic")}</div>
    ),
  },
  {
    accessorKey: "contactNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Number" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">
        {row.getValue("contactNumber")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="status" />
    ),
    cell: ({ row }) => <StatusBar status={row.getValue("status")} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" className="" />
    ),
    cell: ({ row }) => (
      <div className="w-[170px] ">{row.getValue("email")}</div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
