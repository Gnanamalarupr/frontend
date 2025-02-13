import React, { useState } from "react";
import "../styles/LoginPage.css";
export default function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (
            (email === "gnanamalarpalanisamy@gmailcom" && password === "9861" && username === "malar") ||
            (email === "malar@gmail.com" && password === "98" && username === "malar")
        ) {
            onLogin(username); 
        } else {
            alert("Incorrect email or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h3>Login Page</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
