import './MainLayout.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const MainLayout = ({children}) => {
    return (
        <div className="app">
            <Navbar />
            <main className='min-h-screen'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout