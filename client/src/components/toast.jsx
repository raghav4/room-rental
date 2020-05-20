import Swal from 'sweetalert2';

const Toast = (title, text = '', icon = 'success') => {
  Swal.fire({
    icon,
    title,
    text,
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export default Toast;
