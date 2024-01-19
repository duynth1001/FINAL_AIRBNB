import fetcher from "./fetecher";

export const signupAPI = async (payload) => {
  try {
    const response = await fetcher.post("/auth/signup", payload);
    return response.data.content;
  } catch (error) {
    throw(error)
  }
};

export const signinAPI = async (payload) => {
  try {
    const response = await fetcher.post("/auth/signin", payload);
    return response.data.content;
  } catch (error) {
    if (error.response.status == 400) {
        alert(error.response.data.content);
      }
      localStorage.clear();
  }
};

export const uploadAvatarAPI = async(payload)=>{
  try {
    const response = await fetcher.post("/users/upload-avatar", payload);
    return response.data.content;
  } catch (error) {
      console.log(error);
  }
}

export const getUserInfoAPI = async(params) =>{
  try {
    const response = await fetcher.get(`/users/${params}`);
    return response.data.content;
  } catch (error) {
      console.log(error);
  }
}

export const userInfoUpdateAPI = async(data) =>{
  try {
    const response = await fetcher.put(`/users/${data.params}`, data.payload);
    return response.data.content;
  } catch (error) {
      throw(error)
  }
}