import './Box.css';

export const Box = ({ char }) => {
  return (
    <div className='box-container'>
      <h1 className='box-item'>{char}</h1>
    </div>
  );
};
