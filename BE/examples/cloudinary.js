const cloudinary = require('./common/cloudinary');
app.post('/uploadCloudinary', async function (req, res) {
    const {image} = req.body; // Assuming the uploaded file is sent as 'file'
    // console.log(image);
    // Upload the file to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: 'testing'
    });
    // console.log(uploadedImage);
    // // Get the URL of the uploaded image
    // const imageURL = uploadedFile.secure_url;

    res.json({ message: 'Done', imageURL: uploadedImage.url })
})
