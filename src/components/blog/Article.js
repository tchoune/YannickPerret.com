import React, { useEffect } from 'react';
import Comments from './Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faClock } from '@fortawesome/free-solid-svg-icons'
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPostBySlug } from '../../redux/reducer/BlogReducer';

const Article = () => { 

    const dispatch = useDispatch()
    const slug = useParams().slug

    const item = useSelector((state) => state.blogPost.selectedPost)

     useEffect(()=> {
        window.scrollTo(0, 0)

        if(slug.length > 0){
            dispatch(getPostBySlug(slug))
        }
    }, [])

    const timeforRead = (minutes) => 
    {
        let heure = parseInt(minutes / 60);
        let minutesRestante = (minutes % 60);

        if(heure < 1) return minutes + " minutes";

        if(minutesRestante === 0){
            return heure + " heure"}
        else{
            return heure + " heure " + minutesRestante + " minutes";
        } 
    }

    const dateCreated = new Date(item.dateCreated).toLocaleString("fr-FR")
    const dateUpdate = new Date(item.dateUpdate).toLocaleString("fr-FR")
    
    return (
            <section className="article" id="blog">
                <article className="article">
                    <header className="article__header">
                        <div className="article__title">
                            <img src={"../images/blog/"+item.image} alt={item.imageTitle} />
                            <span  className="article_backList"><Link to="../blog"><FontAwesomeIcon icon={faArrowLeft} />Retour à la liste des articles</Link></span><br />
                            <h2>{item.title}</h2>
                        
                        </div>
                        <div className="article__subtitle">
                            <p><FontAwesomeIcon icon={faClock} /> Lecture : {timeforRead(item.timeRead)} </p>
                            <p>
                            </p> 
                        </div>
                    </header>
                    <div className="article__body">
                        <p dangerouslySetInnerHTML={{__html: item.content}}></p>
                    </div>
                    <footer className="article__footer">
                        <p>Publié le {dateCreated}</p> <p>{!item.dateUpdate ? null: "Dernière modification le "+dateUpdate}</p>
                    </footer>

                    <Comments />
             </article>
            </section>
    );
    
    
};

export default Article;