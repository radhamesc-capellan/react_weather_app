import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import './Input.css';

const Input = ({text, submit, cli}) => {
  return (
    <form className='input' onSubmit={submit}>
        <input className='input-value' type={'text'} placeholder='Enter the City' onChange={text} />
        <span className='input-icon' onClick={cli}>
            <BiSearchAlt />
        </span>
    </form>
  )
}

export default Input