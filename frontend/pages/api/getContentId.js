import { connectToDatabase } from "../../utils/dbConnection";
export default async function getComapnies(req, res) {
  const { db } = await connectToDatabase();
  const hash = req.body["hash"];
  const userData = await db
    .collection("Database")
    .find({ contentHash: hash })
    .toArray();
  res.status(201).json({
    message: "success",
    body: userData[0]["_id"].toString(),
  });
}
