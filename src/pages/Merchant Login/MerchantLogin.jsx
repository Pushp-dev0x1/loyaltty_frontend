// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Mail, Phone, Key, ToggleLeft, ToggleRight } from 'lucide-react';

// // Fake credentials for demonstration
// const FAKE_CREDENTIALS = [
//   { email: 'user@example.com', phone: '1234567890', otp: '123456' }
// ];

// const MerchantLogin = () => {
//   const [loginMethod, setLoginMethod] = useState('phone');
//   const [identifier, setIdentifier] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);  // New state to track if OTP is sent
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSendOtp = (e) => {
//     e.preventDefault();
//     const user = FAKE_CREDENTIALS.find(cred =>
//       loginMethod === 'email' ? cred.email === identifier : cred.phone === identifier
//     );

//     if (user) {
//       setOtpSent(true); // OTP has been sent, show the OTP field
//       setError('');
//     } else {
//       setError('Invalid email or phone number. Please try again.');
//     }
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const user = FAKE_CREDENTIALS.find(cred =>
//       (loginMethod === 'email' ? cred.email === identifier : cred.phone === identifier) &&
//       cred.otp === otp
//     );

//     if (user) {
//       navigate('/select-templates');
//     } else {
//       setError('Invalid OTP. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#040869] bg-opacity-10 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-[#040869]">Merchant Login</h2>
//         <form onSubmit={otpSent ? handleLogin : handleSendOtp}>
//           <div className="mb-4 relative">
//             <label htmlFor="identifier" className="block text-sm font-medium text-[#040869] mb-1">
//               {loginMethod === 'email' ? 'Email' : 'Phone'}
//             </label>
//             <div className="relative">
//               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#040869]">
//                 {loginMethod === 'email' ? <Mail size={18} /> : <Phone size={18} />}
//               </span>
//               <input
//                 id="identifier"
//                 type={loginMethod === 'email' ? 'email' : 'tel'}
//                 placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
//                 value={identifier}
//                 onChange={(e) => setIdentifier(e.target.value)}
//                 required
//                 className="pl-10 w-full px-3 py-2 border border-[#040869] rounded-md focus:outline-none focus:ring-2 focus:ring-[#040869]"
//               />
//             </div>
//           </div>

//           {otpSent && (
//             <div className="mb-4 relative">
//               <label htmlFor="otp" className="block text-sm font-medium text-[#040869] mb-1">OTP</label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#040869]">
//                   <Key size={18} />
//                 </span>
//                 <input
//                   id="otp"
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   required
//                   className="pl-10 w-full px-3 py-2 border border-[#040869] rounded-md focus:outline-none focus:ring-2 focus:ring-[#040869]"
//                 />
//               </div>
//             </div>
//           )}

//           <div className="flex items-center justify-between mb-6">
//             <span className="text-sm font-medium text-[#040869]">Use Email</span>
//             <button
//               type="button"
//               onClick={() => setLoginMethod(prev => prev === 'phone' ? 'email' : 'phone')}
//               className="focus:outline-none"
//               disabled={otpSent}  // Disable toggle after OTP is sent
//             >
//               {loginMethod === 'phone' ? <ToggleRight size={24} className="text-[#040869]" /> : <ToggleLeft size={24} className="text-[#040869]" />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#040869] text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#040869] focus:ring-offset-2"
//           >
//             {otpSent ? 'Login' : 'Send OTP'}
//           </button>
//         </form>

//         {error && (
//           <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
//         <div className="mt-4 text-sm text-[#040869]">
//           <h3 className="font-semibold">Demo Credentials:</h3>
//           <ul className="list-disc pl-5">
//             {FAKE_CREDENTIALS.map((cred, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg p-3 mb-3 shadow-sm">
//                 <div className="grid grid-cols-2 gap-2">
               
//                   <div>
//                     <p className="text-xs text-gray-500">Phone</p>
//                     <p className="font-medium">{cred.phone}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">OTP</p>
//                     <p className="font-medium">{cred.otp}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Email</p>
//                     <p className="font-medium">{cred.email}</p>
//                   </div>
                 
//                 </div>
//               </div>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MerchantLogin;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Key, Lock, ToggleLeft, ToggleRight } from 'lucide-react';

// Fake credentials for demonstration
const FAKE_CREDENTIALS = [
  { email: 'user@example.com', phone: '1234567890', otp: '123456', password: 'password123' }
];

const MerchantLogin = () => {
  const [authMethod, setAuthMethod] = useState('otp'); // Toggle between OTP and password
  const [identifier, setIdentifier] = useState('');
  const [otpOrPassword, setOtpOrPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    const user = FAKE_CREDENTIALS.find(
      (cred) => cred.email === identifier || cred.phone === identifier
    );

    if (user) {
      setOtpSent(true);
      setError('');
    } else {
      setError('Invalid email or phone number. Please try again.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = FAKE_CREDENTIALS.find(
      (cred) =>
        (cred.email === identifier || cred.phone === identifier) &&
        (authMethod === 'otp' ? cred.otp === otpOrPassword : cred.password === otpOrPassword)
    );

    if (user) {
      navigate('/select-templates');
    } else {
      setError(authMethod === 'otp' ? 'Invalid OTP. Please try again.' : 'Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#040869] bg-opacity-10 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#040869]">Merchant Login</h2>
        <form onSubmit={otpSent || authMethod === 'password' ? handleLogin : handleSendOtp}>
          <div className="mb-4 relative">
            <label htmlFor="identifier" className="block text-sm font-medium text-[#040869] mb-1">Email or Phone</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#040869]">
                <Mail size={18} />
              </span>
              <input
                id="identifier"
                type="text"
                placeholder="Enter your email or phone"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="pl-10 w-full px-3 py-2 border border-[#040869] rounded-md focus:outline-none focus:ring-2 focus:ring-[#040869]"
              />
            </div>
          </div>

          {authMethod === 'otp' && otpSent && (
            <div className="mb-4 relative">
              <label htmlFor="otp" className="block text-sm font-medium text-[#040869] mb-1">OTP</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#040869]">
                  <Key size={18} />
                </span>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otpOrPassword}
                  onChange={(e) => setOtpOrPassword(e.target.value)}
                  required
                  className="pl-10 w-full px-3 py-2 border border-[#040869] rounded-md focus:outline-none focus:ring-2 focus:ring-[#040869]"
                />
              </div>
            </div>
          )}

          {authMethod === 'password' && (
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-[#040869] mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#040869]">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={otpOrPassword}
                  onChange={(e) => setOtpOrPassword(e.target.value)}
                  required
                  className="pl-10 w-full px-3 py-2 border border-[#040869] rounded-md focus:outline-none focus:ring-2 focus:ring-[#040869]"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-[#040869]">Use {authMethod === 'otp' ? 'Password' : 'OTP'}</span>
            <button
              type="button"
              onClick={() => setAuthMethod((prev) => (prev === 'otp' ? 'password' : 'otp'))}
              className="focus:outline-none"
            >
              {authMethod === 'otp' ? (
                <ToggleRight size={24} className="text-[#040869]" />
              ) : (
                <ToggleLeft size={24} className="text-[#040869]" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#040869] text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#040869] focus:ring-offset-2"
          >
            {authMethod === 'otp' && !otpSent ? 'Send OTP' : 'Login'}
          </button>
        </form>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
                 <div className="mt-4 text-sm text-[#040869]">
           <h3 className="font-semibold">Demo Credentials:</h3>
           <ul className="list-disc pl-5">
             {FAKE_CREDENTIALS.map((cred, index) => (
               <div key={index} className="bg-gray-50 rounded-lg p-3 mb-3 shadow-sm">
                 <div className="grid grid-cols-2 gap-2">
               
                   <div>
                     <p className="text-xs text-gray-500">Phone</p>
                     <p className="font-medium">{cred.phone}</p>
                   </div>
                   <div>
                     <p className="text-xs text-gray-500">OTP</p>
                     <p className="font-medium">{cred.otp}</p>
                   </div>
                   <div>
                     <p className="text-xs text-gray-500">Email</p>
                     <p className="font-medium">{cred.email}</p>
                   </div>
                   <div>
                     <p className="text-xs text-gray-500">Password</p>
                     <p className="font-medium">{cred.password}</p>
                   </div>
                 
                 </div>
               </div>
             ))}
           </ul>
         </div>
      </div>
    </div>
  );
};

export default MerchantLogin;