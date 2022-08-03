import SignUp from "../components/signupUI";
import SignIn from "../components/signinUI";
import { connectToDatabase } from "../utils/dbConnection";
export default function Home({ properties }) {
  console.log(properties);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <SignIn properties={properties} />
          <SignUp />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const data = await db.collection("Auth").find({}).toArray();
  const properties = JSON.parse(JSON.stringify(data));
  return {
    props: { properties: properties },
  };
}
