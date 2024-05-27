import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ShieldAlert, ShieldCheck, ShieldX, X } from 'lucide-react'
import { DateTime } from 'luxon'
import { removeToast } from '../../redux/toast.slice'

type TProps = {
      toast: Toast.TToast
}

const ToastItem = (props: TProps) => {
      const { toast } = props
      const dispatch = useDispatch()
      const timerToast = useSelector((state: RootState) => state.toast.timerToast)
      const timeOut = useRef<NodeJS.Timeout>()
      const timeInterval = useRef<NodeJS.Timeout>()
      const localDateTime = 'Asia/Ho_Chi_Minh'
      // const token = JSON.parse(localStorage.getItem('token') as string)
      // console.log(jwtDecode(token))
      const [show, setShow] = useState(true)
      const [time, setTime] = useState(timerToast)

      const handleControllCloseToast = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => {
            e.stopPropagation()
            dispatch(removeToast({ id }))
      }

      useEffect(() => {
            timeOut.current = setTimeout(() => {
                  // console.log({ id: toast.id })
                  dispatch(removeToast({ id: toast.id }))
            }, timerToast * 1000)

            timeInterval.current = setInterval(() => {
                  setTime((prev) => (prev -= 1))
                  // console.log('time interval')
            }, 1000)

            return () => {
                  clearTimeout(timeOut.current)
                  clearInterval(timeInterval.current)
            }
      }, [])

      const handleOnMouseEnter = () => {
            clearInterval(timeInterval.current)
            clearTimeout(timeOut.current)
      }

      const handleOnMouseLeave = () => {
            timeOut.current = setTimeout(() => {
                  // console.log({ id: toast.id })
                  dispatch(removeToast({ id: toast.id }))
                  setShow(false)
            }, time * 1000)

            timeInterval.current = setInterval(() => {
                  setTime((prev) => (prev -= 1))
                  // console.log('time interval')
            }, 1000)
      }

      const styleEffect = {
            type_toast:
                  toast.type === 'SUCCESS'
                        ? '   text-blue-900 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] shadow-blue-700 border-[.2rem] border-blue-500'
                        : toast.type === 'ERROR'
                          ? ' text-red-900 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] shadow-red-700  border-[.2rem] border-red-500'
                          : '  text-orange-900 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] shadow-orange-700  border-[.2rem] border-orange-500',
            type_toast_icon:
                  toast.type === 'SUCCESS' ? '#2563eb' : toast.type === 'ERROR' ? ' rgb(239 68 68)' : 'rgb(249 115 22)',
            widthToastContainer: 'min-w-[15rem]',
            bgBoxTime:
                  toast.type === 'SUCCESS' ? ' bg-blue-500' : toast.type === 'ERROR' ? ' bg-red-500' : ' bg-orange-500',
            textColor:
                  toast.type === 'SUCCESS' ? ' bg-blue-500 ' : toast.type === 'ERROR' ? ' bg-red-500' : ' bg-orange-500'
      }

      return (
            <>
                  {show && (
                        <div
                              onMouseEnter={handleOnMouseEnter}
                              onMouseLeave={handleOnMouseLeave}
                              className={`${styleEffect.type_toast} animate-toastAnimation bg-[#ffffff] pt-[.8rem] px-[.6rem] xl:pt-[1.6rem] pb-[3rem] xl:px-[1.2rem] w-[22rem] xl:w-[25rem]  relative min-w-[14rem] xl:min-w-[15rem]   min-h-[10rem]  xl:min-h-[7.4rem] h-[10rem]    rounded-lg transition-all duration-1000  flex items-center justify-center`}
                        >
                              <div
                                    className={`${styleEffect.bgBoxTime} absolute top-[1.5rem] right-[3.5rem] w-[5rem] h-[2

rem] xl:w-[6rem] xl:h-[3rem] flex items-center justify-center rounded-md  text-white `}
                              >
                                    <span>
                                          {DateTime.now()
                                                .setZone(localDateTime)
                                                .toLocaleString(DateTime.TIME_24_SIMPLE)}
                                    </span>
                              </div>
                              <span
                                    style={{ width: `${245 / Math.ceil(time) / 10}rem` }}
                                    className={`${styleEffect.type_toast}  absolute top-[0] left-0   h-[.3rem] transition-all duration-300`}
                              ></span>

                              {/* <span
                                    style={{ width: `${276 / Math.ceil(time) / 10}rem` }}
                                    className={`${styleEffect.type_toast}  absolute bottom-[0px] left-0   h-[3rem] transition-all duration-1000`}
                              ></span> */}

                              <div className='w-full flex gap-[.8rem] mt-[1rem] px-[1.6rem] items-center'>
                                    <span>
                                          {toast.type === 'SUCCESS' ? (
                                                <ShieldCheck size={32} />
                                          ) : toast.type === 'ERROR' ? (
                                                <ShieldX size={32} />
                                          ) : (
                                                <ShieldAlert size={32} />
                                          )}
                                    </span>
                                    <div className='flex flex-col gap-[.8rem] h-max text-[1.3rem]'>
                                          <span className='uppercase'>{toast.type}</span>
                                          <span className='mb-[1.2rem]'>{toast.message}</span>
                                          {toast.subMessage && toast?.subMessage?.length > 0 && (
                                                <div className='flex flex-col gap-[.8rem]'>
                                                      {toast.subMessage.map((sub) => (
                                                            <div
                                                                  className='relative flex items-center gap-[.8rem]'
                                                                  key={sub}
                                                            >
                                                                  <span
                                                                        className={`${styleEffect.bgBoxTime} min-w-[.8rem] min-h-[.8re,] rounded-full`}
                                                                  ></span>
                                                                  <span className='max-w-full break-words'>{sub}</span>
                                                            </div>
                                                      ))}
                                                </div>
                                          )}
                                    </div>
                              </div>
                              <span
                                    className={`${styleEffect.textColor} !text-white absolute flex justify-center items-center bottom-[.5rem] animate-pulse right-[.5rem] w-[3rem] h-[3rem] p-[.4rem] text-[1.2rem] rounded-full border-[.2rem] `}
                              >
                                    {time}
                              </span>
                              <span
                                    onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                                          handleControllCloseToast(e, toast.id)
                                    }
                                    className={`absolute flex justify-center items-center top-[.5rem] animate-pulse right-[.5rem] w-[3rem] h-[3rem] p-[.4rem] text-[1.2rem]  `}
                              >
                                    <X color={`${styleEffect.type_toast_icon}`} />
                              </span>
                        </div>
                  )}
            </>
      )
}

export default ToastItem
