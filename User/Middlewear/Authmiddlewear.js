import UserModals from "../Modals/User.Modals.js"


export const checkadmin = async (req, res, next) => {

    try {
        const { id } = req.body

        if(!id) return res.status(401).json({ success: false, message: "Id not found" })

        const user = await UserModals.findOne({_id: id })

        if (!user) return res.status(404).json({ success: false, message: "user not found" })

        if (user.type == "admin") {
            next()
        } else {
            return res.status(401).json({ success: false, message: "Only admin can access" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })

    }

}
export default checkadmin