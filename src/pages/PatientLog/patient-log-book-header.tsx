import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import PatientLogForm from "@/components/forms/log-form";
import { Plus } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Link } from "react-router-dom";

interface PatientHeaderProps {
  patientID: string;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ patientID }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" flex flex-col ">
      <div className="flex justify-between py-5">
        <ResponsiveDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Add Patient"
          className="sm:max-w-screen-md p-20"
        >
          <PatientLogForm setIsOpen={setIsOpen} patientID={patientID} />
        </ResponsiveDialog>
        <h1 className="text-2xl font-bold ">Patient Details</h1>
        <div className="flex gap-2 md:gap-5">
          <Button
            className="btn btn-primary p-o"
            onClick={() => setIsOpen(true)}
          >
            <span className="hidden md:block"> Add Log book</span>
            <Plus className="md:hidden" />
          </Button>
        </div>
      </div>

      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/patient">Patient</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Log Book</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PatientHeader;
