import React from 'react';
import { useForm } from 'react-hook-form';
import { useHikings } from '../../Context/HikingContext';

function HikingForm() {
  const { register, handleSubmit } = useForm(); 
  const { createHiking } = useHikings();

  const onSubmit = handleSubmit((data) => {
    createHiking(data)
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          type='text' 
          placeholder='Name'
          {... register("name")}
          autoFocus
        />
        <input 
          type='text' 
          placeholder='Image'
          {... register("image")}
          autoFocus
        />        
        <input 
        type='text' 
        placeholder='Duration'
        {... register("duration")}
        autoFocus
      />
        <textarea 
          rows="3" 
          placeholder='Description'
          {... register("description")}

        >

        </textarea>
        <button>
          Save
        </button>

      </form>
    </div>
  )
}

export default HikingForm;