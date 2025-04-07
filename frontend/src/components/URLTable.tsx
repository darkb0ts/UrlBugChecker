import type React from "react";
import { useState, useRef } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
  getSortedRowModel,
  type SortingState,
  getFilteredRowModel,
  type ColumnFiltersState,
  getPaginationRowModel,
  type ExpandedState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { SendRequest } from "../../wailsjs/go/main/App";
import {
  Plus,
  Upload,
  Settings,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  ArrowUpDown,
  Trash,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RowData {
  url: string;
  status: string;
  title?: string;
  contentType?: string;
  response?: string;
  responseTime?: number;
  lastChecked?: string;
}

const URLTable = () => {
  const [data, setData] = useState<RowData[]>([
  ]);
  const [newUrl, setNewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    url: true,
    status: true,
    title: true,
    contentType: true,
    responseTime: true,
    lastChecked: true,
    action: true,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<RowData>[] = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) => {
        return row.getCanExpand() ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => row.toggleExpanded()}
            className="p-0 h-6 w-6"
          >
            {row.getIsExpanded() ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        ) : null;
      },
    },
    {
      id: "url",
      accessorKey: "url",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 font-bold"
          >
            URL
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("url")}</div>
      ),
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "Success ✅"
                ? "default" // or "secondary"
                : status === "Error ❌" || status === "Failed ❌"
                ? "destructive"
                : "outline"
            }
          >
            {status}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div>{row.original.title || "-"}</div>,
    },
    {
      id: "contentType",
      accessorKey: "contentType",
      header: "Content Type",
      cell: ({ row }) => <div>{row.original.contentType || "-"}</div>,
    },
    {
      id: "responseTime",
      accessorKey: "responseTime",
      header: "Response Time",
      cell: ({ row }) => (
        <div>
          {row.original.responseTime ? `${row.original.responseTime}ms` : "-"}
        </div>
      ),
    },
    {
      id: "lastChecked",
      accessorKey: "lastChecked",
      header: "Last Checked",
      cell: ({ row }) => <div>{row.original.lastChecked || "-"}</div>,
    },
    {
      id: "action",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleSendRequest(row.index)}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Check
          </Button>
          <Button
            onClick={() => handleDeleteUrl(row.index)}
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      sorting,
      columnFilters,
      expanded,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => true,
  });

  const handleSendRequest = async (index: number) => {
    console.log(index);
    const url = data[index].url;
    try {
      const startTime = performance.now();
      const result = await SendRequest(url);
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);

      const updated = [...data];
      updated[index].status = result.status;
      updated[index].response = result.response;
      updated[index].title = result.title;
      updated[index].contentType = result.contentType;
      updated[index].responseTime = responseTime;
      updated[index].lastChecked = new Date().toLocaleString();
      setData(updated);
    } catch (error) {
      const updated = [...data];
      updated[index].status = "Error ❌";
      updated[index].response = "Failed to fetch data";
      updated[index].lastChecked = new Date().toLocaleString();
      setData(updated);
    }
  };

  const handleAddUrl = () => {
    if (newUrl.trim() === "") return;
    if (data.some((item) => item.url === newUrl)) {
      alert("This URL already exists in the table");
      return;
    }
    setData([...data, { url: newUrl, status: "Pending" }]);
    setNewUrl("");
  };

  const handleDeleteUrl = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const urls = content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && line.startsWith("http"));

      if (urls.length > 0) {
        const newData = [...data];
        let addedCount = 0;
        urls.forEach((url) => {
          if (!newData.some((item) => item.url === url)) {
            newData.push({ url, status: "Pending" });
            addedCount++;
          }
        });
        setData(newData);
        alert(
          `Added ${addedCount} new URLs. ${
            urls.length - addedCount
          } were duplicates and skipped.`
        );
      }
    };
    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCheckAll = async () => {
    setIsProcessing(true);
    setProgress(0);

    const total = data.length;
    let completed = 0;

    const newData = [...data];

    for (let i = 0; i < newData.length; i++) {
      try {
        const startTime = performance.now();
        const result = await SendRequest(newData[i].url);
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        newData[i].status = result.status;
        newData[i].response = result.response;
        newData[i].title = result.title;
        newData[i].contentType = result.contentType;
        newData[i].responseTime = responseTime;
        newData[i].lastChecked = new Date().toLocaleString();
      } catch (error) {
        newData[i].status = "Error ❌";
        newData[i].response = "Failed to fetch data";
        newData[i].lastChecked = new Date().toLocaleString();
      }

      completed++;
      setProgress(Math.round((completed / total) * 100));
      setData([...newData]);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    setIsProcessing(false);
  };

  const exportToCSV = () => {
    const headers = [
      "URL",
      "Status",
      "Title",
      "Content Type",
      "Response Time",
      "Last Checked",
    ];
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        [
          `"${row.url}"`,
          `"${row.status}"`,
          `"${row.title || ""}"`,
          `"${row.contentType || ""}"`,
          `"${row.responseTime || ""}"`,
          `"${row.lastChecked || ""}"`,
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `url-check-results-${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.click();
  };

  const clearAllUrls = () => {
    if (confirm("Are you sure you want to clear all URLs?")) {
      setData([]);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>URL List</CardTitle>
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search URLs..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8 w-full md:w-[200px]"
              />
              {globalFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setGlobalFilter("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.id !== "expander")
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id === "url"
                          ? "URL"
                          : column.id === "responseTime"
                          ? "Response Time"
                          : column.id === "lastChecked"
                          ? "Last Checked"
                          : column.id === "contentType"
                          ? "Content Type"
                          : column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportToCSV}>
                  Export to CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={handleCheckAll}
              disabled={isProcessing || data.length === 0}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Check All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <div className="flex gap-2 flex-1">
            <Input
              placeholder="Enter URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddUrl}>
              <Plus className="h-4 w-4 mr-2" />
              Add URL
            </Button>
            <Button variant="outline" onClick={triggerFileUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <Button
            variant="outline"
            onClick={clearAllUrls}
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground-hover:shadow-sm"
          >
            <Trash className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        {isProcessing && (
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Processing URLs...</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <>
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                      <TableRow>
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          className="p-0"
                        >
                          <div className="p-4 bg-muted/50">
                            <Button onClick={handleAddUrl}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add Shortcut
                            </Button>
                            <h3 className="font-semibold mb-2">Response:</h3>
                            {row.original.response ? (
                              <pre className="whitespace-pre-wrap bg-background p-4 rounded-md text-sm overflow-auto max-h-[300px] border">
                                {row.original.response}
                              </pre>
                            ) : (
                              <div className="text-muted-foreground p-4 border rounded-md bg-background">
                                No response data available. Click "Check" to
                                fetch the response.
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No URLs added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {table.getFilteredRowModel().rows.length} of {data.length}{" "}
            URLs
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default URLTable;
