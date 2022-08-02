const { assert, expect } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat-config");
developmentChains.includes(network.name)
  ? describe.skip
  : describe("Safe Meetings", () => {
      let deployer, player, safeMeeting;
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        const accounts = await ethers.getSigners();
        player = accounts[1];
        await deployments.fixture("all");
        safeMeeting = await ethers.getContract("SafeMeeting", deployer);
      });
      describe("Address to ComapnyID", () => {
        it("Subscribes the supplied wallet Address to the Comapny ID", async function () {
          const testID = "0";
          const transaction = await safeMeeting.addAddressToCompany(
            player.address,
            testID
          );
          await transaction.wait(1);
          const subscribedCompanyID = await safeMeeting.getCompanyIDFromWallet(
            player.address
          );
          assert.equal(subscribedCompanyID[0].toString(), testID);
        });
        it("Wallet Listed Event occured", async function () {
          const testID = "0";
          let subscribedCompanyID;
          await new Promise(async (resolve, reject) => {
            setTimeout(resolve, 300);
            safeMeeting.once("WalletListed", async function () {
              try {
                subscribedCompanyID = await safeMeeting.getCompanyIDFromWallet(
                  player.address
                );
                assert.equal(subscribedCompanyID[0].toString(), testID);
              } catch (e) {
                reject(e);
              }
            });
            const transaction = await safeMeeting.addAddressToCompany(
              player.address,
              testID
            );
            await transaction.wait(1);
          });
        });
      });
      describe("Testing Modifiers and Errors", function () {
        it("Has Access", async () => {
          const testID = "0";
          const transaction = await safeMeeting.addAddressToCompany(
            player.address,
            testID
          );
          await transaction.wait(1);

          expect(
            safeMeeting.getCompanyIDFromWallet(deployer)
          ).to.be.revertedWith("DoesNotHaveAccess");
        });
        it("Already Listed", async function () {
          const testID = "0";
          const transaction = await safeMeeting.addAddressToCompany(
            player.address,
            testID
          );
          await transaction.wait(1);
          expect(
            safeMeeting.addAddressToCompany(player.address, testID)
          ).to.be.revertedWith("AlreadyListed");
        });
        it("ID Exists", async function () {
          const testID = "0";
          const transaction = await safeMeeting.addAddressToCompany(
            deployer,
            testID
          );
          await transaction.wait(1);
          const tx = await safeMeeting.storeContent(
            testID,
            0,
            "A",
            "1:2:3",
            2,
            "abcdefg",
            ["a", "b", "c"],
            ["d", "e", "f"]
          );
          await tx.wait(1);
          expect(safeMeeting.getMeetingData(testID, 1)).to.be.revertedWith(
            "MeetingNotListed"
          );
        });
      });
      describe("Testing if data is stored correctly", function () {
        it("Store and Returns correct data", async function () {
          const transaction = await safeMeeting.addAddressToCompany(
            deployer,
            0
          );
          await transaction.wait(1);
          let tx = await safeMeeting.storeContent(
            0,
            0,
            "A",
            "1:2:3",
            3,
            "abcdefg",
            ["a", "b", "c"],
            ["d", "e", "f"]
          );
          await tx.wait(1);
          tx = await safeMeeting.storeContent(
            0,
            1,
            "B",
            "1:2:3",
            1,
            "abcdefg",
            ["a"],
            ["d"]
          );
          await tx.wait(1);
          const recievedData = await safeMeeting.getMeetingData(0, 1);
          assert.equal(recievedData.meetingID.toString(), "1");
          assert.equal(recievedData.chairpersonName, "B");
          assert.equal(recievedData.timestamp, "1:2:3");
          assert.equal(recievedData.numberOfMembers.toString(), "1");
          assert.equal(recievedData.contentHash, "abcdefg");
          assert.equal(recievedData.memberToRoles[0].memberName, "a");
          assert.equal(recievedData.memberToRoles[0].memberRole, "d");
        });
      });
    });
