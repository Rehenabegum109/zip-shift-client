import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hook/useAuth';
import { Link, useLocation } from 'react-router';
import SocialLogin from './SocialLogin/SocialLogin';
import axios from 'axios';

const Register = () => {
    const {register,handleSubmit,formState:{errors}} =useForm()
    const{registerUser,updateUserProfile} =useAuth()
    const location =useLocation()
    console.log('location in register',location)
     const handleRegister =(data) =>{
        console.log('after submit',data.photo[0])
        const profileImg =data.photo[0]
        
        registerUser(data.email,data.password)
        .then(result =>{
            console.log(result.user)
            const formData =new FormData();
            formData.append('image',profileImg)
            const imageApiKey =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageUrl}`
            axios.post(imageApiKey,formData)
          .then(res =>{
            console.log('after image upload',res.data.data.url)
            // update user profile
            const userProfile ={
              displayName:data.name,
              phtoURL :res.data.data.url
            }
            updateUserProfile(userProfile)
            .then(result =>{
              console.log('user profile user',result.user)
              .catch(error =>console.log(error) )
            })
          })
        })
        .catch(err =>{
            console.log(err.message)
        })

    }
    return (
        <div>
          <form onSubmit={handleSubmit(handleRegister)}>
               <div className="card items-center bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                  <h3 className="text-3xl text-center">Welcome to Zap shift</h3>
                <p className='text-center'>Please login </p>
      <div className="card-body">
        <fieldset className="fieldset">
          {/* you name */}

              <label className="label">Name</label>
          <input type="name" {...register('name',{required:true})} className="input" placeholder="your name" />

          {errors.name?.type==='required'&& <p className='text-red-500'>name is required</p>}
          {/* Photo image */}
              <label className="label">Photo</label>
          <input type="file" {...register('photo',{required:true})} className="file-input" placeholder="Email" />

          {errors.email?.type==='required'&& <p className='text-red-500'>Email is required</p>}
          <label className="label">Email</label>
          <input type="email" {...register('email',{required:true})} className="input" placeholder="your photo" />

          {errors.email?.type==='required'&& <p className='text-red-500'>your photo is required</p>}
          <label className="label">Password</label>
          <input type="password" {...register('password',{required:true,minLength:6
})} className="input" placeholder="Password" />

          {
            errors.password?.type==='required'&&<p className='text-red-500'>Password is required</p>
          }
          {
            errors.password?.type==='minLength'&&<p className='text-red-500'>Password must be 6 charactersmor longer</p>
          }
          
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset> 
        <p>Already have an account <Link to='/login' className='text-blue-400 underline'>Login</Link></p>
      </div>
      <SocialLogin/>
    </div>
    
          </form>
          
        </div>
    );
};

export default Register;