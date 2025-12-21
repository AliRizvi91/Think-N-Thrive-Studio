'use client'
import React, { useState, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../pocket/Container'
import MainButton from '../pocket/MainButton'
import { postContact } from '@/react_redux/thunks/ContactThunks'
import { useAppDispatch, useAppSelector } from '../reduxComponents/ReduxHook'

function ContactPart1() {
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector((state) => state.StoreOfContact)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    })

    const [localError, setLocalError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLocalError(null)
        setSuccess(false)

        if (!formData.name || !formData.email || !formData.message) {
            setLocalError('Name, Email aur Message required hain')
            return
        }

        const result = await dispatch(postContact(formData))

        if (postContact.fulfilled.match(result)) {
            setSuccess(true)
            setFormData({ name: '', email: '', phone: '', message: '' })
        }
    }


    return (
        <Container maxWidth="Exl" className="md:h-screen h-full flex flex-col justify-center gap-5 items-center relative top-[14vh]">
            <div className="grid md:grid-cols-2 grid-cols-1 w-full h-full mb-40 md:gap-0 sm:gap-20 gap-5">

                {/* Left Image */}
                <div className="flex justify-center items-center">
                    <object
                        type="image/svg+xml"
                        data="/assets/images/Contact.svg"
                        className="md:w-[70%] w-[90%] md:h-[70%] h-[90%]"
                    />
                </div>

                {/* Right Form */}
                <div className="flex justify-center items-center w-full">
                    <form
                        className="w-full md:px-20 px-5 flex flex-col gap-4"
                    >

                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="border-b bg-transparent outline-none py-2"
                        />

                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border-b bg-transparent outline-none py-2"
                        />

                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="border-b bg-transparent outline-none py-2"
                        />

                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            rows={4}
                            className="bg-[#22222215] outline-none p-3 rounded-lg"
                        />

                        {/* Errors */}
                        {localError && <p className="text-red-500 text-sm">{localError}</p>}
                        {success && <p className="text-green-500 text-sm">Message sent successfully ✔</p>}

                        <MainButton onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Sending...' : 'Submit'}
                        </MainButton>


                    </form>
                </div>
            </div>
        </Container>
    )
}

export default ContactPart1
