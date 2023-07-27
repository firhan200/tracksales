'use client'

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const UserForm = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            name: 'test',
            email: 'test@jaydigital.com.au',
            password: '123456'
        },
        onSubmit: async values => {
            setLoading(true);
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values)
            });

            const jsonBody = await res.json();
            setLoading(false);
            if(jsonBody.success){
                router.push('/');
            }else{
                alert(jsonBody.error);
            }
        },
    });

    return (
        <form className="flex flex-col justify-center gap-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
                <div className="mb-3">Full Name</div>
                <input type="text" disabled={loading} id="name" name="name" placeholder="Input name here.." className="input input-bordered w-full" required onChange={formik.handleChange} value={formik.values.name}/>
            </div>
            <div className="flex flex-col">
                <div className="mb-3">Email</div>
                <input type="email" disabled={loading} id="email" name="email" placeholder="Input email here.." className="input input-bordered w-full" onChange={formik.handleChange} value={formik.values.email} required/>
            </div>
            <div className="flex flex-col">
                <div className="mb-3">Password</div>
                <input type="password" disabled={loading} id="password" name="password" placeholder="Input password here.." className="input input-bordered w-full" onChange={formik.handleChange} value={formik.values.password} required/>
            </div>
            <div>
                <button className="btn mt-9" disabled={loading}>
                    { loading ? 'Submitting...' : 'Submit' }
                </button>
            </div>
        </form>
    );
}

export default UserForm;