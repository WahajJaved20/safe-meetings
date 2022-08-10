import { useRouter } from "next/router";
import { Form, useNotification } from "web3uikit";
import { useState, useEffect } from "react";
// Company ID to be resolved automatically
export default function SignUp() {
  function handleAdmin() {
    setAdmin(true);
  }
  function handleUser() {
    setAdmin(false);
  }
  let [isAdmin, setAdmin] = useState(false);
  useEffect(() => {}, [isAdmin]);
  const dispatch = useNotification();
  const Router = useRouter();
  async function handleUserSubmit(data) {
    const adminName = data.data[0].inputResult;
    const companyId = data.data[1].inputResult;
    const employeeID = data.data[2].inputResult;
    const role = data.data[3].inputResult;
    const email = data.data[4].inputResult;
    const password = data.data[5].inputResult;
    const formInput = {
      name: adminName,
      emp_id: employeeID,
      role: role,
      email: email,
      password: password,
      isAdmin: isAdmin,
      companyID: companyId,
    };
    const response = await fetch("/api/addUser", {
      method: "POST",
      body: JSON.stringify(formInput),
      headers: {
        "content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result["message"] == "success") {
      dispatch({
        type: "success",
        message: "Account Creation Successfull",
        position: "topR",
        title: "Account Created",
      });
    } else {
      dispatch({
        type: "error",
        message: "No Company Exists with the provided ID",
        position: "topR",
        title: "Creation Failed",
      });
    }

    Router.push("/");
  }
  async function handleAdminSubmit(data) {
    const adminName = data.data[0].inputResult;
    const companyName = data.data[1].inputResult;
    const employeeID = data.data[2].inputResult;
    const role = data.data[3].inputResult;
    const email = data.data[4].inputResult;
    const password = data.data[5].inputResult;

    const formInput = {
      name: adminName,
      emp_id: employeeID,
      role: role,
      email: email,
      password: password,
      isAdmin: isAdmin,
      companyName: companyName,
    };
    const response = await fetch("/api/addAdmin", {
      method: "POST",
      body: JSON.stringify(formInput),
      headers: {
        "content-Type": "application/json",
      },
    });
    dispatch({
      type: "success",
      message: "Account Creation Successfull",
      position: "topR",
      title: "Account Created",
    });

    Router.push("/");
  }
  return (
    <div className=" bg-gray-100">
      <div className="flex flex-col px-96 py-20">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-10 text-center"></main>
        <div className="ml-48 text-2xl mb-2 flex flex-row">
          {isAdmin ? (
            <div>
              <a href="#" onClick={handleUser} className="font-bold">
                <span>User</span>
              </a>
              <span className="ml-20 mr-20 text-gray-500">|</span>
              <span className="text-blue-800 font-bold">Admin</span>
            </div>
          ) : (
            <div>
              <span className="text-blue-800 font-bold">User</span>

              <span className="ml-20 mr-20 text-gray-500">|</span>
              <a href="#" onClick={handleAdmin}>
                <span className="font-bold">Admin</span>
              </a>
            </div>
          )}
          <a
            href="/"
            className=" text-blue-800 px-12 ml-12 font-semibold hover:bg-blue-800 hover:text-white hover:rounded-full hover:border-blue-800"
          >
            Sign In
          </a>
        </div>
        <Form
          isDisabled={false}
          onSubmit={isAdmin ? handleAdminSubmit : handleUserSubmit}
          title="Sign Up"
          data={[
            {
              name: "Name",
              type: "text",
              inputWidth: "100%",
              value: "",
              key: "name",
              validation: {
                required: true,
              },
            },
            isAdmin
              ? {
                  name: "Company Name",
                  type: "text",
                  inputWidth: "100%",
                  value: "",
                  key: "comp_name",
                  validation: {
                    required: true,
                  },
                }
              : {
                  name: "Company ID",
                  type: "text",
                  inputWidth: "100%",
                  value: "",
                  key: "comp_id",
                  validation: {
                    required: true,
                  },
                },
            {
              name: "Employee ID",
              type: "text",
              inputWidth: "100%",
              value: "",
              key: "emp_id",
              validation: {
                required: true,
              },
            },

            {
              name: "Role",
              type: "text",
              inputWidth: "100%",
              value: "",
              key: "role",
              validation: {
                required: true,
              },
            },
            {
              name: "Email",
              type: "email",
              inputWidth: "100%",
              value: "",
              key: "email",
              validation: {
                required: true,
              },
            },
            {
              name: "Password",
              type: "password",
              inputWidth: "100%",
              value: "",
              key: "password",
              validation: {
                required: true,
              },
            },
          ]}
        ></Form>
      </div>
    </div>
  );
}
