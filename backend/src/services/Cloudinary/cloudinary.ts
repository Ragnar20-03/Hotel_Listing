import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Wrap the Cloudinary upload in a promise

export const uploadImage = (buffer: Buffer, publicId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'HotelListing/',
                public_id: publicId,
                overwrite: true,

            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(buffer);
    });
};

export const removeImage = async (prevPublicId: string | any) => {
    try {
        await cloudinary.uploader.destroy(`uploads/avatar/${prevPublicId}`);
        console.log(`Previous avatar removed: ${prevPublicId}`);
    } catch (deleteError) {
        console.error("Error deleting previous avatar:", deleteError);
    }
}