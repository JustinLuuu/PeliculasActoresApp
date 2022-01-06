export const subirImagen = async (imagen) => {
    const cloudDinaryUrl = 'https://api.cloudinary.com/v1_1/dzz0903ce/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', imagen);

    const resp = await fetch(cloudDinaryUrl, {
        method: 'POST',
        body: formData
    });

    if (resp.ok) {
        const cloudDinaryResp = await resp.json();
        return cloudDinaryResp.secure_url;
    }
    else {
        throw await resp.json();
    }
}

