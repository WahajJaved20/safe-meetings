import { connectToDatabase } from "../../utils/dbConnection";
export default async function addUser(req, res) {
  const { db } = await connectToDatabase();
  const collection = await db.collection("Database");
  const result = await collection.insertOne(req.body);
  res.status(201).json({
    message: "success",
  });
}
