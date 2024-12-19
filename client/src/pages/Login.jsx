import { Input } from "@nextui-org/input";
import {Button } from "@nextui-org/button";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../components/EyeFilledIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email.length === 0 || password.length === 0) {
            setError('Email and password are mandatory fields');
            return;
        }

        const response = await fetch(`${import.meta.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const json = await response.json();

        if (!json.success) {
            setError(json.message)
        } else {
            localStorage.setItem('token', json.data);
            navigate('/')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input label="Email"
                    placeholder="Enter your email"
                    type="email"
                    isRequired
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <br /><br />
                <Input
                    className="max-w-xs"
                    endContent={
                        <Button color="primary"
                            aria-label="toggle password visibility"
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </Button>
                    }
                    label="Password"
                    placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    isRequired
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />
                <Button color="primary">Login</Button>
                <br />
                {error.length > 0 && <span>{error}</span>}
            </form>
        </div>
    )
}

export default Login;