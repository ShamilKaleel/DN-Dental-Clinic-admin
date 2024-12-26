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
}

;

export const scheduleColumns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "dayOfWeek",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Day of Week" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("dayOfWeek")}</div>
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
      <DataTableColumnHeader column={column} title="Number of Bookings" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">
        {row.getValue("numberOfBookings")}
      </div>
    ),
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("startTime")}</div>
    ),
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("endTime")}</div>
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("duration")}</div>
    ),
  },
  {
    accessorKey: "dentistId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dentist ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("dentistId")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("createdAt")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];