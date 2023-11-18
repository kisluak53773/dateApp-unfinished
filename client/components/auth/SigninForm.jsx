"use client"

import { useEffect } from "react";
import { signin } from "@/redux/slices/userSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from 'next/navigation';
import { getIsAuth, getError } from "@/redux/slices/userSlice";

export default function SigninForm() {
  const { register, handleSubmit,formState:{errors},reset } = useForm({mode:"onChange"});
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const error = useSelector(getError);

  useEffect(() => {
    if(isAuth){
      redirect('/');
    }
  },[])

  const onSubmit = data => {
    dispatch(signin(data));
    reset();
  };
   
  return (
    <form method='#' className='form' onSubmit={handleSubmit(onSubmit)}>
      {error && <div className='form__error'>Неверный пароль или email</div>}
      <label className="form__label">Email<span className='form__star'>*</span></label>
      <input type="email" autoComplete="on" className="form__input" placeholder="some@gmail.com" {...register("email", { required: "Введите email", pattern:{
        value:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ,
        message:"Введите коректный email"
      }})} />
      {errors.email && <div className="form__error">{errors.email.message}</div>}
      <label className="form__label">Пароль<span className='form__star'>*</span></label>
      <input type='password' autoComplete="on" className="form__input" placeholder='...' {...register('password', { required:'Введите пароль', minLength:{
        value: 4,
        message: 'Пароль должен содержать не менее четырех символов'
      }})} />
      {errors.password && <div className='form__error'>{errors.password.message}</div>}
      <input className="form__submit" type="submit" value="Войти" />
    </form>
  );
}