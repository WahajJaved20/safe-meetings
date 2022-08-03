import { useRouter } from "next/router";
import { Card } from "web3uikit";

export default function CompanyBox({ company }) {
  const Router = useRouter();
  const comp = company[0];
  async function handleCardClick() {
    localStorage.setItem("toAccess", comp["_id"]);
    Router.push("/contents");
  }
  return (
    <div className="w-72 p-2">
      <Card
        key={comp["_id"]}
        title={`Name: ${comp["name"]}`}
        onClick={handleCardClick}
      >
        <div className="flex flex-col gap-4 mb-5">
          <div>ID: {comp["_id"]}</div>
        </div>
      </Card>
    </div>
  );
}
