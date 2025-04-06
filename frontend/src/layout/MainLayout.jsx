import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const MainLayout = () => {
    return (
        <div className="app">
            <Navbar/>
            <main>
                {/* aqui se renderizan las paginas */}
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout