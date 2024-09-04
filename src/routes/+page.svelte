<script>
	const { data } = $props();

	const { userProfile } = data;

	$inspect(data.userProfile);
</script>

<h1>Welcome to Supabase!</h1>

{#if userProfile}
	<p>You are logged in as {userProfile.email}</p>
	<a href="/auth/logout">Logout</a>
{:else}
	<a href="/auth/login">Login</a>
{/if}
