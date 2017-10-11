export const closeModal = () => {
  document.getElementsByClassName('modal-backdrop')[0].remove();
  document.getElementsByTagName('body')[0].className = ' ';
};

