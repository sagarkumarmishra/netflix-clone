import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'

interface Inputs {
    email: string
    password: string
}

const Login = () => {
    const [login, setLogin] = useState(false)
    const {signIn, signUp, loginErr} = useAuth()


    const [learnMore, setLearnMore] = useState(false)
    // const [show, setShow] = useState(false)  //for show hide button
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async({email, password}) => {
        if(login){
            await signIn(email, password)
        }else{
            await signUp(email, password)
        }
    }

  return (
    <div className='relative flex h-screen w-screen bg-black flex-col md:items-center md:justify-center md:bg-transparent'>
        <Head>
            <title>Login-Netflix</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>


        <Image
            // src="https://rb.gy/p2hphi"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/8459cea4-79ab-4f27-9ef0-a7c92a30a9bb/6defa446-a465-465d-9975-d2ec35582ebe/IN-en-20220411-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
            layout="fill"
            className="-z-10 !hidden opacity-60 sm:!inline"
            objectFit="cover"
        />
        

        <img
            src="https://rb.gy/ulxxee"
            className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
            width={165}  //165 default 150
            height={165}  //165 default 150
        />
        
        {/* md:left-14 md:top-7 */}

        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className='relative mt-24 space-y-8 rounded bg-black/80 md:mt-5 md:max-w-md md:px-[68px] md:pt-[55px] md:pb-[55px] py-10 px-5   ' //py-10 px-6 md:px-14 or px-[68px] py-[60px]
        >

            <h1 className='text-3xl font-semibold font-sans' onClick={()=>{setLogin(true)}}>Sign In</h1>

            <div className='space-y-4'>
                {/* login/sign-up error handling */}
                {loginErr &&
                    <div className={`bg-[#e87c03] text-[14px] py-[10px] px-[20px] rounded`}>
                        <p>{loginErr}, please try again!</p>
                    </div>
                }
                <label className='inline-block w-full'>
                    <input 
                        type="email" 
                        placeholder='Email' 
                        className={`input ${errors.email && "border-b-2 border-orange-500"}`}
                        {...register("email", {required: true})}
                    />


                    {/* errors will return when field validation fails  */}
                    {errors.email && <p className='p-1 text-[14px] font-light text-[#e87c03] tracking-tight leading-none'>Please enter a valid email address.</p>}
                </label>
                
                <label className='inline-block w-full'>
                    <input 
                        type="password" 
                        placeholder='Password' 
                        className={`input ${errors.password && "border-b-2 border-orange-500"}`} 
                        {...register("password", {required: true})}
                    />

                    {/* errors will return when field validation fails  */}
                    {errors.password && <p className='p-1 text-[14px] font-light text-[#e87c03] leading-none tracking-tight'>Your password must contain between 4 and 60 characters.</p>}
                    
                    {/* show hide button */}
                    {/* <button className='text-[gray] text-sm absolute top-4 ml-40 left-20 pl-10' onClick={()=>setShow(!show)}>{show ? "HIDE" : "SHOW"}</button> */}
                </label>
                
            </div>

            <button 
                className='w-full rounded bg-[#e50914] py-3 font-semibold' 
                onClick={()=>setLogin(true)}
            >
                Sign In
            </button>

            <div className='text-[gray]'>
                <div>
                    New to Netflix?{" "}
                    <button type="submit" className='text-white hover:underline' onClick={()=>setLogin(false)}>
                        Sign up now
                    </button>
                    {"."}
                </div>
            

                <div className='text-[gray] mt-[20px] text-[14px] font-light tracking-tight leading-none'>
                    This page is protected by Google reCAPTCHA to
                    
                    ensure you're not a bot. <a onClick={()=>setLearnMore(!learnMore)} className='text-[#0080ff] hover:underline cursor-pointer'>Learn more.</a>
                
                { learnMore &&
                    <div className='text-[gray] text-[14px] mt-[12px] font-light tracking-tight leading-none '>
                    The information collected by Google reCAPTCHA is subject to the Google <a target="_blank" href="https://policies.google.com/terms" className='text-[#0080ff] hover:underline'>Privacy Policy</a> and <a target="_blank" href="https://policies.google.com/privacy" className='text-[#0080ff] hover:underline'>Terms of Service</a>, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalised advertising by Google).
                    </div>
                }
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login