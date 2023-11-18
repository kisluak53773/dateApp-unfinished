"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth } from '@/redux/slices/userSlice';
import { logout } from '@/redux/slices/userSlice';

export default function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  const handleClick = ()=> {
    dispatch(logout())
  }

  return (
    <header className='header'>
      <Link className='header__title' href='/'>
        <Image 
          src={logo}
          width={31}
          height={36}
          className='header__title-image'
          alt='Tinder logo' 
        />
        <span className='header__title-text'>tindercopy</span>
      </Link>
      {!isAuth ? <Link className='header__link' href='/signin'>Войти</Link> : <button onClick={handleClick} className='header__link'>Выйти</button>}
    </header>
  )
}
