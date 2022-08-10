import { connectToDatabase } from "../../utils/dbConnection";
export default async function getRecords(req, res) {
  const { db } = await connectToDatabase();
  const id = req.body["id"];
  const companies = await db
    .collection("Database")
    .find({ companyID: id.toString() })
    .toArray();
  res.status(201).json({
    message: "success",
    body: companies,
  });
}
