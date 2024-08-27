import Form from "../components/Form";


function Register() {
    // Form component e route and method props pass kore dichi
    // Same form ta abar use kora hoyeche, just route change kore
    return (
        <Form route="/api/user/register/" method="register" />
    );
}

export default Register;