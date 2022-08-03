import { connectToDatabase } from "../../utils/dbConnection";
export default async function addUser(req, res) {
  const { db } = await connectToDatabase();
  const collection = await db.collection("Auth");
  const companyCollection = await db.collection("Company").find({}).toArray();
  let exists = false;
  for (let i = 0; i < companyCollection.length; i++) {
    if (
      companyCollection[i]["_id"].toString() == req.body["companyID"].toString()
    ) {
      exists = true;
      break;
    }
  }
  if (exists) {
    req.body["accessibleCompanies"] = [];
    req.body["accessibleCompanies"].push(req.body["companyID"]);
    delete req.body["companyID"];
    const result = await collection.insertOne(req.body);
    res.status(201).json({
      message: "success",
    });
  } else {
    res.status(201).json({
      message: "failure",
    });
  }
}
