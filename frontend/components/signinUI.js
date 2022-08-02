import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
export default function SignIn() {
  return (
    <div className="w-3/5 p-5">
      <div className="text-left font-bold text-2xl">
        <span className="text-blue-800">Erly</span>Studios
      </div>
      <div className="py-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-1 mt-5">
          Sign in to your account
        </h2>
        <div className="border-4 w-10 border-blue-800 inline-block mb-2" />
        <div className="flex flex-col items-center mb-3">
          <div className="bg-gray-100 w-64 p-2 mb-3 flex items-center">
            <FaRegEnvelope className="text-gray-400 m-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-gray-100 outline-none text-sm flex-1"
            />
          </div>
          <div className="bg-gray-100 w-64 p-2 flex items-center">
            <MdLockOutline className="text-gray-400 m-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-gray-100 outline-none text-sm flex-1"
            />
          </div>
          <div className="flex justify-between w-64 mb-5 mt-5">
            <label className="flex items-center text-xs">
              <input type="checkbox" name="remember" className="mr-1" />
              Remember me
            </label>
            <a href="#" className="text-xs">
              Forgot Password
            </a>
          </div>
          <a
            href="#"
            className="border-2 border-blue-800 rounded-full text-blue-800 px-12 py-2 inline-block font-semibold hover:bg-blue-800 hover:text-white"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
