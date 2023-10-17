import {useState} from '#imports'

export const useUserInfo = () => useState<string>('username', () => {
  return ''
})

export const usePackageState = () => useState<string>('usePackageState', () => {
  return ''
})

export const useLogined = () => useState<Boolean>('isLogin', () => {
  return false
})

export const showPackagesDialog = () => useState<Boolean>('showPackages', () => {
  return false
})

export const totalPageState = () => useState<number>('totalPageState', () => {
  return 0
})

export const currentPageState = () => useState<number>('currentPageState', () => {
  return 1
})

export const thisIsBidderState = () => useState<Boolean>('thisIsBidderState', () => {
  return false
})
