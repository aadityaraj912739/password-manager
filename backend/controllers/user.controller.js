import User from "../models/user.model.js";

const DEFAULT_USER_EMAIL = "localvault@passop.app";

const getOrCreateVaultUser = async () => {
    let user = await User.findOne({ email: DEFAULT_USER_EMAIL });

    if (!user) {
        user = await User.create({
            username: "Local Vault",
            email: DEFAULT_USER_EMAIL,
            password: "vault-user"
        });
    }

    return user;
};

export const getPasswords = async (req, res) => {
    try {
        const user = await getOrCreateVaultUser();
        res.status(200).json({ passwords: user.passwords });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error!" });
    }
};

// SAVE PASSWORD
export const savePassword = async (req, res) => {
    try {
        const { website, username, password } = req.body;

        if (!website || !username || !password) {
            return res.status(400).json({ message: "Please fill all fields!" });
        }

        const user = await getOrCreateVaultUser();

        user.passwords.push({
            website,
            username,
            password
        });

        await user.save();

        const savedPassword = user.passwords[user.passwords.length - 1];

        res.status(201).json({
            message: "Password saved successfully!",
            password: savedPassword
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error!" });
    }
};


// DELETE PASSWORD (using _id)
export const deletePassword = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await getOrCreateVaultUser();

        user.passwords = user.passwords.filter(p => p._id.toString() !== id);

        await user.save();

        res.status(200).json({ message: "Password deleted successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error!" });
    }
};


// EDIT PASSWORD (using _id)
export const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const { website, username, password } = req.body;

        if (!website || !username || !password) {
            return res.status(400).json({ message: "Please fill all fields!" });
        }

        const user = await getOrCreateVaultUser();

        const item = user.passwords.id(id);
        if (!item) {
            return res.status(404).json({ message: "Password not found!" });
        }

        item.website = website;
        item.username = username;
        item.password = password;

        await user.save();

        res.status(200).json({
            message: "Password updated successfully!",
            password: item
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error!" });
    }
};