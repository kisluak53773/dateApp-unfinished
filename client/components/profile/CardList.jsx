"use client"

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCards, getIsLoading, fetchDeck } from '@/redux/slices/deckSlice';
import Card from './Card';
import { motion } from 'framer-motion';

export default function CardList() {
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsLoading);
  const cards = useSelector(getCards);
  const constraint = useRef(null);

  useEffect(() => {
    dispatch(fetchDeck("Мужской"));
  }, [])

  return (
    <motion.div ref={constraint} className='cards'>
      {(cards && !isLoading) && cards.map((card) => <Card key={card.id} constraint={constraint} card={card}/>)}
    </motion.div>
  )
}
