import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import { useRef } from 'react'

function App() {
  const passwordRef=useRef(null)
  const [length, setlength]=useState(8)
  const [Numberallowed, setNumber]=useState(false)
  const [Charallowed, setChar]=useState(false)
  const [password, setPassword]=useState("")

  const passwordgenerator=useCallback(()=>{
    let pass=""
    let string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (Numberallowed) string+="123456789"
    if (Charallowed) string+="! @#$%^&*()_+-={}[]|\:";
    for (let i=1; i<=length; i++)
    {
      let char=Math.floor(Math.random()*string.length+1)
      pass+=string.charAt(char)
    }
    setPassword(pass)
  }, [length, Numberallowed, Charallowed, ])

  useEffect(()=>{
    passwordgenerator()
  },[length, Numberallowed, Charallowed, passwordgenerator])
  
  const copypassword=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99)

    window.navigator.clipboard.writeText(password)

  },[password])

  return (
    <>
    <div className='w-screen max-w-md mx-auto py-3 shadow-md rounded-lg px-4 my-8  bg-gray-700 justify-start'>
    <h2 className='text-white text-3xl text-center my-3 py-2'>Password Generator</h2>
    <div className='flex shadow rounded-lg overflow-hidden mb-2'>

    <input type="text" value={password} 
       className='outline-none bg-amber-100 text-gray-700 w-full py-1 px-3' 
       placeholder='password' readOnly ref={passwordRef} />
      <button onClick={copypassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-opacity-50'>

  Copy
</button>


    </div>
    <div className='flex text-sm gap-x-2 text-amber-500 my-3.5'>
  <div className='flex items-center gap-x-1'>
  <input  onChange={(e)=>{setlength(e.target.value)}} type="range" value={length} min={6} max={100} className='cursor-pointer' /> 
  <label>Length:{length}</label>
  </div>

  <div className='flex items-center gap-x-1'>
  <input type="checkbox" defaultChecked={Numberallowed} id='numberInput' onChange={()=>{
    setNumber((prev)=> !prev)
  }}/> 
  <label>Numbers</label>
  </div>
  <div className='flex items-center gap-x-1'>
  <input type="checkbox" defaultChecked={Numberallowed} id='numberInput' onChange={()=>{
    setChar((prev)=> !prev)
  }}/> 
  <label>Characters</label>
  </div>

</div>
    </div>


    
      
    </>
  )
}

export default App
