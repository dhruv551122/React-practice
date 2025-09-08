import * as yup from 'yup'

export const validationSchema = yup.object({
        fullName: yup
            .string()
            .min(3, "Atleast 3 character long")
            .required("Required"),
        email: yup.string().email("Enter valid email").required("Required"),
        password: yup
            .string()
            .min(6, "Atleast 6 characters long")
            .test(
                'password check',
                "Must include one uppercase latter and one number",
                (value) => {
                    const hasUpperCase = /[A-Z]/.test(value!);
                    const hasNumber = /[0-9]/.test(value!);
                    if (hasNumber && hasUpperCase) {
                        return true;
                    } else {
                        return false;
                    }
                }
            )
            .required("Required"),
        cPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Password must match")
            .required("Required"),
        phoneNo: yup
            .string()
            .test("Must be digit", (value) => {
                const isDigit = /^\d+$/.test(value!);
                if (isDigit) {
                    return true;
                } else {
                    return false;
                }
            })
            .min(10, "Must be 10 digit long")
            .max(10, "Must be 10 digit long")
            .required("Required"),
        expectedSalary: yup
            .number()
            .min(5000, "Minimum amount is 5000")
            .required("Required"),
        gender: yup
            .string()
            .oneOf(["male", "female", "other"], "Select a gender")
            .required("Required"),
        skills: yup
            .array()
            .of(yup.string())
            .min(1, "Atleast select one skill"),

        country: yup.string().required("Required"),
        state: yup.string().required("Required, first select country then state"),
        city: yup.string().required("Required, first select state then city"),
        dob: yup
            .date()
            .required("Required")
            .test("18 years check", "Must be 18 years old", (value) => {
                const today = new Date();
                let age: number = today.getFullYear() - value.getFullYear();
                const m: number = today.getMonth() - value.getMonth();
                console.log(value.getDate())
                console.log(today.getDate())
                if (m < 0 || (m === 0 && value.getDate() >= today.getDate())) {
                    age--;
                }
                return age >= 18;
            }),
        joiningDate: yup
            .date()
            .min(new Date(), "Must be a future date")
            .required("Required"),
        dateRangeStart: yup.date().required('Required'),
        dateRangeEnd: yup.date().min(yup.ref("dateRangeStart"), 'To date must be after from date').required('Required'),
        coverLetter: yup
            .string()
            .min(50, "Minimum 50 characters required")
            .required('Required'),
        resume: yup
            .mixed()
            .required("Required")
            .test("fileType", "File type must be pdf", (value) => {
                if (!value) return false;
                console.log(typeof value)
                if (value instanceof File) {
                    console.log(value.type)
                    return value.type === "application/pdf";
                } else if (typeof value === 'string') {
                    const extention = value.split('.')
                    return extention[extention.length - 1] === 'pdf'
                }
                return false;
            }),
        conditionAcceptance: yup
            .boolean()
            .oneOf([true], "Have to accept terms & conditions")
            .required("Have to accept terms & conditions"),
    } )
