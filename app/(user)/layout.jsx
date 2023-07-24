// These styles apply to every route in the application
import Navigation from '../../components/Navigation';
import '../../styles/globals.css'

export default function RootLayout({ children }){
    return (
        <html lang="en">
            <body>
                <Navigation />

                <div className='container mx-auto my-6'>
                    {children}
                </div>
            </body>
        </html>
    );
}