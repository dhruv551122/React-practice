import * as yup from 'yup'
    const users = JSON.parse(localStorage.getItem('users')!) || []

export const validationSchemaForLogin = yup.object({
    email: yup.string().email('Enter valid Email').test('checking email registered or not', 'Cannot find user with this email', (value) => {
        console.log(users)
        const userExist = users.find(user => user.email === value)
        if (userExist) {
            return true
        } else {
            return false
        }
    }).required('Required'),
    password: yup.string().test('checking password is correct or not', 'Password is wrong for this email', (value) => {
        const user = users.find(user => user.email === yup.ref('email'))
        const passwordIsCorrect = user.password === value
        if (passwordIsCorrect) {
            return true
        } else {
            return false
        }
    }).required('Required')
})