"use client"

import React , { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { removeCard } from '@/redux/slices/deckSlice';
import Image from 'next/image';

export default function Card({card, constraint }) {
  const motionValue = useMotionValue(0);
  const rotateValue = useTransform(motionValue, [-400,400],[-50,50]);
  const opacityValue = useTransform(motionValue, [-400, -200, 0, 200, 400], [0, 1, 1, 1, 0]);
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const cardRef = useRef(null)

  console.log(`url("${card.photos[currentImage].photo}")`)

  useEffect(() => {
    setWidth(cardRef.current.offsetWidth);
    setHeight(cardRef.current.offsetHeight);
  },[])

  return (
    <motion.div
      ref={cardRef}
      drag='x'
      dragConstraints={constraint}
      dragSnapToOrigin
      style={{
        x: motionValue,
        opacity: opacityValue,
        rotate: rotateValue,
        backgroundImage: `url("${card.photos[currentImage].photo}")`
      }}
      onDragEnd={(event, info) => {
        if(Math.abs(info.point.x) >= 550 || Math.abs(info.point.x) <= -550 ){
          dispatch(removeCard(card.id));
        }
      }}
      className='card'
    >
      <div className='card__selector'>
        {card.photos.map((_,index) => (
          <div 
            key={index} 
            className={currentImage === index ? "card__selector-item_active" : "card__selector-item" }
            onClick={() => setCurrentImage(index)}
          ></div>
        ))}
      </div>
    </motion.div>
  )
}
