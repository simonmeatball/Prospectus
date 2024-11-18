import React from 'react'
import { X } from 'lucide-react'

export default function Profile() {
    return (
        <div>
            <div className='text-center'>
                <h1 className='font-bold text-2xl'>Idk whats wrong with my resume. Help.</h1>
                <div className='flex justify-center'>
                    <button className='btn bg-black text-white'>
                        SWE
                        <X />
                    </button>
                    <button className='btn bg-black text-white'>
                        New Grad
                        <X />
                    </button>
                </div>
            </div>
        </div>
    )
}