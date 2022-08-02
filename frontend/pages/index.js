import SignUp from "../components/signupUI";
import SignIn from "../components/signinUI";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <SignIn />
          <SignUp />
        </div>
      </main>
    </div>
  );
}
