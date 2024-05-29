import { toast } from 'sonner';

const message = (status,message) => {
    status==='success'
      ? toast.success(message, {
          position: 'top-center',
          duration: 5000,
          style: {
            height: '50px',
            padding: '0px 10px 0px 10px',
            width: 'fit-content'
          }
        })
      : toast.error(message, {
        style: {
           height: '50px',
           padding: '0px 10px 0px 10px',
           width: 'fit-content'
          },
          position: 'top-center',
          duration: 5000,
        });
};

export default message;