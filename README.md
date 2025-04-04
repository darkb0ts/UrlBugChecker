# README

Sure! Here's a focused `README.md` for your **Go backend using Wails only**, assuming you're using it to build native desktop apps **without a frontend framework like React/Vue** or you're treating frontend separately.

---

## 🐹 Wails Backend Only (Go)

This project is a **Go-based desktop GUI app** using [Wails](https://wails.io). Wails enables you to build cross-platform desktop apps using Go on the backend and optionally web technologies on the frontend.

---

## 📦 Prerequisites

Make sure you have:

- **Go** ≥ 1.20  
- **Wails CLI**  
- **Node.js** (for frontend builds, if needed)

### ✅ Install Wails CLI

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

Make sure your `$GOPATH/bin` is in your system `PATH`.

---

---

## 🚀 Run in Dev Mode

```bash
wails dev
```

This builds your app and launches it with hot-reload (if using a frontend).

---

## 🏗 Build Native App

```bash
wails build
```



## 🧰 Useful Commands

| Command        | Description                      |
|----------------|----------------------------------|
| `wails dev`    | Start dev mode with hot reload   |
| `wails build`  | Build production binary          |
| `wails generate bindings` | Regenerate frontend bindings (if used) |

---

