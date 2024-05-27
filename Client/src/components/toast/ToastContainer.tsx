import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import ToastItem from './ToastItem'

const ToastContainer = () => {
      const toast = useSelector((state: RootState) => state.toast.toast)

      // if (toast.length < 0) return null
      return (
            <>
                  {toast.length !== 0 && (
                        <div className='hideScrollBar overflow-hidden fixed flex flex-col gap-[3rem]  text-white top-[2rem] right-0 xl:right-[1rem] xl:top-[3rem] border-none   min-h-[50rem] max-h-max bg-transparent py-[1.2rem]  w-[22rem] xl:w-[30rem] max-w-[360px] xl:max-w-[50rem]   h-screen  z-[600]'>
                              {toast.map((t) => (
                                    <React.Fragment key={t.id}>
                                          {/* <span>{t.id}</span> */}
                                          <ToastItem toast={t} />
                                    </React.Fragment>
                              ))}
                        </div>
                  )}
            </>
      )
}

export default ToastContainer
