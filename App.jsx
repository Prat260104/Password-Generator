import { useState, useEffect, useCallback, useRef } from 'react'

// useState: React ka hook jo data ko store aur update karta hai (UI automatic update hoti hai)
function App() {
  const [length, setlength] = useState(8) // password ka length
  const [number, setnumber] = useState(false) // number include karna hai ya nahi
  const [character, setcharacter] = useState(false) // special character include karna hai ya nahi
  const [password, setpass] = useState("") // final generated password

  // useRef: Kisi DOM element ka direct reference lene ke liye (yahan input box ko access karna hai)
  const passref = useRef(null)

  // useCallback: Function ko memory me cache karta hai (optimize karta hai unnecessary re-renders se)
  const passgen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" // base string for password

    // Agar user number include karna chahta hai to
    if (number) {
      str += "0123456789"
    }

    // Agar user special characters include karna chahta hai to
    if (character) {
      str += "!@#$%^&*()_+:|?><{:"
    }

    // Password generate karna randomly
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length) // Random index generate
      pass += str.charAt(char) // Random character add karna
    }

    setpass(pass) // Generated password ko state me store karna

  }, [length, number, character, setpass]) // Dependency array: jab inme se koi change hoga tabhi function recreate hoga

  // Password copy karne ka function
  const copypass = useCallback(() => {
    passref.current?.select() // Input field ke text ko select karo
    window.navigator.clipboard.writeText(password) // Password ko user's clipboard me copy kar do
  }, [password]) // Jab password change hoga tabhi function update hoga

  // useEffect: Render hone ke baad side effects handle karta hai (yahan password auto-generate ho raha hai)
  useEffect(() => {
    passgen() // page load hote hi aur jab dependency change hoti hai tab password generate hota hai
  }, [length, number, character, passgen])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>

        {/* Password display field + Copy button */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly // readOnly: user input box me typing na kar sake
            ref={passref} // input field ka reference pass kar rahe hain
          />
          <button
            onClick={copypass} // copy button click pe copypass function chalega
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            Copy
          </button>
        </div>

        {/* Settings options: Length, Numbers, Characters */}
        <div className='flex text-sm gap-x-2'>

          {/* Password Length Selector (Slider) */}
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }} // Slider change hone par length update karna
            />
            <label>Length: {length}</label>
          </div>

          {/* Numbers Include Checkbox */}
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={number} // Initially checkbox ka state (default)
              id="numberinput"
              onChange={() => {
                setnumber((prev) => !prev) // checkbox toggle karega number include ya exclude
              }}
            />
            <label htmlFor="numberinput">Numbers</label>
          </div>

          {/* Characters Include Checkbox */}
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={character} // Initially checkbox ka state (default)
              id="characterinput"
              onChange={() => {
                setcharacter((prev) => !prev) // checkbox toggle karega special characters include ya exclude
              }}
            />
            <label htmlFor="characterinput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
