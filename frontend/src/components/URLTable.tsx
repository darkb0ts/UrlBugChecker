import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { SendRequest } from "../../wailsjs/go/main/App"; 

type RowData = {
  url: string;
  status: string;
};

const URLTable = () => {
  const [data, setData] = useState<RowData[]>([
    { url: "https://example.com", status: "Pending" },
    { url: "https://example.org", status: "Pending" },
  ]);

  const sendRequest = async (index: number) => {
    const url = data[index].url;
    try {
      const result = await SendRequest(url);
      const updated = [...data];
      updated[index].status = result.status;
      setData(updated);
    } catch (e) {
      const updated = [...data];
      updated[index].status = "Error ❌";
      setData(updated);
    }
  };

  const columns: ColumnDef<RowData>[] = [
    {
      header: "URL",
      accessorKey: "url",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <Button onClick={() => sendRequest(row.index)}>Send Request</Button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border rounded-xl p-4 bg-white dark:bg-gray-800 shadow-md">
      <table className="min-w-full text-left table-auto">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-2 border-b font-semibold">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default URLTable;
