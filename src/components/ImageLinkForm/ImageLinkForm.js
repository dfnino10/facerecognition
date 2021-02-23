import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = () =>{
    return(
        <>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='flex justify-center'>
                <div className='form shadow-5 pa4 br3 w-60'>
                    <input className='f4 pa2 w-70 center' type='text'/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer'>Detect</button>
                </div>
            </div>
        </>
    )
}

export default ImageLinkForm;