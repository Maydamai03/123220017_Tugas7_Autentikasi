import User from "../models/UserModel.js";

// get all notes milik user yang sedang login
export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            where: {
                userId: req.userId   // hanya ambil note milik user ini
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
}


export const getUsersById = async(req, res)=>{
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }

        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }


}

//CREATE
export const createUser = async (req, res) => {
    try {
        await User.create({
            title: req.body.title,
            category: req.body.category,
            text: req.body.text,
            userId: req.userId   // ⬅️ WAJIB ADA INI
        });
        res.status(201).json({ msg: "Note Created" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message });
    }
};



//UPDATE
export const updateUser = async (req,res) => {
    try {
        await User.update(req.body,{
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Data Berhasil Diubah Bolo"
        })
    } catch (error) {
        console.log(error.message)
    }
}

//DELETE

export const deleteUser = async (req,res) => {
   await  User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({
        message: "Data Wis Dihapus Bolo"
    })
}
