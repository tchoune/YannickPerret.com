import React from 'react';

const ContactInfo = (props) => {

    if(props.isOpen){
        return (
            <div className='contact__container__body__information'>
                <form>
                    <div>
                        <label>Nom et prénom </label><input type="text" /> 
                    </div>
                    <div>
                        <label>Email </label><input type="email" />
                    </div>
                    <div>
                        <label>Mon message </label><textarea rows={15} cols={75} >Bonjour Yannick Perret, je vous contact pour </textarea>
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        );
    }
    
};

export default ContactInfo;