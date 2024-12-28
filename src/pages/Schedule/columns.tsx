import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
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

export interface Schedule {
  id: number;
  date: string;
  dayOfWeek: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "CANCELLED" | "FULL" | "FINISHED";
  numberOfBookings: number;
  bookings: Booking[];
  startTime: string;
  endTime: string;
  duration: number;
  dentistId: number;
  createdAt: string;
  capacity: number;
}
export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] capitalize">{row.getValue("date")}</div>
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
    accessorKey: "numberOfBookings",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking count" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] capitalize">
        {row.getValue("numberOfBookings")}
      </div>
    ),
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] capitalize">{row.getValue("capacity")}</div>
    ),
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] capitalize">{row.getValue("startTime")}</div>
    ),
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] capitalize">{row.getValue("endTime")}</div>
    ),
  },

  {
    accessorKey: "dentistId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dentist ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] capitalize">{row.getValue("dentistId")}</div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
