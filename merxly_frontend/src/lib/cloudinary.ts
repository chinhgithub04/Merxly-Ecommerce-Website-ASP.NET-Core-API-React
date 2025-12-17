import { Cloudinary } from '@cloudinary/url-gen';

// Get cloud name from environment variable
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'merxly';

// Initialize Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName,
  },
  url: {
    secure: true, // Use HTTPS
  },
});

// Export cloud name for use in other utilities if needed
export { cloudName };
