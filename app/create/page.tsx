"use client"
import Navbar from "@/components/navbar/Navbar";
import styles from "./create.module.css"
import Footer from "@/components/footer/Footer";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import axios from "axios";
interface FormData{
  title : string;
  desc : string;
  img : string;
  email:string;
}

const Create = () => {
  const {data: session} = useSession();
  const [formData, setFormData] =useState<FormData>({
    title :'',
    desc:'',
    img:'',
    email:session?.user?.email || "",
  });
  const [responseMesage, setResponseMesage] = useState<string>('');

  const handleChange =  (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {name , value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const addPost = async (e : React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try{
      const response  = await axios.post('api/blog/addpost',formData);
      setResponseMesage(response.data.message);
      alert(response.data.message);
    }catch(error){
      console.log(error);
      alert(responseMesage);
   }
  }
  return (
    <>
    <Navbar/>
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <h2 className={styles.head}>Create Post</h2>
        <form onSubmit={addPost} className={styles.form}>
          <input type="text" placeholder="Title" name="title" className={styles.input} value={formData.title} onChange={handleChange}/>
          <textarea placeholder="Description" name="desc" className={styles.input} value={formData.desc} onChange={handleChange}/>
          <input type="text" placeholder="Image URL" name="img" className={styles.input} value={formData.img} onChange={handleChange}/>
          <button className={styles.button}>Create</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Create
