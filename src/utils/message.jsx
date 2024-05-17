import { toast } from 'sonner';

const message = (status,message) => {
    status==='success'
      ? toast.success(message, {
          position: 'top-center',
          duration: 3000,
        })
      : toast.error(message, {
        style: {
            width:'37vw'
          },
          position: 'top-center',
          duration: 5000,
        });
};

export default message;