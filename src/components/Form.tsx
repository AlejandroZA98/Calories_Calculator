import { Dispatch, useState,useEffect } from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"
import { AcivityActions, ActivityState } from "../reducers/activity-reducer"
import { v4 as uuidv4 } from 'uuid'

type FormProps={
    dispatch: Dispatch<AcivityActions>,// haciendo uso de dispatch que es una funcion que debe tener la estructura de ActivityActions
    state:ActivityState
}

export default function Form({dispatch,state}:FormProps) {

    const inicialState:Activity={
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }
    const [activity,setActivity] = useState<Activity>(inicialState)

    useEffect(()=>{
        console.log('Hay algo en ActiveId',state.activeId)
        if(state.activeId){// si hay un activeId, busca la actividad que coincida con este id
        const  selectedActivity=state.activities.filter(stateActivity=>stateActivity.id===state.activeId)[0]
        setActivity(selectedActivity)
        }
    },[state.activeId])// siempre se ejecuta cuando cambnia el state de activeId


    const handlChange=(event: React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLInputElement>)=>{// distintos tipos de eventos
        //console.log(e.target.id)
        //console.log(e.target.value)
        const isNumberField=['category','calories'].includes(event.target.id)// identifica si se escribe en category o calories
        console.log(isNumberField)
        setActivity({...activity,[event.target.id]:isNumberField? +event.target.value:event.target.value})
        
    }

    const isActivity = ()=>{
        const {name,calories}=activity
        return name.trim()!==''&& calories>0
    }

    const handleSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        console.log("Submit")
        dispatch({type: 'save-activity',payload:{newActivity:activity}})// usamos dispatch que usa type y payload
        setActivity({...inicialState, id: uuidv4()})// tomaa una copia de inicial state y cre un nuevo uuid
    }
  return (
    <>
    <form 
    className=" space-y-5 bg-withe shadow p-10 rounded-lg" onSubmit={handleSubmit}>
        <div className=" grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria:</label>
            <select className="border border-slate-300 p-2 rounded-lg w-full bg-white"
             id="category" value={activity.category} onChange={handlChange}>
                {
                    categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input id="name" type="text" className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas"
            value={activity.name} onChange={handlChange}/>

        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            <input id="calories" type="number" className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calorias, ej.300 o 500"
            value={activity.calories} onChange={handlChange}/>

        </div>
        <input type="submit" className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category===1 ?'Guardar comida':'Guardar Ejercicio'} disabled={!isActivity()}/>
    </form>
    
    </>


)
}
