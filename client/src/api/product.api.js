import axios from "axios"

export const createProduct = async (formData) => {

  const config = {
    headers: {
      "content-type": "application/json",
      // 'content-type': 'multipart/form-data'
    }
  }

  const response = await axios.post('/api/product', formData, config);

  return response

}