import React, { useState } from 'react';

function Claudinary() {
  const [imagen, setImagen] = useState("");
  const [loading, setLoading] = useState(false);

  const upLoadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "PrintCraft3DImagenes");
    setLoading (true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deeufsn3k/image/upload",
      {
        method: "POST",
        body: data,
      }
    )
    const file = await res.json();
    // console.log(res)
    setImagen(file.secure_url)
    setLoading(false)
  }

  return (
    <div>
      <form>
        <input type="file" placeholder="Subir imagen a Cloudinary" onChange={upLoadImage} />
        {loading ? (<h3>Cargando Imagenes...</h3>) : (<img src=""/>)}
      </form>
    </div>
  )
}

export default Claudinary;