interface data{
    email:string,
    password:string
}

interface Errors {
  email?: string;
  password?: string;
}

export const loginValidate=(data:data)=>{
     let newErrors: Errors = {};

     if(!data.email.trim()){
        newErrors.email="Email is required"
     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
  }

  const password = data.password;
  if (!password.trim()) {
    newErrors.password = "Password is required";
  }
  return newErrors;
}
