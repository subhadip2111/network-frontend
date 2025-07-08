import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const inputRefs = useRef([])

  const handleChange = (e, index) => {
    const value = e.target.value
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      z
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const enteredOtp = otp.join('')
    alert(`Verifying OTP: ${enteredOtp}`)
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 relative"
      >
        <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Please enter the 6-digit code sent to your email.
        </p>

        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-medium bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>


        <Link to={'/home'} className="bg-neutral-950 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative  ml-24  px-10 py-2  rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
          <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-1/2 -translate-x-1/2 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          Verify
        </Link>

        <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      </form>
    </div>
  )
}

export default VerifyOtp