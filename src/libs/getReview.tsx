export default async function getReview(id:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/restaurants/${id}/reviews`, {
        method: "GET",
        next: { revalidate: 3600 }
        })
        
    if(!response.ok){
        throw new Error("Failed to fetch review")
    }
    return await response.json()

}