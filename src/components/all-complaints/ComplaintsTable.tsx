"use client";

import { ComplaintInterface } from "@/types/Complaint";
import { DataTable } from "./DataTable";

export function ComplaintsTable({
    complaints,
    currentPage,
  }: {
    complaints: ComplaintInterface[];
    currentPage: number;
  }) {
    const columns = [
      { accessorKey: "title", header: "Title" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "postedOn", header: "Posted On" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "source", header: "Source" },
    ];
  
    return (
      <DataTable
        data={complaints}
        columns={columns}
      />
    );
  }