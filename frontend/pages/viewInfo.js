import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import contractAbi from "../constants/contractAbi.json";
import networkMapping from "../constants/networkMapping.json";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { ConnectButton } from "web3uikit";
import { decryptData } from "../utils/keyGenerator";
export default function viewInfo() {
  let [onData, setOnData] = useState("");
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [url, setUrl] = useState("");
  const { isWeb3Enabled, chainId } = useMoralis();
  let chainString = chainId ? parseInt(chainId).toString() : "31337";
  if (chainString == "1337") {
    chainString = "31337";
  }
  const contractAddress = networkMapping[chainString]["SafeMeeting"][0];
  const Router = useRouter();
  const data = Router.query["record"];
  const privateKey = Router.query["company"]["privateKey"];
  useEffect(() => {
    async function getChainData() {
      const data = await getMeetingData();
      await setOnData(data);
      setDataRetrieved(true);
    }
    if (isWeb3Enabled && !dataRetrieved) {
      console.log("retrieving");
      getChainData();
    }
    if (!isWeb3Enabled) {
      setDataRetrieved(false);
    }
    if (onData) {
      setMemberCount(onData["numberOfMembers"].toString());
      const hash = decryptData(privateKey, onData["contentHash"]);
      setUrl(`https://gateway.pinata.cloud/ipfs/${hash}`);
    }
  }, [isWeb3Enabled, dataRetrieved]);
  const { runContractFunction: getMeetingData } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: contractAddress,
    functionName: "getMeetingData",
    params: { companyID: data["companyID"], meetingID: data["_id"] },
  });
  return (
    <div>
      <Header />
      <div className="px-20 mb-4">
        <ConnectButton />
      </div>
      {isWeb3Enabled ? (
        <div className="ml-20">
          <div>
            Chairperson Name:{" "}
            {decryptData(privateKey, onData["chairpersonName"])}
          </div>
          <div>Timestamp: {decryptData(privateKey, onData["timestamp"])}</div>
          <div>Number Of Members: {memberCount}</div>
          {onData ? (
            onData["memberToRoles"].map((struct) => {
              return (
                <div key={struct["memberName"]}>
                  name : {struct["memberName"]} Role : {struct["memberRole"]}
                </div>
              );
            })
          ) : (
            <div></div>
          )}
          <div>
            <a href={url} target="_blank">
              Click to access the PDF
            </a>
          </div>
        </div>
      ) : (
        <div className="px-20">Please connect your wallet</div>
      )}

      <div></div>
    </div>
  );
}
