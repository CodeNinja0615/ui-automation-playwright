import login_creds from "./test-data/login_user_data.json" with {type: 'json'}

for (const cred of Object.values(login_creds)) {
    if (cred.username === 'sameerakhtar1516') {
        console.log(cred.password);
    }
}
for (const cred in login_creds) {
    if (login_creds[cred].username === 'sameerakhtar1516') {
        console.log(login_creds[cred].password);
    }
}