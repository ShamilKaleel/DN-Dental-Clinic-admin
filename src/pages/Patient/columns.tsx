import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";

import { DataTableRowActions } from "./data-table-row-actions";
import { Patient } from "@/types/patient";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[20px] capitalize ">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className=" lg:max-w-fit capitalize w-[150px]">
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
    cell: ({ row }) => (
      <div className="max-w-fit text-center  ">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "nic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="nic" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] text-center capitalize">
        {row.getValue("nic")}
      </div>
    ),
  },
  {
    accessorKey: "contactNumbers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Number" />
    ),
    cell: ({ row }) => {
      const contactNumbers = row.getValue<string[]>("contactNumbers");
      // Display the first contact number or a placeholder if empty
      return (
        <div className="w-[80px] capitalize">
          {contactNumbers?.[0] || "N/A"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
