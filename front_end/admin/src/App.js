import { Space } from 'antd';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import SideMenu from './components/SideMenu';
import AdminHeader from './components/AdminHeader';
import PageContent from './components/PageContent';
import AdminFooter from './components/AdminFooter';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <AdminHeader/>
       <Space className='SideMenuAndPageContent'>
        <SideMenu/>
        <PageContent/>
       </Space>
       <AdminFooter/>
      </div>
    </BrowserRouter>
  );
}

export default App;
