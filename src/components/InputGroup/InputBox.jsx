import { useRef } from 'react';
import './InputGroup.css';

export const InputBox = ({ result, onChange, onReset }) => {
  const inputRef = useRef(null);

  const toInputUppercase = (e) => {
    e.target.value = ('' + e.target.value).toUpperCase();
  };

  return (
    <div className='input-box'>
      <input
        onInput={toInputUppercase}
        onChange={(e) => onChange(e.target.value[e.target.value.length - 1])}
        autoFocus
        ref={inputRef}
        className='input'
        placeholder='Type here'
        type='text'
        disabled={result}
      />
      <button
        onClick={() => {
          onReset();
          inputRef.current.value = '';
          setTimeout(() => {
            inputRef.current.focus();
          }, 0);
        }}
        className='btn'
      >
        Reset
      </button>
    </div>
  );
};
