import { useState } from "react";
import { redirect } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import Image, { ImageProps } from "next/image";
import { getProviders, signIn } from "next-auth/react";

// serversideprops not supported in appdir

// export async function getServerSideProps(context) {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }

const providers = getProviders();

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const Router = useRouter();

	const handleSignUp = (e: any) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		fetch("http://localhost:3000/api/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: formData.get("username"),
				password: formData.get("password"),
			}),
		})
			.then((res) => res.json())
			.then((userData) => {
				if (userData.error) {
					setError("Invalid username or password. Please try again.");
				} else {
					const user = {
						userId: userData.user_id,
						username: userData.username,
					};
					localStorage.setItem("user", JSON.stringify(user));
					Router.push("/");
				}
			});
	};

	return (
		<div>
			<div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					{/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=200"
            alt="Your Company"
          /> */}
					<Image
						src='/whatsnext.png'
						alt='whatsnext'
						width={200}
						height={200}
						className='mx-auto h-20 w-auto'
					/>
					<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
						Create an Account
					</h2>
				</div>
				<form
					className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
					onSubmit={handleSignUp}
				>
					<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
						<div className='space-y-6'>
							<div>
								<label
									htmlFor='username'
									className='block text-sm font-medium text-gray-700'
								>
									Username
								</label>
								<div className='mt-1'>
									<input
										id='username'
										name='username'
										type='username'
										autoComplete='username'
										required
										className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor='password'
									className='block text-sm font-medium text-gray-700'
								>
									Password
								</label>
								<div className='mt-1'>
									<input
										id='password'
										name='password'
										type='password'
										autoComplete='current-password'
										required
										className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									/>
								</div>
							</div>

							<div className='text-red-500 text-sm font-medium'>{error}</div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
							>
								Sign Up
							</button>
						</div>

						<div className='mt-6'>
							<div className='relative'>
								<div className='absolute inset-0 flex items-center'>
									<div className='w-full border-t border-gray-300' />
								</div>
								<div className='relative flex justify-center text-sm'>
									<span className='bg-white px-2 text-gray-500'>
										Or continue with
									</span>
								</div>
							</div>

							<div className='mt-6 grid grid-cols-3 gap-3'>
								{Object.values(providers).map((provider: any) => (
									<div key={provider.name}>
										<button onClick={() => signIn(provider.id)}>
											{provider.name}
										</button>
									</div>
								))}
								<div
									onClick={() =>
										signIn("facebook", {
											callbackUrl: "http://localhost:3000/",
										})
									}
								>
									<a
										href='#'
										className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
									>
										<span className='sr-only'>Sign in with Facebook</span>
										<svg
											className='h-5 w-5'
											aria-hidden='true'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path
												fillRule='evenodd'
												d='M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z'
												clipRule='evenodd'
											/>
										</svg>
									</a>
								</div>

								<div
									onClick={() =>
										signIn("google", { callbackUrl: "http://localhost:3000/" })
									}
								>
									<a
										href='#'
										className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
									>
										<span className='sr-only'>Sign in with Google</span>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											className='h-5 w-5'
											viewBox='0 0 18 18'
										>
											{" "}
											<path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />{" "}
										</svg>
									</a>
								</div>

								<div
									onClick={() =>
										signIn("github", { callbackUrl: "http://localhost:3000/" })
									}
								>
									<a
										href='#'
										className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
									>
										<span className='sr-only'>Sign in with GitHub</span>
										<svg
											className='h-5 w-5'
											aria-hidden='true'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path
												fillRule='evenodd'
												d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
												clipRule='evenodd'
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
