'use client'

import Link from 'next/link';
import DeleteUserButton from './DeleteUserButton';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const UserList = ({ users }) => {
    async function getUsers(){
        const res = await fetch('/api/user');

        const jsonBody = await res.json();

        return jsonBody;
    }

    // Access the client
    const queryClient = useQueryClient()

    // Queries
    const { isLoading, isError, data, error } = useQuery({ queryKey: ['users'], queryFn: getUsers });

    if(isLoading){
        return <h4>Loading data...</h4>
    }

    if(isError){
        return <h4>{ error }</h4>
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data != null ?
                        data.map((user, index) => (
                            <tr key={index}>
                                <td>{ user.name }</td>
                                <td>{ user.email }</td>
                                <td>
                                    <Link href={"/user/" + user.id} className='mr-4 btn'>Edit</Link>
                                    <DeleteUserButton user={user}/>
                                </td>
                            </tr>
                        )) : null
                    }
                </tbody>
            </table>
        </div>
           
    );
}

export default UserList;