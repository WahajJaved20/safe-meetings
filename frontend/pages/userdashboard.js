import { useEffect, useState } from "react";
import CompanyBox from "../components/companyBox";
import Header from "../components/Header";
export default function userDashboard() {
  let [listOfCompanies, setList] = useState([]);
  async function getCompanyData(id) {
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
    if (!listOfCompanies.length) {
      if (windows !== "undefined") {
        const id = localStorage.getItem("id");
        getCompanyData(id);
      }
    }
  }, [windows, listOfCompanies]);
  return (
    <div>
      <Header />
      {listOfCompanies ? (
        <div className="ml-12 mt-4">
          {listOfCompanies.map((company) => CompanyBox({ company: company }))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
