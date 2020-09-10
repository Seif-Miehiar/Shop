import axios from "axios";

// sign up.
export const signup = async (data) => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  }

  const response = await axios.post("/signup", data, config);

  return response;
}

// sign in
export const signin = async (data) => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  }

  const response = await axios.post("/api/auth/signin", data, config);

  return response;
}