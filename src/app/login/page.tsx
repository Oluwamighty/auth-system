'use client'
import { signIn } from "next-auth/react";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
// inside your submit handler
        const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false, // 👈 handle redirect manually
        });

        if (result?.error) {
        setError("Invalid email or password");
        } else {
        router.push("/dashboard");
        }
    }
    return (
        <main className="min-h-screen bg-gray-200 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Login to <span className="text-blue-500">your dasbboard</span>
            </h1>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-400 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-gray-400 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="you@example.com"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-400 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-800 text-gray-400 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                    />
                </div>
                 <p className="text-red-500 mb-4">{error}</p>
                <button
                    type="submit"   
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                    Sign In
                </button>

                              <p className="pt-10">
                    Don't have an account?
                    <span className="pl-5">
                        <Link
                        href="/register"
                        className="border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white px-6 py-3 rounded-lg transition-colors"
                        >
                        Register Here
                        </Link>
                    </span>

                </p>
            </form>
        </main>
    )
}