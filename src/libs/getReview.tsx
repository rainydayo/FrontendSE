export default async function getReview(id:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${id}/reviews`, {
        method: "GET",
        })
        
    if(!response.ok){
        throw new Error("Failed to fetch review")
    }
    return await response.json()

}