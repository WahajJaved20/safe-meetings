import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../utils/dbConnection";
export default async function getComapnies(req, res) {
  const { db } = await connectToDatabase();
  const id = req.body["id"];
  const userData = await db
    .collection("Auth")
    .find({ _id: ObjectId(id) })
    .toArray();
  let arrayOfCompanies = [];
  if (!userData[0]["isAdmin"]) {
    const accessibleCompanies = userData[0]["accessibleCompanies"];

    for (let i = 0; i < accessibleCompanies.length; i++) {
      arrayOfCompanies.push(
        await db
          .collection("Company")
          .find({ _id: ObjectId(accessibleCompanies[i]) })
          .toArray()
      );
    }
  } else {
    const accessibleCompanies = userData[0]["companyID"].toString();
    arrayOfCompanies.push(
      await db
        .collection("Company")
        .find({ _id: ObjectId(accessibleCompanies) })
        .toArray()
    );
  }

  res.status(201).json({
    message: "success",
    body: arrayOfCompanies,
  });
}
