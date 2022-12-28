import { Button, TextField } from "@mui/material";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import "./LoginPageStyles.css";
import { auth } from "../../db/firebase";
import {useFormik} from 'formik'
import {signInWithEmailAndPassword} from 'firebase/auth'

const LoginPage = ({login}) => {
////Declaring formik schema//////////////////////////
  const formik = useFormik({
    initialValues: {
      logInEmail: "",
      logInPassword:""
    },
    validationSchema: Yup.object({
      logInEmail: Yup.string().email().required("email is required"),
      logInPassword:Yup.string().min(6, "At least 6 char or more").required('password is required')
      
      
    }),
    
    onSubmit: (values) => {loginButtonHandler() }
  })

///////////Form submit handler///////////////////////// 
  async function loginButtonHandler () { 
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        formik.values.logInEmail,
        formik.values.logInPassword
      )
      console.log(user)
    } catch (error) { 
      console.log(error.message)
    }
  }
  
  return (
    <div className="login-page-wrapper">
      <div className="login-form">
        <h1>Log in to IRecruiter</h1>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{width:"50%", m:3}}
            size="small"
            error={formik.errors.logInEmail && true}
            name="logInEmail"
            label='email'
            helperText={formik.errors.logInEmail}
            value={formik.values.logInEmail}
            onChange={formik.handleChange}
          />

          <TextField
            sx={{ width: "50%", mb: 3 }}
            error={formik.errors.logInPassword && true}
            size="small"
            name='logInPassword'
            label='password'
            helperText={formik.errors.logInPassword}
            value={formik.values.logInPassword}
            onChange={formik.handleChange}
          />
            
     
          <Button
            sx={{ width: "50%", margin: "30px", borderRadius: "15px" }}
            variant="contained"
            type="submit"
          >Log in
          </Button>
        </form>
        <div > Not registered on IRecruiter yet? </div>
        <div className="create-account">
        <Link >Create your account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
