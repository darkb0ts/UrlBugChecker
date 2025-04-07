// backend/main.go
package main

import (
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	// This import path may vary depending on your module name
)

var Assets embed.FS

func main() {
	// Initialize app
	app := NewApp()

	// Run the Wails app
	err := wails.Run(&options.App{
		Title:  "Bug Flow",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: Assets, // Use exported variable from app.go
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		log.Fatal("Error:", err)
	}
}
