const sendEmail = require('../../../services/email');

const signUp = async (req, res) => {
    let { userName, email, password, phone, location } = req.body;
    try {
        // Way One
        // const addedUser = await userModel.insertMany({ userName, email, password, phone, location });

        // Way Two => prefered because it allows hooking
        const createdUser = new userModel({ userName, email, password, phone, location });
        const addedUser = await createdUser.save();
        const token = jwt.sign({ id: addedUser._id, email }, process.env.SECRET_KEY, { expiresIn: 60 });
        const refreshToken = jwt.sign({ email }, process.env.SECRET_KEY);
        const message = `<a href= "${req.protocol}://${req.headers.host}/user/confirmEmail/${token}">Click to confirm email.</a>
<p>Note: the confirmation link will expire within two minutes.</p>
<a href= "${req.protocol}://${req.headers.host}/user/resendConfirmationEmail/${refreshToken}">Click to resend confirm email.</a>`
        await sendEmail(email, message);
        res.json({ message: 'User signed up successfully. Note: Confirmation email sent successfully(expires within one minute).', addedUser });
    } catch (error) {
        res.status(400).json({ message: 'User with such email already exists!!', error });
    }
}
