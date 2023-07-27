// These styles apply to every route in the application
import Navigation from '../../components/Navigation';
import '../../styles/globals.css'
import UserManager from './UserManager';

export default function RootLayout({ children }){
    return (
        <html lang="en">
            <body>
                <div className='container mx-auto my-6'>
                    <UserManager>
                        {children}
                    </UserManager>
                </div>
            </body>
        </html>
    );
}