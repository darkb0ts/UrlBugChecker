import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save, Download, Upload, RefreshCw, AlertCircle } from "lucide-react"

export default function SettingsPage() {
  // Thread settings
  const [threadCount, setThreadCount] = useState(4)

  // Save settings
  const [autoSave, setAutoSave] = useState(true)
  const [saveInterval, setSaveInterval] = useState(5)
  const [saveLocation, setSaveLocation] = useState("local")

  // API settings
  const [apiKey, setApiKey] = useState("")
  const [apiEndpoint, setApiEndpoint] = useState("")
  const [apiTimeout, setApiTimeout] = useState(30)

  // Notification settings
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [notificationSound, setNotificationSound] = useState(true)

  const handleSaveSettings = () => {
    // Here you would save all settings
    alert("Settings saved successfully!")
  }

  const handleResetSettings = () => {
    // Reset to defaults
    setThreadCount(4)
    setAutoSave(true)
    setSaveInterval(5)
    setSaveLocation("local")
    setApiKey("")
    setApiEndpoint("")
    setApiTimeout(30)
    setEnableNotifications(true)
    setNotificationSound(true)
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetSettings}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="api">API Configuration</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="border-2 shadow-md">
              <CardHeader>
                <CardTitle>Save Options</CardTitle>
                <CardDescription>Configure how your work is saved</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSave">Auto Save</Label>
                    <p className="text-sm text-muted-foreground">Automatically save your work</p>
                  </div>
                  <Switch id="autoSave" checked={autoSave} onCheckedChange={setAutoSave} />
                </div>

                {autoSave && (
                  <div className="space-y-2">
                    <Label htmlFor="saveInterval">Save Interval (minutes)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="saveInterval"
                        value={[saveInterval]}
                        onValueChange={(value) => setSaveInterval(value[0])}
                        min={1}
                        max={30}
                        step={1}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{saveInterval}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="saveLocation">Save Location</Label>
                  <Select value={saveLocation} onValueChange={setSaveLocation}>
                    <SelectTrigger id="saveLocation" className="border-2">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="cloud">Cloud Storage</SelectItem>
                      <SelectItem value="custom">Custom Path</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {saveLocation === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="customPath">Custom Path</Label>
                    <Input id="customPath" placeholder="/path/to/save/location" className="border-2" />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Settings
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Settings
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 shadow-md">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableNotifications">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for important events</p>
                  </div>
                  <Switch
                    id="enableNotifications"
                    checked={enableNotifications}
                    onCheckedChange={setEnableNotifications}
                  />
                </div>

                {enableNotifications && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notificationSound">Notification Sound</Label>
                      <p className="text-sm text-muted-foreground">Play sound for notifications</p>
                    </div>
                    <Switch id="notificationSound" checked={notificationSound} onCheckedChange={setNotificationSound} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="border-2 shadow-md">
              <CardHeader>
                <CardTitle>Thread Configuration</CardTitle>
                <CardDescription>Configure the number of threads for processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="threadCount">Number of Threads</Label>
                    <span className="text-sm font-medium">{threadCount}</span>
                  </div>
                  <Slider
                    id="threadCount"
                    value={[threadCount]}
                    onValueChange={(value) => setThreadCount(value[0])}
                    min={1}
                    max={16}
                    step={1}
                  />
                  <p className="text-sm text-muted-foreground">
                    Higher thread count may improve performance but consume more resources.
                  </p>
                </div>

                <div className="rounded-md bg-amber-50 p-4 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Performance Notice</h3>
                      <div className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                        <p>
                          Setting thread count too high may cause system instability. We recommend a maximum of 8
                          threads for most systems.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-md">
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>Configure resource limits for the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="memoryLimit">Memory Limit (MB)</Label>
                  <Input id="memoryLimit" type="number" defaultValue={1024} className="border-2" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeoutLimit">Operation Timeout (seconds)</Label>
                  <Input id="timeoutLimit" type="number" defaultValue={60} className="border-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="priorityMode">High Priority Mode</Label>
                    <p className="text-sm text-muted-foreground">Run with higher system priority</p>
                  </div>
                  <Switch id="priorityMode" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card className="border-2 shadow-md">
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Configure API settings for external services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiEndpoint">API Endpoint</Label>
                  <Input
                    id="apiEndpoint"
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    placeholder="https://api.example.com/v1"
                    className="border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiTimeout">API Timeout (seconds)</Label>
                  <Slider
                    id="apiTimeout"
                    value={[apiTimeout]}
                    onValueChange={(value) => setApiTimeout(value[0])}
                    min={5}
                    max={120}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5s</span>
                    <span>{apiTimeout}s</span>
                    <span>120s</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="rateLimit">Respect Rate Limits</Label>
                    <p className="text-sm text-muted-foreground">Automatically handle API rate limiting</p>
                  </div>
                  <Switch id="rateLimit" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Test API Connection
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="border-2 shadow-md">
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Configure advanced application settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debugMode">Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed logging for troubleshooting</p>
                  </div>
                  <Switch id="debugMode" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="experimentalFeatures">Experimental Features</Label>
                    <p className="text-sm text-muted-foreground">Enable features still in development</p>
                  </div>
                  <Switch id="experimentalFeatures" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logLevel">Log Level</Label>
                  <Select defaultValue="info">
                    <SelectTrigger id="logLevel" className="border-2">
                      <SelectValue placeholder="Select log level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="trace">Trace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customFlags">Custom Flags</Label>
                  <Input id="customFlags" placeholder="--flag1 --flag2=value" className="border-2" />
                  <p className="text-xs text-muted-foreground">Advanced configuration flags. Use with caution.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="destructive">Reset All Settings</Button>
                <Button variant="outline">Export Debug Information</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

