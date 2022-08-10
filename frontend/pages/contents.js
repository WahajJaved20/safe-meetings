import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
export default function content() {
  const Router = useRouter();
  const company = Router.query;
  function handleAddRecord() {
    Router.push({ pathname: "/addRecords", query: company });
  }
  function handleViewRecords() {
    Router.push({ pathname: "/viewRecords", query: company });
  }
  return (
    <div>
      <Header />
      <div className="flex flex-col px-20 py-4">
        <h2 className="p-5 font-bold text-3xl">
          Company Name: {company["name"]}
        </h2>
        <h2 className="p-5 font-bold text-xl">Company ID: {company["_id"]}</h2>
        <button
          onClick={handleAddRecord}
          className="border-2 px-44 border-spacing-3 border-blue-300 rounded-full text-xl py-2 inline-block font-semibold hover:bg-white hover:text-blue-500"
        >
          Add a Record
        </button>
        <button
          onClick={handleViewRecords}
          className="border-2 px-44 mt-8 border-spacing-3 border-blue-300 rounded-full text-xl py-2 inline-block font-semibold hover:bg-white hover:text-blue-500"
        >
          View all Records
        </button>
      </div>
    </div>
  );
}
