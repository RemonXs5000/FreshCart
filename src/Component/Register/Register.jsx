import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  *  as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';






export default function Register() {
  let {userToken , setUserToken } =useContext(UserContext);
  const [APImsg, setAPImsg] = useState("");
  const [Isloading, setIsloading] = useState(false);
  let navigate =useNavigate();


  function validationSchema(){
    let Schema = Yup.object({
      name :Yup.string().required("Name is Required").min(2 , "min Name length 3 charecters").max(15 , "Max Name length 15 charecters"),
      email : Yup.string().email("Enter A valid Email Address").required("Email Is Required"),
      password : Yup.string().required("Password is Required").min(6),
      rePassword : Yup.string().required("Confirm your Password").oneOf([Yup.ref("password")], "No matching passwords")
    });
    return Schema ; 
  }

  function registerUser(UserData){
    setIsloading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',UserData).then(data=>{
      if(data.data.message === "success"){
        localStorage.setItem("userToken",data.data.token)
        setUserToken(data.data.token)
        navigate("/home")
      }
    }).catch(error=>{
      setIsloading(true)
      setAPImsg(error.response.data.message)
    }).finally(()=>{
      setIsloading(false)
    })
  }



  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      tel:""
    },
    validationSchema
    ,
    onSubmit:(formValues)=>{
      registerUser(formValues)
  }
})




    

  return (
  <>
  <div className='w-1/2 mx-auto my-10'>
    <div className='text-center my-8'> 
      <h2 className='text-4xl text-[#4FA74F] font-bold'>Welcome to Fresh Cart</h2>
      <h4 className='text-xl text-slate-500 '>Create An Account</h4>
    </div>

   <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="name" id="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
    {formik.errors.name && formik.touched.name ?<div className="p-4 my-4 text-sm text-slate-700 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-blue-400" role="alert">{formik.errors.name}</div> : null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email" id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    {formik.errors.email && formik.touched.email ?<div className="p-4 my-4 text-sm text-slate-700 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-blue-400" role="alert">{formik.errors.email}</div> : null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="password" id="password" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.password} className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    {formik.errors.password && formik.touched.password ?<div className="p-4 my-4 text-sm text-slate-700 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-blue-400" role="alert">{formik.errors.password}</div> : null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="rePassword" id="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
    {formik.errors.rePassword  && formik.touched.rePassword ?<div className="p-4 my-4 text-sm text-slate-700 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-blue-400" role="alert">{formik.errors.rePassword}</div> : null}
  </div>
  {APImsg ? <div className="p-4 mb-4 text-sm text-black rounded-lg bg-blue-200 dark:bg-blue-800-800 dark:text-white" role="alert">{APImsg}</div> : null }
  <button type='submit' className='bg-emerald-700 py-3 px-4 text-white font-semibold rounded-md hover:bg-[#4FA74F]' >{ Isloading ? <i className="fa-duotone fa-solid fa-spinner animate-spin"></i>  : "CreateAccount" }</button>
</form>


  </div>
  </>
  )
}
