import { revalidatePath } from "next/cache";

export default async function getSearch(id:string, min:Number, max:Number) {
    console.log("id/name: ", id, " min: ", min, " / max: " , max);
    if(id=='%20'){
        id = '';
    }
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/search/:search?restaurantName=${id}&minPrice=${min}&maxPrice=${max}`, { next: { tags: ['searchTag'], revalidate: 300}, cache: 'no-store'})
    if(!response.ok){
        throw new Error(`Failed to fetch search ${id} ${min} ${max}`)
    }
    return await response.json()
}
