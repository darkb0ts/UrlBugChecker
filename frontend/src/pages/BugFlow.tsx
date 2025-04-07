// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Plus, Trash2 } from "lucide-react"

// export default function BugFlow() {
//   const [url, setUrl] = useState("")
//   const [selectedOption, setSelectedOption] = useState("")
//   const [tools, setTools] = useState<Array<{
//     name: string
//     command: string
//     description: string
//     category: string
//   }>>([])
//   const [toolName, setToolName] = useState("")
//   const [toolCommand, setToolCommand] = useState("")
//   const [toolDescription, setToolDescription] = useState("")
//   const [toolCategory, setToolCategory] = useState("default")

//   const handleAddTool = () => {
//     if (toolName && toolCommand) {
//       setTools([
//         ...tools,
//         {
//           name: toolName,
//           command: toolCommand,
//           description: toolDescription || "No description provided",
//           category: toolCategory,
//         },
//       ])
//       setToolName("")
//       setToolCommand("")
//       setToolDescription("")
//     }
//   }

//   const handleRemoveTool = (index: number) => {
//     const updatedTools = [...tools]
//     updatedTools.splice(index, 1)
//     setTools(updatedTools)
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-1 container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">Bug Flow</h1>

//         <div className="grid gap-6">
//           {/* URL Search Bar */}
//           <Card>
//             <CardHeader>
//               <CardTitle>URL Configuration</CardTitle>
//               <CardDescription>Enter the URL you want to analyze</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4">
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <Input
//                     placeholder="Enter URL"
//                     value={url}
//                     onChange={(e) => setUrl(e.target.value)}
//                     className="flex-1"
//                   />
//                   <Select value={selectedOption} onValueChange={setSelectedOption}>
//                     <SelectTrigger className="w-full sm:w-[200px]">
//                       <SelectValue placeholder="Select option" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="option1">Option 1</SelectItem>
//                       <SelectItem value="option2">Option 2</SelectItem>
//                       <SelectItem value="option3">Option 3</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Tool Configuration */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Add New Tool</CardTitle>
//               <CardDescription>Configure and add tools to your workflow</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label htmlFor="toolName" className="text-sm font-medium">
//                       Tool Name
//                     </label>
//                     <Input
//                       id="toolName"
//                       placeholder="Enter tool name"
//                       value={toolName}
//                       onChange={(e) => setToolName(e.target.value)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label htmlFor="toolCategory" className="text-sm font-medium">
//                       Category
//                     </label>
//                     <Select value={toolCategory} onValueChange={setToolCategory}>
//                       <SelectTrigger id="toolCategory">
//                         <SelectValue placeholder="Select category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="default">Default</SelectItem>
//                         <SelectItem value="scanner">Scanner</SelectItem>
//                         <SelectItem value="analyzer">Analyzer</SelectItem>
//                         <SelectItem value="utility">Utility</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label htmlFor="toolCommand" className="text-sm font-medium">
//                     Command
//                   </label>
//                   <Input
//                     id="toolCommand"
//                     placeholder="Enter command (e.g., curl -X GET {url})"
//                     value={toolCommand}
//                     onChange={(e) => setToolCommand(e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label htmlFor="toolDescription" className="text-sm font-medium">
//                     Description (Optional)
//                   </label>
//                   <Input
//                     id="toolDescription"
//                     placeholder="Brief description of what this tool does"
//                     value={toolDescription}
//                     onChange={(e) => setToolDescription(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex justify-end">
//                   <Button onClick={handleAddTool} disabled={!toolName || !toolCommand}>
//                     <Plus className="mr-2 h-4 w-4" /> Add Tool
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Added Tools Grid */}
//           {tools.length > 0 && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Tool Configuration</CardTitle>
//                 <CardDescription>Your configured tools and commands</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {tools.map((tool, index) => (
//                     <Card key={index} className="border shadow-sm">
//                       <CardHeader className="pb-2">
//                         <CardTitle className="text-lg">{tool.name}</CardTitle>
//                         <CardDescription className="line-clamp-1">{tool.command}</CardDescription>
//                       </CardHeader>
//                       <CardContent className="pb-2">
//                         <div className="flex items-center gap-2 text-sm">
//                           <div className="h-2 w-2 rounded-full bg-green-500"></div>
//                           <span>Active</span>
//                         </div>
//                       </CardContent>
//                       <CardFooter className="flex justify-between pt-2">
//                         <Button variant="outline" size="sm" onClick={() => handleRemoveTool(index)}>
//                           <Trash2 className="h-4 w-4 mr-1" /> Remove
//                         </Button>
//                         <Button size="sm" onClick={() => alert(`Executing: ${tool.command}`)}>
//                           Execute
//                         </Button>
//                       </CardFooter>
//                     </Card>
//                   ))}
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <p className="text-sm text-muted-foreground">Total tools: {tools.length}</p>
//                 <Button variant="outline" onClick={() => setTools([])} disabled={tools.length === 0}>
//                   Clear All
//                 </Button>
//               </CardFooter>
//             </Card>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, Play, Settings, Save } from 'lucide-react'

