<script>
	import { enhance } from '$app/forms';
</script>

<div
	class="
      relative flex flex-col items-center justify-center h-screen
  "
>
	<div class="bg-stone-50 text-stone-950 py-12 px-8 flex flex-col gap-4">
		<div class="flex flex-col items-center justify-center gap-4">
			<img src="/icons/logo.png" alt="logo" />
			<h1 class="text-3xl font-body font-bold">login</h1>
		</div>
		<div class="flex flex-col font-body self-center items-center">
			<form action="?/login" method="POST" use:enhance class="flex flex-col gap-8 text-xl">
				<div class="flex flex-col gap-4">
					<label class="flex flex-col items-start justify-center">
						username:
						<input
							type="text"
							name="username"
							placeholder="enter username"
							class="bg-stone-50 border-2 border-stone-400 rounded-md px-2
                          focus:outline-stone-700"
						/>
					</label>
					<label class="flex flex-col items-start justify-center">
						password:
						<input
							type="password"
							name="password"
							placeholder="enter password"
							class="bg-stone-50 border-2 border-stone-400 rounded-md px-2
                          focus:outline-stone-700"
						/>
					</label>
				</div>
				<input
					type="submit"
					value="login"
					class="font-body w-2/3 self-center hover:bg-stone-700 cursor-pointer rounded-full bg-stone-950 text-stone-50 text-md"
				/>
			</form>
			<a href="/auth/login/github">Login with github</a>
		</div>
	</div>
</div>
