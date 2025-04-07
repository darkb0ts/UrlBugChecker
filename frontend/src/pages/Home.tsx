import URLTable from "../components/URLTable"; 


function Home(){
    return (
    <main className="w-screen h-screen overflow-hidden bg-background">
    <div className="w-full max-w-6xl mx-auto">
      <URLTable />
    </div>
  </main>
    )
}

export default Home;