import { useCallback, useEffect, useRef, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(6)
  const [numAllowed, setNumAllowed] = useState(false)
  const [spCharAllowed, setSpCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let spChar = "!@#$%^&*()_+{}|:'<>?[]~`";
  
    if (numAllowed) {
      string += numbers;
    }
    if (spCharAllowed) {
      string += spChar;
    }
  
    for (let i = 0; i < length; i++) {
      password += string.charAt(Math.floor(Math.random() * string.length));
    }
  
    console.log(password);
    setPassword(password);
  }, [length, numAllowed, spCharAllowed ,setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current.select();
    setTimeout(() => {alert("Copied to clipboard");
    }, 500);
    const audio = new Audio("/sound.mp3");
    audio.play();
    navigator.clipboard.writeText(password);
  }, [password]);

  const passwordRef = useRef(null);
  
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, spCharAllowed, setPassword]);


  return (
    <div className="App h-screen bg-stone-950 w-full" style={{backgroundImage: "url(/flowers.svg)", backgroundRepeat: "space", backgroundSize: "100px", backgroundPosition: "center"}}>
      <div className='w-1/2 flex-col flex justify-center content-around items-center m-auto' ><div className='m-[10%]'>
        <img src={viteLogo} className="logo mx-auto w-[200px] shadow-white" alt="Vite logo" />
      </div>
        <h1 className='text-yellow-400 pb-10 text-5xl'>X Password Generator</h1>
        <div className="card w-2/3 mx-auto h-14 text-xl ring-2 mb-5 ring-black bg-stone-400/80 flex justify-between items-center  rounded-3xl overflow-hidden">
          <input type='text' className='w-full h-full bg-stone-400/80 pl-4 text-black' value={password} readOnly ref={passwordRef} />
          <button className='h-full px-4 bg-blue-400 hover:bg-blue-500' onClick={copyPassword}>
            Copy</button>
        </div>
        <div className='fixed bottom-24 w-1/2 bg-blue-400/50 mx-auto h-14 flex justify-around items-center rounded-3xl'>
          <div className='flex justify-around items-center gap-2 text-black'>
            <input
              type="range"
              className="cursor-pointer h-10 bg-yellow-400/80 p-4 rounded-3xl text-white self-center"
              min="6"
              max="25"
              value={length}
              step="1"

              onChange={(e) => setLength(e.target.value)}
            />
            <label className='text-white'>Length : {length}</label></div>
          <div className='flex justify-around items-center gap-2'>
            <input type='checkbox' className='cursor-pointer h-10 bg-yellow-400/80 p-4 rounded-3xl text-white' onChange={(e) => setNumAllowed((prev) => !(prev))}/>
            <label className='text-white'>Numbers</label></div>

          <div className='flex justify-around items-center gap-2'>
            <input type='checkbox' className='cursor-pointer h-10 bg-yellow-400/80 p-4 rounded-3xl text-white' onChange={(e) => setSpCharAllowed((prev) => !(prev))} />
            <label className='text-white'>Characters</label>
          </div>



        </div>
        <p className="read-the-docs fixed bottom-5 mx-auto text-red-600/50">
          Created with 💖 by Skand
        </p>
      </div></div>
  )
}


export default App
