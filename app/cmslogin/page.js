"use client";
import { useForm } from "react-hook-form";
import Div from "../(home)/components/division";
import { useEffect, useState } from "react";
import { loginApi } from "../services/authService";
import { useRouter } from "next/navigation";
import Toast from "../dashboard/components/toast";

const Login = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });

    const onSubmit = async (data) => {  
        console.log(data, 'form data');
        setLoading(true);
        try {
            const response = await loginApi('/login', data); 
            localStorage.setItem('authToken', response.token);
            setTimeout(() => router.push('/dashboard'), 100)
            setToast({ message: 'Login successfully!', type: 'success', visible: true });
            reset();
        } catch (err) {
            setError(err.response?.data?.error || err.error); 
        } finally {
            setLoading(false);
        }  
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
          router.push('/dashboard');
        }
    }, [router]);


    return (
        <Div className="flex items-center justify-center bg-gray-200 min-h-screen">
            {toast.visible && (
                <Toast 
                message={toast.message} 
                type={toast.type} 
                duration={3000} 
                onClose={() => setToast({ ...toast, visible: false })} 
                />
            )}
            <Div className="w-full">
                <Div className="bg-white shadow-sm mx-auto max-w-md p-5">
                    <Div className="mb-5">
                        <h2>Welcome Back !</h2>
                        <p>Sign in to continue to Velzon.</p>
                    </Div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Div className="mb-5">
                            <input type="email" className="appearance-none bg-white border border-gray-300 rounded text-gray-800 block text-sm font-normal leading-relaxed outline-none px-3 py-2 w-full" placeholder="username" {...register("email", { required: true })} />
                           {errors.email && <Div className="text-[13px] text-[#ff3c3c] mt-[5px] leading-none">Please enter your emailId</Div>}
                        </Div>
                        <Div className="mb-5">
                            <input type="password" className="appearance-none bg-white border border-gray-300 rounded text-gray-800 block text-sm font-normal leading-relaxed outline-none px-3 py-2 w-full" placeholder="password input" {...register("password", { required: true })} />
                            {errors.password && <Div className="text-[13px] text-[#ff3c3c] mt-[5px] leading-none">Please enter your password</Div>}
                        </Div>
                        <Div className="block">
                            <button type="submit" disabled={loading} className={`bg-green-400 border border-green-400 rounded text-white cursor-pointer block text-base font-semibold outline-none p-2.5 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>{loading ? 'Loading...' : 'Sign In'}</button>
                            {error && <Div className="text-[13px] text-[#ff3c3c] mt-[10px] leading-none">{error}</Div>}
                        </Div>
                    </form>
                </Div>
            </Div>
        </Div>
    );
}

export default Login;