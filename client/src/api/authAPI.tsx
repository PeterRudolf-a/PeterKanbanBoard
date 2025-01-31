import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    // fetch the login route with the user info
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    // check if the response is ok
    const data = await response.json();
    // if the response is not ok, throw an error
    if (!response.ok) {
      throw new Error("Invalid API response, check network tab");
    }
    // return the data
    return data;
    // catch any errors and log them to the console
  } catch (error) {
    console.error("Error:", error);
  }
}



export { login };
