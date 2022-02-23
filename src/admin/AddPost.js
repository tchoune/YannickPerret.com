import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {convertToRaw} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
//import { convertToHTML } from 'draft-convert';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import regeneratorRuntime from "regenerator-runtime";



const AddPost = () => {


  const [billet, setBillet] = useState({
    title:"",
    description : "",
    contenu : "",
    image : {
      preview : null,
      data : null,
      title : ""
    },
    timeRead : 0,
    slug : "",
    color : "#FFFFFF",
  });

  //const [image, setImage] = useState({preview:null, data: null})
  const [postId, setPostId] = useState(null);


  useEffect(() =>{
    console.log(billet.image.data)

    if (!billet.image.data) return;

    const newImageURL = URL.createObjectURL(billet.image.data);
    setBillet({...billet, image :{...billet.image, preview: newImageURL}})



  }, [billet.image.data])

  const handleSubmitForm = async (event) =>{

    event.preventDefault();

    const formData = new FormData();
    formData.append("file", billet.image.data);
    formData.append("fileName", billet.image.data.name);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: billet.title, 
        description : billet.description, 
        content: draftToHtml(convertToRaw(billet.contenu.getCurrentContent())), 
        image: billet.image.data.name, 
        titleImage: billet.image.title, 
        timeRead: billet.timeRead,
        slug: billet.slug,
        color: billet.color
       })
    };

    try{

      await fetch('http://192.168.1.102:3000/api/createPosts', requestOptions)
      .then(response => response.json())
      .then(data => setPostId(data.id));

      await fetch('http://192.168.1.102:3000/api/upload', {method: 'POST', body:formData})

    }catch(e){
      console.log(e)
    }
    
  }



  const handleChangeTitle = (e) =>{
    setBillet({...billet, title:e.target.value})
  }

  const handleChangeDescription = (e) =>{
    setBillet({...billet, description:e.target.value})
  }
  const handleChangeContenu = (e) =>{
    setBillet({...billet, contenu:e})
  }
  const handleChangeImageTitle = (e) =>{
    setBillet({...billet, image:{...billet.image, title : e.target.value}})
  }
  const handleChangeTimeRead = (e) =>{
    setBillet({...billet, timeRead:e.target.value})
  }
  const handleChangeSlug = (e) =>{
    setBillet({...billet, slug:e.target.value})
  }
  const handleChangeColor = (e) =>{
    setBillet({...billet, color:e.target.value})
  }
  const handleChangeImage = (e) => {
    setBillet({...billet, image :{...billet.image, data: e.target.files[0]}})
  }
  
 
  return(
      <div className='addPost'>
        {postId >= 1 ? <div>Le billet de blog a bien été créer ! - <Link to={"../blog/"+billet.slug}>Voir le post créer</Link></div>
        :
        <form onSubmit={handleSubmitForm} className="formAddPost" encType='multipart/form-data'>  
        <h1>Ajouter un article au blog</h1>

          <h2>Information du billet</h2>
          <div className='formAddPost__title'>
            <div>
              <label>Titre du billet : </label>
              <input type={"text"} placeholder={"Titre du billet"} value={billet.title} onChange={handleChangeTitle} maxLength="250"/>
            </div>
            
            <div>
              <label>Description du billet</label>
              <textarea maxLength="500" rows="5" cols="145" value={billet.description} onChange={handleChangeDescription}/>
            </div>
          </div>
          
          <div className='formAddPost__content'>
              <label>Contenu du billet : </label>
              <Editor 
                editorState={billet.contenu}
                wrapperClassName="formAddPost__wrapper"
                editorClassName="formAddPost__editor"
                onEditorStateChange={handleChangeContenu}
                spellCheck={true}
                />
          </div>

          <h2>Ajouter une image</h2>
          <div className='formAddPost__image'>
              <div>
                <label>Upload image header :</label>
                <input type="file" accept='image/gif, image/jpeg, image/png' onChange={handleChangeImage}/>
              </div>
            
              <div>
                <label>Alt de l'image : </label>
                <input type={"text"} placeholder={"Alt de l'image"} value={billet.image.title} onChange={handleChangeImageTitle}/>
              </div>

              <img src={billet.image.preview} height='350' width='450' />
          </div>

          <h2>Options obligatoires</h2>
          <div className='formAddPost__option'>
            <div>
              <label>Temps de lecture : </label>
              <input type={"number"} placeholder={"Temps de lecture en minutes"}  value={billet.timeRead} onChange={handleChangeTimeRead}/>
            </div>

            <div>
              <label>Url du billet : </label>
              <input type={"text"} placeholder={"Slug url du billet"} value={billet.slug} onChange={handleChangeSlug}/>
            </div>
            
            <div>
              <label>Couleur de la cards : </label>
              <input type="color" placeholder={"La couleur de l'encadré"} value={billet.color} onChange={handleChangeColor}/>
            </div>
            
          </div>
          <h2>Soumettre le billet</h2>
          <div className='formAddPost__submit'>
              <input type="submit" value="Soumettre mon posts" />
              <input type="reset" value="Remettre à zero" />
          </div>
        </form> 
        }
        
      </div>
  )
}

export default AddPost;