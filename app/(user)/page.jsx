'use client'

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

export default function Page(){
    const [populateTime, setPopulateTime] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function populateUsers(){
            setLoading(true);

            const res = await fetch('/api/user', {
                method: 'GET'
            });

            const body = await res.json();

            setUsers(body);

            setLoading(false);
        }

        populateUsers();

        return () => {

        }
    }, [populateTime]);

    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            name: 'firhan',
            email: 'firhan.faisal1995@gmail.com',
            password: '123456'
        },
        onSubmit: async values => {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values)
            });

            const jsonBody = await res.json();

            if(jsonBody.success){
                setPopulateTime(new Date().getTime());
            }else{
                alert(jsonBody.error);
            }
        },
    });

    return (
        <div>
            <form className="flex flex-col md:flex-row justify-center gap-4" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                    <div className="mb-3">Full Name</div>
                    <input type="text" id="name" name="name" placeholder="Input name here.." className="input input-bordered w-full" required onChange={formik.handleChange} value={formik.values.name}/>
                </div>
                <div className="flex flex-col">
                    <div className="mb-3">Email</div>
                    <input type="email" id="email" name="email" placeholder="Input email here.." className="input input-bordered w-full" onChange={formik.handleChange} value={formik.values.email} required/>
                </div>
                <div className="flex flex-col">
                    <div className="mb-3">Password</div>
                    <input type="password" placeholder="Input password here.." className="input input-bordered w-full" onChange={formik.handleChange} value={formik.values.password} required/>
                </div>
                <div>
                    <button className="btn mt-9">Submit</button>
                </div>
            </form>

            <h1>Users</h1>
            {
                loading ? "Please wait.." : (
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
                                    users != null ?
                                    users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{ user.name }</td>
                                            <td>{ user.email }</td>
                                            <td>Edit</td>
                                        </tr>
                                    )) : null
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
}