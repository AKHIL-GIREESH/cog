export const getThread = async (name,message) => {
    try {
        const resp = await fetch(`http://localhost:3000/api/v1/forum/${name}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })

        const respJSON = await resp.json()
        console.log(respJSON)
        return respJSON

    } catch (err) {
        throw new Error("Something went wrong : " + err)
    }
}