export function loginUser(username: string, password: string) {
    return fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({

            username: username,
            password: password,
            expiresInMins: 30, // optional, defaults to 60
        }),
    });
}