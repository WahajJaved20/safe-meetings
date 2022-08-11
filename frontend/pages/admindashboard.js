import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CompanyBox from "../components/companyBox";
import Header from "../components/Header";
export default function userDashboard() {
  const Router = useRouter();
  const id = Router.query["_id"];
  let [listOfCompanies, setList] = useState([]);
  async function getCompanyData() {
    const formInput = { id: id };
    const response = await fetch("/api/getCompanies", {
      method: "POST",
      body: JSON.stringify(formInput),
      headers: {
        "content-Type": "application/json",
      },
    });
    const result = await response.json();
    await setList(result["body"]);
  }
  let windows = typeof window;

  useEffect(() => {
    if (!listOfCompanies.length) getCompanyData();
  }, [windows, listOfCompanies]);
  return (
    <div>
      <Header />
      {listOfCompanies ? (
        <div className="ml-12 mt-4">
          {listOfCompanies.map((company) => {
            return (
              <div key={company["_id"]}>
                <CompanyBox company={company} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
