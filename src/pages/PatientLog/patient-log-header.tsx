import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import PatientLogForm from "@/components/forms/log-form";
import { Plus } from "lucide-react";
import AddImageComponent from "@/components/forms/log-photo-add-form";
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

interface PatientLogHeaderProps {
  patientID: string;
  logID: string;
}

const PatientLogHeader: React.FC<PatientLogHeaderProps> = ({
  patientID,
  logID,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" flex flex-col ">
      <div className="flex justify-between py-5">
        <ResponsiveDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Add Image"
          className="sm:max-w-screen-md p-20"
        >
          <AddImageComponent
            setIsOpen={setIsOpen}
            patientID={patientID}
            logID={logID}
          />
        </ResponsiveDialog>
        <h1 className="text-2xl font-bold ">Patient Log</h1>
        <div className="flex gap-2 md:gap-5">
          <Button
            className="btn btn-primary p-o"
            onClick={() => setIsOpen(true)}
          >
            <span className="hidden md:block"> Add Image</span>
            <Plus className="md:hidden" />
          </Button>
        </div>
      </div>

      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={`/patient`}>Patient</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={`/patient/${patientID}`}>Log Book</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Log</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PatientLogHeader;
