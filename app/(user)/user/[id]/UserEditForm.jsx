'use client'

import { QueryClient, useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

const UserEditForm = ({ user }) => {
    const router = useRouter();

    const queryCient = new QueryClient();

    const updateMutation = useMutation({
        mutationFn: (data) => {
            return fetch(`/api/user/${data.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email
                })
            });
        },
        onSuccess: () => {
            queryCient.invalidateQueries({
                queryKey: 'users'
            });

            router.back();
        }
    });

    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email
        },
        onSubmit: async values => {
            console.log(values)
            updateMutation.mutate({
                id: user.id,
                name: values.name,
                email: values.email
            });
        },
    });

    return (
        <form className="flex flex-col justify-center gap-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
                <div className="mb-3">Full Name</div>
                <input type="text" id="name" name="name" placeholder="Input name here.." className="input input-bordered w-full" required onChange={formik.handleChange} value={formik.values.name}/>
            </div>
            <div className="flex flex-col">
                <div className="mb-3">Email</div>
                <input type="email" id="email" name="email" placeholder="Input email here.." className="input input-bordered w-full" onChange={formik.handleChange} value={formik.values.email} required/>
            </div>
            <div>
                <button className="btn mt-9">Submit</button>
            </div>
        </form>
    );
}

export default UserEditForm;