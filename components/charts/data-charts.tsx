"use client"

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import Chart from "@/components/charts/chart";
import CategoriesPie from "./categories-pie";

const Datacharts = () => {
    const {data, isLoading} = useGetSummary()

    if (isLoading){
        return (
            <div>
                Loading......
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <Chart data={data?.days} />
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
             <CategoriesPie data={data?.categories}/>   
            </div>
        </div>
    );
}
 
export default Datacharts;