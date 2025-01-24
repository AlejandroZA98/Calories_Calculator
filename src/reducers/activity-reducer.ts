import {Activity} from "../types"
// esta es la accion con la que se dispara el reducer mediante dispatch
export type AcivityActions=
{type:'save-activity',payload:{newActivity:Activity}} |    // payload contiene la nueva actividad que se crea con formato Activity
{type:'set-activeId',payload:{id:Activity['id']}}|
{type:'delete-activity',payload:{id:Activity['id']}}|
{type:'restart-app'}
// definimos tipo
export type ActivityState={ // es un objeto con activities que tienen la forma de [] y activity
 activities:Activity[],// propiedad de estado de tipo array Activity esto tiene la forma [{},{}]
 activeId: Activity['id']// tiene forma o valor de el id de Activity
} // tipo de actividades 
//usamos variables
const localStorageActivities =() :Activity[] =>{
    const activities=localStorage.getItem('activities');
        return activities ? JSON.parse(activities) : []
  
}
export const initialState:ActivityState={// estado que tiene la forma de ActivityState y es igual a {activitie:[]}
    activities:localStorageActivities(),// lo define simplemente vacio
    activeId:''// lo define como un string
}

export const activityReducer=( // Reducer que toma el estado actual y una accion 
    state:ActivityState=initialState,
    action:AcivityActions // state tiene el estado inicial
)=>{
    if(action.type==='save-activity'){
        // maneja la logica para actualizar el state
        //console.log('desde el type de save-activity')
        //console.log(action.payload.newActivity);
        let updatedeActivities:Activity[]=[]

        if (state.activeId){
            updatedeActivities=state.activities.map(activity=> activity.id===state.activeId?action.payload.newActivity:activity)
        }
        else{
            updatedeActivities=[...state.activities,action.payload.newActivity]
        }
        return{
            ...state,// copia de estado actual la state
            activities:updatedeActivities, // toma las activities en state y agrega nuevas 
            activeId:''
        }
    }
    
    if (action.type==='set-activeId'){
        return{
            ...state,
            activeId:action.payload.id // cambia el activeId
        }
    }
    if (action.type==='delete-activity'){
        console.log("ELiminar")
        return{
            ...state,
            activities: state.activities.filter(activity=>activity.id!==action.payload.id)
        }
    }
    if (action.type==='restart-app'){
       // console.log("Reiniciar")
        return {
            activities:[],
            activeId:''    
        } // devuelve el estado inicial
    }
    return state; // devuelve el estado actualizado
}