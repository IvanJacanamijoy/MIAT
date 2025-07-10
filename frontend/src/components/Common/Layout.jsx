import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}) => {
    return (
        <div className="app min-h-96">
            <Navbar />
            <main className='min-h-screen'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;