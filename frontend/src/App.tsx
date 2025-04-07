// import URLTable from "./components/URLTable"; // <- new component
// import { Navbar } from "@/components/navbar";

// function App() {
//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <Navbar />
//       <main className="container mx-auto py-6 px-4">
//         <div className="w-full max-w-6xl mx-auto">
//           <URLTable />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import Home from "./pages/Home"; // Create these pages
import BugFlow from "./pages/BugFlow";
import Setting from "./pages/Setting";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<BugFlow />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;