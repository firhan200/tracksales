import Link from 'next/link';
import UserForm from './UserForm';

// either Static metadata
export const metadata = {
    title: 'Add New User',
}

export default function Page(){
    return (
        <div>
            <Link href="/" className="btn mb-6">Back</Link>
            <p className='text-xl font-bold mb-4'>Add New User</p>
            <UserForm />
        </div>
    );
}