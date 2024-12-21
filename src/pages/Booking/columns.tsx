import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Booking = {
  referenceId: number; // Unique identifier for the booking
  name: string; // Patient's full name
  nic: string; // Patient's National Identity Card number
  contactNumber: string; // Patient's contact phone number
  email: string; // Patient's email address
  address: string; // Patient's residential address
  scheduleId: number; // Associated schedule ID
};

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "referenceId",
    header: "Reference NO",
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "nic",
    header: "NIC",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <div className="w-[100px] text-right ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(booking.referenceId.toString())
                }
              >
                Copy reference ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
