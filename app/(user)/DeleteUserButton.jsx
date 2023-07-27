'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteUserButton({ user }){
    // Access the client
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: (id) => {
            return fetch(`/api/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: 'users'
            })
        }
    })

    return (
        <>
            {
                deleteMutation.isLoading ? (
                    <button className="btn btn-disabled">Deleting...</button>
                ) : (
                    <button className="btn" onClick={()=>window[`delete_user_modal_${user.id}`].showModal()}>Delete</button>
                )
            }
            <dialog id={'delete_user_modal_'+user.id} className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Confirmation</h3>
                    <p className="py-4">Delete user { user.name }?</p>
                    <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn" onClick={() => deleteMutation.mutate(user.id)}>Delete</button>
                    <button className="btn btn-danger">Close</button>
                    </div>
                </form>
            </dialog>
        </>
    );
}