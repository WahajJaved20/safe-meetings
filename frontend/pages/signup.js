import { useRouter } from "next/router";
import { Form, useNotification } from "web3uikit";

// Company ID to be resolved automatically
export default function SignUp() {
  const dispatch = useNotification();
  const Router = useRouter();
  async function handleSubmit(data) {
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
      isAdmin: true,
    };
    const response = await fetch("/api/addAdmin", {
      method: "POST",
      body: JSON.stringify(formInput),
      headers: {
        "content-Type": "application/json",
      },
    });
    const result = await response.json();
    dispatch({
      type: "success",
      message: "Account Creation Successfull",
      position: "topR",
      title: "Account Created",
    });
    Router.push("/");
    //todo : Generate company ID and name
  }
  return (
    <div>
      <Form
        isDisabled={false}
        onSubmit={handleSubmit}
        title="Sign Up"
        data={[
          {
            name: "Name",
            type: "text",
            inputWidth: "50%",
            value: "",
            key: "name",
            validation: {
              required: true,
            },
          },
          {
            name: "Company Name",
            type: "text",
            inputWidth: "50%",
            value: "",
            key: "comp_name",
            validation: {
              required: true,
            },
          },
          {
            name: "Employee ID",
            type: "text",
            inputWidth: "50%",
            value: "",
            key: "emp_id",
            validation: {
              required: true,
            },
          },
          {
            name: "Role",
            type: "text",
            inputWidth: "50%",
            value: "",
            key: "role",
            validation: {
              required: true,
            },
          },
          {
            name: "Email",
            type: "email",
            inputWidth: "50%",
            value: "",
            key: "email",
            validation: {
              required: true,
            },
          },
          {
            name: "Password",
            type: "password",
            inputWidth: "50%",
            value: "",
            key: "password",
            validation: {
              required: true,
            },
          },
        ]}
      ></Form>
    </div>
  );
}
