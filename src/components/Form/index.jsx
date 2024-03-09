import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import './form.css';

export const UrlForm = () => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState('');

    const handleForm = async (values) => {
        
        console.log(values.url);
        // try {
        //     const response = await fetch('https://opti-morph-back.vercel.app/process-url', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(values.url),
        //     });
      
        //     if (response.ok) {
        //       const data = await response.json();
        //       setResult(data.message);
        //     } else {
        //       setResult('Error al procesar la URL');
        //     }
        //   } catch (error) {
        //     console.error('Error en la solicitud:', error.message);
        //   }
    }

    return (
        <>
          <Formik
            initialValues={{url: ''}}
            onSubmit={handleForm}
          >
            {({handleChange}) => (
              <Form className='form-container sw-auto'>
                <Field 
                  id="url"
                  name="url" 
                  type="text"
                  className="form-input px-8 py-2"
                  onChange={handleChange}
                />
                <button 
                    className='text-black bg-white px-8 py-2 ml-5 rounded-md'
                    type='submit'
                >Escanear</button>
              </Form>
            )}
          </Formik>
        </>
    )
}
