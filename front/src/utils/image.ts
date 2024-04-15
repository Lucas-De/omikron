import imageCompression from "browser-image-compression";

export function imageToBase64(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(imageFile);
  });
}

export function compressImage(file: File): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  });
}
