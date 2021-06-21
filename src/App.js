import 'react-pro-sidebar/dist/css/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layout';

function App() {
  return (
    <div>
      <Layout />
      <ToastContainer />
    </div>
  );
}

export default App;
