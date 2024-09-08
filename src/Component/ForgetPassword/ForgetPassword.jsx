import { FormikConsumer, useFormik } from 'formik'
import  *  as Yup from 'yup'
import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



export default function ForgetPassword() {
const [codeRequest, setcodeRequest] = useState(false)
const [Isloading, setIsloading] = useState(false)
const navigate = useNavigate();




    
  function validationSchema(){
    let Schema = Yup.object({
      email : Yup.string().email("Enter A valid Email Address").required("Email Is Required"),
    });
    return Schema ; 
  }


    function requestPassword(formvalues){
        return axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",{
            email :formvalues.email
        }).then((response)=>{
             setcodeRequest(true)
            })
        .catch((error) =>{
            setIsloading(true)
        } ).finally(()=>{
            setIsloading(false)
        })
    }

    let formik =useFormik({
        initialValues:{
            email :""
        },
        validationSchema,
        onSubmit : async(formvalues)=>{
            setIsloading(true)
            let response =await requestPassword(formvalues)
            toast.success("Verification Email was Sent")
            navigate("/code Verify")
            
        },
        
    }
    )


    
  return (
<>
    <div className='w-1/2 mx-auto my-10'>
    <div className='text-center my-8'> 
      <h4 className='text-2xl text-slate-500 '>Recover Your Account</h4>
    </div>

 <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    {formik.errors.email && formik.touched.email ?<div className="p-4 my-4 text-sm text-slate-700 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-blue-400" role="alert">{formik.errors.email}</div> : null}
    <button type='submit' className='bg-emerald-700 my-3 py-3 px-4 text-white font-semibold rounded-md hover:bg-[#4FA74F]' >{ Isloading ? <i className="fa-duotone fa-solid fa-spinner animate-spin"></i>  : "Sent Code" }</button>
  </div>
</form> 
  </div>
</>
  )
}
