import { useState } from 'react';
import './assets/style/global.scss';
import Header from './components/Header.js';
import Pages from './pages/index.js';
function App() {
   const [loading, setLoading] = useState(false)
   return <div className="App">
      {loading ?
         <div>loading....</div>
         :
         <div>
            <div>
               <Header />
            </div>
            <div>
               <Pages />
            </div>
         </div>
      }
   </div>
}
export default App;
