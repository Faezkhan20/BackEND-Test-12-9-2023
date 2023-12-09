import UserModals from "../Modals/User.Modals.js"


export const Create = async (req, res) => {
    try {

        const { email, name, type,id } = req.body

        if (!email || !name || !type ||!id) return res.status(401).json({ success: false, message: "All field are mandatory" })

        const user = new UserModals({
            email,
            type,
            name
        })

        await user.save()

        return res.status(200).json({ success: true, message: "Successfully created" })



    } catch (error) {
        return res.status(500).json({ success: false, message: error })

    }

}
export const Delete = async (req, res) => {
    try {


        const { id } = req.body
        if (!id) return res.status(401).json({ success: false, message: "Allowed only For Admin" })
        await UserModals.findById(id)

        return res.status(200).json({ success: true, message: " deleted Successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })

    }
}

