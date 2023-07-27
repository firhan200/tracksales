import Link from 'next/link';
import UserList from './UserList';

export const metadata = {
    title: 'Users'
} 

export default async function Page(){
    return (
        <div>
            <Link className='btn' href="/user/add">Add User</Link>
            <UserList/>
        </div>
    );
}