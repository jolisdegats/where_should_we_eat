import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleModal =()=> {
    console.log(7777, isModalOpen)
    setIsModalOpen(!isModalOpen);
  }

  return {isModalOpen , toggleModal};
}


export default useModal;
