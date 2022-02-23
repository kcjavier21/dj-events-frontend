import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/form.module.css";

const ImageUpload = ({ evtId, imageUploaded, token }: any) => {
  const [image, setImage] = useState<any | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(image);

    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", evtId);
    formData.append("field", "image");

    console.log(formData.get("field"));

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h2>Upload Event Image</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
};

export default ImageUpload;
