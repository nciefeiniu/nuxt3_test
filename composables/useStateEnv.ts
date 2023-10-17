import {useState} from '#imports'

export const envTotalPageState = () => useState<number>('envTotalPageState', () => {
  return 0
})

export const envCurrentPageState = () => useState<number>('envCurrentPageState', () => {
  return 1
})

export const envThisIsBidderState = () => useState<Boolean>('envThisIsBidderState', () => {
  return false
})
