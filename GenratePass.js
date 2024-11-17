export function randomPass(){
    const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let password = '';
const passwordLength = 8;

for (let i = 0; i < passwordLength; i++) {
    // Get a random character from str and add it to the password
    const randomIndex = Math.floor(Math.random() * str.length);
    password += str[randomIndex];

}
return password;
}