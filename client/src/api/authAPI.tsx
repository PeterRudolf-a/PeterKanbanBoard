import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    // fetch the login route with the user info
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    // if the response is not ok, throw an error
    if (!response.ok) {
      throw new Error("User information not retrieved, check network tab");
    }
    // return the data
    return await response.json();
    // catch any errors and log them to the console
  } catch (error) {
    console.log('Error from user login: ', error);
    return Promise.reject('Cound not fetch user information');
  }
}



export { login };
