import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {

    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [activities])
    return (
        <>
            <h2 className="text-2xl font-bold text-rose-700 text-center">
                Comida y Actividades
            </h2>
            {activities.map(activity => (
                <div key={activity.id} className="px-5 py-10 mt-5 flex justify-between items-center">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase ${activity.category === 1 ? 'bg-lime-600' : 'bg-red-500'}`}>
                            {categoryName(+activity.category)}
                        </p>
                        <p className="text-2xl font-bold pt-5">{activity.name}</p>
                        <p className="font-black text-4xl text-lime-300">
                            {activity.calories} {''}
                            <span>calorias</span>
                        </p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button
                            onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
                        >
                            <PencilSquareIcon className="h-8 w-8 text-rose-700" />
                        </button>
                    </div>
                </div>

            ))}
        </>
    )
}
