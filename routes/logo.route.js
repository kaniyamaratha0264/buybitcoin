const express = require("express");
const router = express.Router();
const Logo = require('../modals/logo')

router.get("/", async (req, res) => {
    try {
        const response = await Logo.findOne()
        if (response) {
            return res
                .status(200)
                .json({ message: "Logo fetched successfully", status: "success", response });
        }

        else {
            return res.status(401).json({
                message: "failed to fetch blogs",
                status: "success",
                response: null,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            status: "failed",
            error: error?.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { logoBase64 } = req.body;


        if (!logoBase64) {
            return res.status(400).json({ message: 'LogoBase64 is required', status: 'success', response: null });
        }

        const updatedLogo = await Logo.findOneAndUpdate({}, { base64: logoBase64 }, { upsert: true, new: true });

        res.status(200).json({ message: 'Logo updated successfully', data: updatedLogo });

    } catch (error) {

        return res.status(500).json({
            message: "Something went wrong",
            status: "failed",
            error: error?.message
        });
    }
});

module.exports = router;
