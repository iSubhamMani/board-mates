"use client";

import { ForwardIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AccessControlForm, { ACLFormData } from "./AccessControlForm";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ACLData } from "@/models/ACLData";
import { useState } from "react";

const ShareButton = ({
  whiteboardId,
  defaultACLData,
}: {
  whiteboardId: string;
  defaultACLData: ACLData | undefined;
}) => {
  const [formData, setFormData] = useState<ACLFormData>({
    shareOption: defaultACLData?.shareOption || "restricted",
    publicEditAccess: defaultACLData?.publicEditAccess || "none",
    privateAccessList: defaultACLData?.privateAccessList || [],
  });

  console.log(formData);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 absolute top-4 right-4">
          Share
          <ForwardIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Share With</DialogTitle>
        </DialogHeader>
        <AccessControlForm
          formData={formData}
          setFormData={setFormData}
          id={whiteboardId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ShareButton;
