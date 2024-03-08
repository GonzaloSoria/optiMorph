import { useState } from 'react';
import './form.css';

export const Form = () => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState('');

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://opti-morph-back.vercel.app/process-url', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url }),
            });
      
            if (response.ok) {
              const data = await response.json();
              setResult(data.message);
            } else {
              setResult('Error al procesar la URL');
            }
          } catch (error) {
            console.error('Error en la solicitud:', error.message);
          }
    }

    return (
        <>
            <form id="form-container w-auto" onSubmit={handleForm}>
                <input 
                    type="text" 
                    name="url" 
                    placeholder="ejemplo: https://wwww.lenovo.com/us/en/pc"
                    id="url" 
                    className='form-input px-8 py-2'
                />
                <button 
                    id="url"
                    className='text-black bg-white px-8 py-2 ml-5 rounded-md'
                >Buscar</button>
            </form>
        </>
    )
}
