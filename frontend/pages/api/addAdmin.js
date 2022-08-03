import { connectToDatabase } from "../../utils/dbConnection";
export default async function addAdmin(req, res) {
  const { db } = await connectToDatabase();

  const companyCollection = await db.collection("Company").find({}).toArray();
  const companyName = req.body["companyName"].toString();
  let exists = false;
  for (let i = 0; i < companyCollection.length; i++) {
    if (companyCollection[i]["name"].toString() == companyName) {
      exists = true;
      break;
    }
  }
  if (!exists) {
    const coll = await db.collection("Company");
    const company = await coll.insertOne({ name: req.body["companyName"] });
  }
  const newCompanyCollection = await db
    .collection("Company")
    .find({})
    .toArray();
  for (let i = 0; i < newCompanyCollection.length; i++) {
    if (newCompanyCollection[i]["name"].toString() == companyName) {
      req.body["companyID"] = newCompanyCollection[i]["_id"];
      break;
    }
  }

  const collection = await db.collection("Auth");
  const result = await collection.insertOne(req.body);
  res.status(201).json({
    message: "success",
  });
}
