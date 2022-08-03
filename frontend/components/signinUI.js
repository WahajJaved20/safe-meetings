import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useNotification } from "web3uikit";
export default function SignIn({ properties }) {
  const dispatch = useNotification();
  const Router = useRouter();
  let [isAdmin, setAdmin] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  async function handleSignIn() {
    let verify = false;
    for (let i = 0; i < properties.length; i++) {
      if (
        properties[i]["email"] == email.toString() &&
        properties[i]["password"] == password.toString() &&
        properties[i]["isAdmin"] == isAdmin
      ) {
        localStorage.setItem("id", properties[i]["_id"]);
        localStorage.setItem("admin", properties[i]["isAdmin"]);
        verify = true;
        break;
      }
    }
    if (verify) {
      Router.push(isAdmin ? "/admindashboard" : "/userdashboard");
    } else {
      dispatch({
        type: "error",
        message: "Wrong ID or Password",
        position: "topR",
        title: "Invalid Credentials",
      });
    }
  }
  function handleAdmin() {
    setAdmin(true);
  }
  function handleUser() {
    setAdmin(false);
  }

  useEffect(() => {}, [isAdmin]);
  return (
    <div className="w-3/5 p-5">
      <div className="text-left font-bold text-2xl">
        <span className="text-blue-800">Erly</span>Studios
      </div>
      <div className="py-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-1 mt-5">
          Sign in to your account
        </h2>
        {isAdmin ? (
          <div>
            <a href="#" onClick={handleUser} className="font-bold">
              <span>User</span>
            </a>
            <span className="ml-12 mr-12 text-gray-500">|</span>
            <span className="text-blue-800 font-bold">Admin</span>
          </div>
        ) : (
          <div>
            <span className="text-blue-800 font-bold">User</span>

            <span className="ml-12 mr-12 text-gray-500">|</span>
            <a href="#" onClick={handleAdmin}>
              <span className="font-bold">Admin</span>
            </a>
          </div>
        )}

        <div className="flex flex-col items-center mb-3">
          <div className="bg-gray-100 w-64 p-2 mb-3 flex items-center">
            <FaRegEnvelope className="text-gray-400 m-2" />
            <input
              onChange={() => setEmail(event.target.value)}
              type="email"
              name="email"
              placeholder="Email"
              className="bg-gray-100 outline-none text-sm flex-1"
            />
          </div>
          <div className="bg-gray-100 w-64 p-2 flex items-center">
            <MdLockOutline className="text-gray-400 m-2" />
            <input
              onChange={() => setPassword(event.target.value)}
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
          <button
            href="#"
            onClick={handleSignIn}
            className="border-2 border-blue-800 rounded-full text-blue-800 px-12 py-2 inline-block font-semibold hover:bg-blue-800 hover:text-white"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
