import { revalidatePath } from "next/cache";

export default async function getSearch(id:string, min:Number, max:Number) {
    console.log("min: ", min, " / max: " , max);
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/search/:search?restaurantName=${id}&minPrice=${min}&maxPrice=${max}`)
    if(!response.ok){
        throw new Error(`Failed to fetch search ${id} ${min} ${max}`)
    }
    return await response.json()
}
