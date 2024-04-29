export default async function getReservation(token:string) {
    const response = await fetch("http://localhost:5000/api/v1/reservations", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
    }})
        
    if(!response.ok){
        throw new Error("Failed to Reservation")
    }
    return await response.json()

}