export default function BugFlowPage() {
  const [url, setUrl] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const [tools, setTools] = useState<{ 
    name: string; 
    command: string; 
    description: string;
    category: string;
  }[]>([])
  const [toolName, setToolName] = useState("")
  const [toolCommand, setToolCommand] = useState("")
  const [toolDescription, setToolDescription] = useState("")
  const [toolCategory, setToolCategory] = useState("default")

  const handleAddTool = () => {
    if (toolName && toolCommand) {
      setTools([...tools, { 
        name: toolName, 
        command: toolCommand,
        description: toolDescription || "No description provided",
        category: toolCategory
      }])
      setToolName("")
      setToolCommand("")
      setToolDescription("")
    }
  }

  const handleRemoveTool = (index: number) => {
    const updatedTools = [...tools]
    updatedTools.splice(index, 1)
    setTools(updatedTools)
  }

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'scanner': return 'bg-blue-500';
      case 'analyzer': return 'bg-purple-500';
      case 'utility': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Bug Flow</h1>
          <Button variant="outline" size="sm" asChild>
            <a href="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </a>
          </Button>
        </div>

        <div className="grid gap-6">
          {/* URL Search Bar */}
          <Card className="overflow-hidden border-2 border-border shadow-md transition-all hover:shadow-lg">
            <CardHeader className="bg-muted/50">
              <CardTitle>URL Configuration</CardTitle>
              <CardDescription>Enter the URL you want to analyze</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 h-11 border-2 focus-visible:ring-2"
                  />
                  <Select value={selectedOption} onValueChange={setSelectedOption}>
                    <SelectTrigger className="w-full sm:w-[200px] h-11 border-2">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">HTTP</SelectItem>
                      <SelectItem value="option2">HTTPS</SelectItem>
                      <SelectItem value="option3">FTP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tool Configuration */}
          <Card className="overflow-hidden border-2 border-border shadow-md transition-all hover:shadow-lg">
            <CardHeader className="bg-muted/50">
              <CardTitle>Add New Tool</CardTitle>
              <CardDescription>Configure and add tools to your workflow</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="toolName" className="text-sm font-medium">Tool Name</label>
                    <Input
                      id="toolName"
                      placeholder="Enter tool name"
                      value={toolName}
                      onChange={(e) => setToolName(e.target.value)}
                      className="border-2 focus-visible:ring-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="toolCategory" className="text-sm font-medium">Category</label>
                    <Select value={toolCategory} onValueChange={setToolCategory}>
                      <SelectTrigger id="toolCategory" className="border-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="scanner">Scanner</SelectItem>
                        <SelectItem value="analyzer">Analyzer</SelectItem>
                        <SelectItem value="utility">Utility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="toolCommand" className="text-sm font-medium">Command</label>
                  <Input
                    id="toolCommand"
                    placeholder="Enter command (e.g., curl -X GET {url})"
                    value={toolCommand}
                    onChange={(e) => setToolCommand(e.target.value)}
                    className="border-2 focus-visible:ring-2"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="toolDescription" className="text-sm font-medium">Description (Optional)</label>
                  <Input
                    id="toolDescription"
                    placeholder="Brief description of what this tool does"
                    value={toolDescription}
                    onChange={(e) => setToolDescription(e.target.value)}
                    className="border-2 focus-visible:ring-2"
                  />
                </div>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddTool} 
                    disabled={!toolName || !toolCommand}
                    className="transition-all hover:scale-105"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Tool
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Added Tools Grid */}
          {tools.length > 0 && (
            <Card className="overflow-hidden border-2 border-border shadow-md transition-all hover:shadow-lg">
              <CardHeader className="bg-muted/50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Tool Configuration</CardTitle>
                    <CardDescription>Your configured tools and commands</CardDescription>
                  </div>
                  <Button 
                    variant="default" 
                    size="sm"
                    className="transition-all hover:scale-105"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map((tool, index) => (
                    <Card key={index} className="border-2 shadow-sm hover:shadow-md transition-all hover:border-primary/50">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <Badge className={`${getCategoryColor(tool.category)} text-white`}>
                            {tool.category}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-1 mt-1">{tool.command}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                        <div className="flex items-center gap-2 text-sm mt-2">
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span>Ready to execute</span>
                        </div>
                      </CardContent>
                      <Separator />
                      <CardFooter className="flex justify-between pt-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleRemoveTool(index)}
                          className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => alert(`Executing: ${tool.command}`)}
                          className="transition-all hover:scale-105"
                        >
                          <Play className="h-4 w-4 mr-1" /> Execute
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-6 bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  Total tools: {tools.length}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setTools([])}
                  disabled={tools.length === 0}
                  className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  Clear All
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

