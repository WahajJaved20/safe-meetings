import { connectToDatabase } from "./dbConnection";

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const data = await db.collection("Auth").find({}).toArray();
  const properties = JSON.parse(JSON.stringify(data));
  return {
    props: { properties: properties },
  };
}
