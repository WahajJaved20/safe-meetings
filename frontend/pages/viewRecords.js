import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "web3uikit";
import Header from "../components/Header";
export default function viewRecords() {
  const Router = useRouter();
  const [records, setRecords] = useState([]);
  useEffect(() => {
    async function getRecords() {
      const id = Router.query["_id"];
      const formInput = { id: id };
      const response = await fetch("/api/getRecords", {
        method: "POST",
        body: JSON.stringify(formInput),
        headers: {
          "content-Type": "application/json",
        },
      });
      const result = await response.json();
      setRecords(result["body"]);
    }
    if (records.length == 0 && Router.query["_id"]) {
      getRecords();
    }
  }, [records]);
  return (
    <div>
      <Header />
      <div>
        <h2 className="p-5 font-bold text-3xl">
          Company Name: {Router.query["name"]}
        </h2>
      </div>
      {records.length == 0 ? (
        <div>Nothing to see here</div>
      ) : (
        <div className="flex flex-col">
          {records.map((record) => {
            return (
              <div
                className=" mb-5 px-20"
                key={record["_id"]}
                onClick={() => {
                  record["privateKey"] = Router.query["privateKey"];
                  Router.push({
                    pathname: "/viewInfo",
                    query: record,
                  });
                }}
              >
                <Card id={record["_id"]}>
                  <div>Meeting ID: {record["_id"]}</div>
                  <div>Meeting Date: {record["date"][0]}</div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
