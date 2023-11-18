"use client"

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useRouter } from 'next/navigation';
import { signup } from '@/redux/slices/userSlice';
import Select from 'react-select';
import { options, getValueSelect, selectStyles } from '@/constants';
import { getIsAuth } from '@/redux/slices/userSlice';

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ mode:"onChange"});
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuth = useSelector(getIsAuth)

  useEffect(() => {
    if(isAuth){
      redirect('/');
    }
  },[])

  const onsSubmit = (data) => {
    dispatch(signup(data));
    reset();
  }
  
  return (
    <form method='#' className='form' onSubmit={handleSubmit(onsSubmit)}>
      <label className="form__label">Email<span className='form__star'>*</span></label>
      <input type="email" className="form__input" placeholder="some@gmail.com" {...register("email", { required: "Введите email", pattern:{
        value:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ,
        message:"Введите коректный email"
      }})} />
      {errors.email && <div className="form__error">{errors.email.message}</div>}
      <label className="form__label">Пароль<span className='form__star'>*</span></label>
      <input type='password' className="form__input" placeholder='...' {...register('password', { required:'Введите пароль', minLength:{
        value: 4,
        message: 'Пароль должен содержать не менее четырех символов'
      }})} />
      {errors.password && <div className='form__error'>{errors.password.message}</div>}
      <label className="form__label">Имя<span className='form__star'>*</span></label>
      <input placeholder='Денис' className="form__input" {...register('firstname', { required:"Введите имя" })} />
      {errors.firstname && <div className='form__error'>{errors.firstname.message}</div>}
      <label className="form__label">Фамилия<span className='form__star'>*</span></label>
      <input className="form__input" placeholder='Денисов' {...register('lastname', { required: 'Введите фамилию'})} />
      {errors.lastname && <div className='form__error'>{errors.lastname.message}</div>}
      <label className="form__label">Пол<span className='form__star'>*</span></label>
      <Controller 
        control={control} 
        name='gender'
        rules={{
          required:'Пол обязателен к выбору',
        }} 
        render={({field: { onChange, value }, fieldState: {error}}) => (
        <>
          <Select 
            placeholder="Выберите пол" 
            styles={selectStyles}
            options={options} 
            value={getValueSelect(value)}
            onChange={(newValue) => onChange(newValue.value)} 
          />
          {error && <div className='form__error'>{error.message}</div>}
        </>
      )}/>
      {errors.gender && <div className='form__error'>{errors.gender.message}</div>}
      <label className="form__label">Интерисующий пол<span className='form__star'>*</span></label>
      <Controller 
        control={control} 
        name='interestingGender'
        rules={{
          required:'Интерисующий вас пол обязателен к выбору',
        }} 
        render={({field: { onChange, value }, fieldState: {error}}) => (
        <>
          <Select 
            placeholder="Выберите пол" 
            styles={selectStyles}
            options={options} 
            value={getValueSelect(value)}
            onChange={(newValue) => onChange(newValue.value)} 
          />
          {error && <div className='form__error'>{error.message}</div>}
        </>
      )}/>
      {errors.interestingGender && <div className='form__error'>{errors.interestingGender.message}</div>}
      <label htmlFor='fileInput' className="form__fileLabel">Загрузите фотографии</label>
      <input id='fileInput' className='form__file' type='file' multiple={true} {...register('files',{required: 'Вы должны загрузить как минимуи одну фотографию'})} />
      {errors.files && <div className='form__error'>{errors.files.message}</div>}
      <input className="form__submit" type="submit" value="Зарегестрироваться" />
    </form>
  )
}
