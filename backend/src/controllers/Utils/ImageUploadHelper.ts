import { removeImage, uploadImage } from "../../services/Cloudinary/cloudinary";

export const imageUploadeHandler = async (file: any) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    // if (!allowedMimeTypes.includes(file.mimetype)) {
    //     return "invalid_file_type"
    // }

    // Generate a unique public ID using the profile name and current timestamp
    const publicId = `admin_profile${Date.now()}`;

    // Upload the new avatar to cloud storage
    const uploadResult = await uploadImage(file.buffer, publicId);
    console.log("Uploaded Url is : ", uploadResult.secure_url);

    if (await uploadResult.secure_url) {
        return uploadResult.secure_url;
    }

}

export const removeImagehandler = async (prevAvatar: string | any) => {
    // Delete the previous avatar from cloud storage if it exists
    if (prevAvatar) {
        const prevPublicId = prevAvatar.split('/').pop()?.split('.')[0];
        if (prevPublicId) {
            await removeImage(prevPublicId); // Remove previous avatar from cloud storage
        }
    }
}