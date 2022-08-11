import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { Button, ConnectButton, Form, useNotification } from "web3uikit";
import { encryptData } from "../utils/keyGenerator";
import Header from "../components/Header";
import contractAbi from "../constants/contractAbi.json";
import networkMapping from "../constants/networkMapping.json";
export default function addRecords() {
  const { isWeb3Enabled, chainId, account } = useMoralis();
  let chainString = chainId ? parseInt(chainId).toString() : "31337";
  if (chainString == "1337") {
    chainString = "31337";
  }
  const contractAddress = networkMapping[chainString]["SafeMeeting"][0];
  const dispatch = useNotification();
  let file;
  const Router = useRouter();
  let members = [];
  let roles = [];
  let role = "";
  let member = "";
  const company = Router.query;
  let ref1 = useRef(null);
  let ref2 = useRef(null);
  const { runContractFunction: storeContent } = useWeb3Contract();
  function pinningSuccess() {
    dispatch({
      type: "success",
      message: "Successfully Pinned to IPFS",
      position: "topR",
      title: "Data Pinned",
    });
  }
  function databaseUpdated() {
    dispatch({
      type: "success",
      message: "Successfully Added to Database",
      position: "topR",
      title: "Database Updated",
    });
  }
  async function walletAdded(tx) {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "Wallet subscribed successfully",
      position: "topR",
      title: "Wallet Connected",
    });
  }
  async function chainUpdated(tx) {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "Blockchain Updated Successfully",
      position: "topR",
      title: "Chain Updated",
    });
    Router.push({ pathname: "/contents", query: company });
  }
  const { runContractFunction: addAddressToCompany } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: contractAddress,
    functionName: "addAddressToCompany",
    params: { walletAddress: account, companyID: company["_id"] },
  });

  async function updateWallet() {
    if (isWeb3Enabled) {
      await addAddressToCompany({
        onError: (error) => console.log(error),
        onSuccess: walletAdded,
      });
    }
  }
  useEffect(() => {
    if (isWeb3Enabled) updateWallet();
  }, [isWeb3Enabled]);
  async function handleFormSubmission(data) {
    const chairpersonName = data.data[0].inputResult;

    const dateOfMeeting = data.data[1].inputResult;

    const numberOfMembers = data.data[2].inputResult;

    const formData = new FormData();
    console.log("uploading...");
    formData.append("file", file);
    try {
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = resFile.data.IpfsHash;
      pinningSuccess();
      const formInput = {
        companyID: company["_id"],
        date: dateOfMeeting,
        memberCount: numberOfMembers,
        contentHash: ImgHash,
      };

      const response = await fetch("/api/uploadMeeting", {
        method: "POST",
        body: JSON.stringify(formInput),
        headers: {
          "content-Type": "application/json",
        },
      });
      databaseUpdated();
      const dataToSend = {
        hash: ImgHash,
      };

      const res = await fetch("/api/getContentId", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "content-Type": "application/json",
        },
      });
      const re = await res.json();
      const meetId = re["body"];
      await updateChain(
        company["_id"],
        meetId,
        encryptData(company["publicKey"], chairpersonName).toString("base64"),
        encryptData(company["publicKey"], formInput.date[0]).toString("base64"),
        numberOfMembers,
        encryptData(company["publicKey"], ImgHash).toString("base64"),
        members,
        roles
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function updateChain(
    companyID,
    meetingID,
    chairpersonName,
    timeStamp,
    numberOfMembers,
    contentHash,
    memberNames,
    roles
  ) {
    const options = {
      abi: contractAbi,
      contractAddress: contractAddress,
      functionName: "storeContent",
      params: {
        companyID: companyID,
        meetingID: meetingID,
        chairpersonName: chairpersonName,
        timestamp: timeStamp,
        numberOfMembers: numberOfMembers,
        contentHash: contentHash,
        memberNames: memberNames,
        roles: roles,
      },
    };
    await storeContent({
      params: options,
      onError: (err) => console.log(err),
      onSuccess: chainUpdated,
    });
  }

  return (
    <div>
      {isWeb3Enabled ? (
        <div>
          <Header />
          <div className="mt-8 ml-24">
            <div className="mt-8 ml-24 flex flex-row">
              <span className="p-2">Connect your wallet</span>
              <ConnectButton moralisAuth={false} />
            </div>
            <div className="mt-8 ml-24 flex flex-row">
              <span className="p-2">Add a member</span>
              <div className=" flex flex-col">
                <label className="ml-1">Member name: </label>
                <input
                  ref={ref1}
                  onChange={(event) => (member = event.target.value)}
                  title="MemberName"
                  className="bg-gray-100 rounded-md h-8 border-none"
                />
              </div>
              <div className=" ml-4 mr-4 flex flex-col">
                <label className="ml-1">Member role: </label>
                <input
                  ref={ref2}
                  onChange={(event) => (role = event.target.value)}
                  title="MemberRole"
                  className="bg-gray-100  h-8 border-none"
                />
              </div>
              <Button
                text="Add"
                onClick={() => {
                  members.push(member);
                  roles.push(role);
                  member = role = "";
                  ref1.current.value = "";
                  ref2.current.value = "";
                }}
              />
            </div>
            <div>
              <input
                type="file"
                onChange={(event) => (file = event.target.files[0])}
              />
            </div>
            <Form
              title="Add a Record"
              onSubmit={handleFormSubmission}
              data={[
                {
                  name: "Chairperson Name",
                  type: "text",
                  inputWidth: "100%",
                  value: "",
                  key: "chairperson",
                  validation: {
                    required: true,
                  },
                },
                {
                  name: "Date of Meeting",
                  type: "date",
                  inputWidth: "100%",
                  value: "",
                  key: "date",
                  validation: {
                    required: true,
                  },
                },
                {
                  name: "Number of Members",
                  type: "number",
                  inputWidth: "100%",
                  value: "",
                  key: "count",
                  validation: {
                    required: true,
                  },
                },
              ]}
            />
          </div>
        </div>
      ) : (
        <div>
          <Header />
          <div className="mt-8 ml-24">
            <div className="mt-8 ml-24 flex flex-row">
              <span className="p-2">Connect your wallet</span>
              <ConnectButton moralisAuth={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
