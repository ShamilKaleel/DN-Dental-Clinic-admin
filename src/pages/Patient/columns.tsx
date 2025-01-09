import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import StatusBar from "./data-table-status-bar";
import { DataTableRowActions } from "./data-table-row-actions";
import { Schedule } from "@/types/schedule";

export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px] capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] capitalize">{row.getValue("date")}</div>
    ),
  },

  {
    accessorKey: "numberOfBookings",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking count" />
    ),
    cell: ({ row }) => (
      <div className="w-[30px] text-center capitalize">
        {row.getValue("numberOfBookings")}
      </div>
    ),
  },
  {
    accessorKey: "availableSlots",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AvailableSlots" />
    ),
    cell: ({ row }) => (
      <div className="w-[30px] text-center capitalize">
        {row.getValue("availableSlots")}
      </div>
    ),
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] capitalize">{row.getValue("startTime")}</div>
    ),
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] capitalize">{row.getValue("endTime")}</div>
    ),
  },

  {
    accessorKey: "dentistId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dentist ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[30px] text-center capitalize">
        {row.getValue("dentistId")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusBar status={row.getValue("status")} />,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
