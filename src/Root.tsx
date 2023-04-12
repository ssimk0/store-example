import { Outlet } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Root() {

  return (
    <div className="px-8 py-16">
      <Outlet />
      <ToastContainer 
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
      />
    </div> 
  )
}

export default Root
