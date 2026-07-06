'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState({ nameError: "", emailError: "", passwordError: "", confirmPasswordError: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let hasError = false;
        const newError = { nameError: "", emailError: "", passwordError: "", confirmPasswordError: "" };

        if (!formData.name) {
            newError.nameError = "Name is required";
            hasError = true;
        }
        if (!formData.email) {
            newError.emailError = "Email is required";
            hasError = true;
        }
        if (!formData.password) {
            newError.passwordError = "Password is required";
            hasError = true;
        }
        if (formData.password !== formData.confirmPassword) {
            newError.confirmPasswordError = "Passwords do not match";
            hasError = true;
        }
        
        setError(newError); 
 
        if(hasError) return;

        alert("Registration successful! You will be redirected to login page soon...");
        
        router.push("/login");
    }
    return(
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Register <span className="text-blue-500">An Account</span>
            </h1>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-white font-bold mb-2 text-left">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        placeholder="John Doe"
                    />
                </div>
                    <p className="text-red-500 text-sm mb-4">{error.nameError}</p>
            
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white font-bold mb-2 text-left">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        placeholder="you@example.com"
                    />
                </div>
                <p className="text-red-500 text-sm mb-4">{error.emailError}</p>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-white font-bold mb-2 text-left">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        placeholder="••••••••"
                    />
                </div>
                    <p className="text-red-500 text-sm mb-4">{error.passwordError}</p>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-white font-bold mb-2 text-left">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        placeholder="••••••••"
                    />
                </div>
                    <p className="text-red-500 text-sm mb-4">{error.confirmPasswordError}</p>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Register
                </button>
                <p className="pt-10">
                    Created Account Already?
                    <span className="pl-5">
                        <Link
                        href="/login"
                        className="border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg transition-colors"
                        >
                        Login Here
                        </Link>
                    </span>

                </p>
            </form>
        </div>
        
    )
}