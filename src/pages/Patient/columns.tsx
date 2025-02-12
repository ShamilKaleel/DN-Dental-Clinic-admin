import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";

import { DataTableRowActions } from "./data-table-row-actions";
import { Patient } from "@/types/patient";
import { Link } from "react-router-dom";
//<Link to={`/patient/${row.getValue("id")}`}></Link>
export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <Link
        to={`/patient/${row.getValue("id")}`}
        className="w-[20px] capitalize "
      >
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <Link
        to={`/patient/${row.getValue("id")}`}
        className=" lg:max-w-fit capitalize w-[150px]"
      >
        {row.getValue("name")}
      </Link>
    ),
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
    cell: ({ row }) => (
      <Link
        to={`/patient/${row.getValue("id")}`}
        className="max-w-fit text-center  "
      >
        {row.getValue("email")}
      </Link>
    ),
  },
  {
    accessorKey: "nic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="nic" />
    ),
    cell: ({ row }) => (
      <Link
        to={`/patient/${row.getValue("id")}`}
        className="w-[100px] text-center capitalize"
      >
        {row.getValue("nic")}
      </Link>
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
        <Link
          to={`/patient/${row.getValue("id")}`}
          className="w-[80px] capitalize"
        >
          {contactNumbers?.[0] || "N/A"}
        </Link>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
