export const getThread = async (threadDetails) => {
    try {
        const resp = await fetch(`http://localhost:3000/api/v1/forum/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(threadDetails)
        })

        const respJSON = await resp.json()
        console.log(respJSON)
        return respJSON

    } catch (err) {
        throw new Error("Something went wrong : " + err)
    }
}