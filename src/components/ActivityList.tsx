import  { useMemo } from 'react'
import { Activity } from '../types'
import { categories } from '../data/categories'
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { AcivityActions } from "../reducers/activity-reducer"
import { Dispatch } from "react"

type ActivityListProps={
    activities: Activity[],
    dispatch: Dispatch<AcivityActions>
}


export default function ActivityList({activities,dispatch}:ActivityListProps) {
    const categoryName=useMemo(()=>
        (category:Activity['category'])=>categories.map(cat=> cat.id=== category ? cat.name : ''),[activities])// funcion que devuelve otra funcion para mejorar el rendimiento de useMemo (ver sintaxis de useMemo)
  return (
    <>
        <h2 className='text-4xl font-bold text-slate-600 text-center'> Comida y Actividades</h2>
        {activities.length===0?
        <p className='text-2xl text-center text-red-800 pt-5'>No hay actividades agregadas</p>:
            activities.map((activity) => (
                <div key={activity.id} className=' px-5  py-5 bg-withe mt-5 flex justify-between '>
                   <div className='space-y-2 relative'>
                     <p className={`absolute -top-8 -left-8 px-10 uppercase font-bold ${activity.category===1?
                        'bg-lime-500':'bg-orange-500'}`}>{categoryName(+activity.category)}</p>
                     <p className='text-2xl font-bold pt-5'>{activity.name}</p>
                     <p className='font-black text-4xl text-lime-500'>{activity.calories}{' '}
                        <span> Calorias</span>
                     </p>
                   </div>
                   <div className='flex gap-5 items-center'>
                        <button>
                       <PencilSquareIcon className='h-8 w-8 text-gray-800' onClick={()=>dispatch({type:'set-activeId',payload:{id:activity.id}})}/>
                        </button>
                        <button>
                       <XCircleIcon className='h-8 w-8 text-red-500' onClick={()=>dispatch({type:'delete-activity',payload:{id:activity.id}})}/>
                        </button> 
                   </div>
                </div>
            ))
        }
    </>

)
}
