
function App() {
  const test =  import.meta.env.VITE_SOME_KEY
  console.log(test);   
  return (
    <div>
      App Page
    </div>
    )
}

export default App
