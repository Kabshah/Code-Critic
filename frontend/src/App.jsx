import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import "highlight.js/styles/atom-one-dark.css"
import rehypeHighlight from "rehype-highlight"
import axios from "axios"

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("")
  useEffect(() => {
    prism.highlightAll();
  }, [])

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review/", { code })
    setReview(response.data)
  }
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result)
      }
      reader.readAsText(file);
    }
  }

  function Footer() {
    return (
      <footer className="w-full text-center py-4 mt-6 bg-gray-800 text-gray-400 text-sm rounded-lg shadow-lg">
        Made with ❤️ by Kabshah | © {new Date().getFullYear()} Code Critic🤖
      </footer>
    );
  }
  
  return (
    < div className='flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6'>
      <header className='w-full text-center py-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg rounded-lg'>Code Critic🤖</header>
      <div className='flex flex-row gap-6 w-full max-w-6xl'>
        <div className='w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto'>
          {/* File Upload Button */}
          <input type="file" accept='.js, .py, .java, .ts, .css, .html, .txt, .cpp, .json '
            onChange={handleFileUpload}
            className='mb-4 text-sm text-gray-400 rounded-lg cursor-pointer bg-gray-700 p-2' />
          {/* code editor */}
          <div className='border border-gray-600 rounded-lg p-4 bg-gray-900'>
            <Editor value={code} onValueChange={(code) => setCode(code)} highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}>
              padding = {10}
              style = {{ fontFamily: "Fire Code, monospace", fontsize: 16 }}
            </Editor>
          </div>
          <button onClick={reviewCode} className='w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl'>Review Code</button>
        </div>
        <div className='w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto'>
          <Markdown rehypePlugins={[rehypeHighlight]} >{review}</Markdown>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default App
