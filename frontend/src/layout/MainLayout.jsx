import './MainLayout.css'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const MainLayout = () => {
    return (
        <div className="app">
            <Navbar className="absolute top-0 left-0 right-0 z-20"/>
            <main className='flex-grow relative'>
                {/* aqui se renderizan las paginas */}
                <Outlet />
            </main>
            <Footer className="z-20"/>
        </div>
    )
}

export default MainLayout