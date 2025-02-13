import React, { useState } from "react";
import "./App.css";
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [marks, setMarks] = useState({
        sub1: 0, sub2: 0, sub3: 0, sub4: 0, sub5: 0
    });

    const handleLogin = () => {
        if (email === "gnanamalarpalanisamy@gmailcom" && password === "9861" && username === "malar") {
            setIsLoggedIn(true);
            localStorage.setItem("username", username);
        } else {
            alert(" Incorrect email, password, or username!");
        }
    };

    const handleMarksSubmit = async () => {
        try {
            const res = await fetch("http://localhost:7000/add-marks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    student_id: username,
                    sub1: marks.sub1, sub2: marks.sub2, sub3: marks.sub3,
                    sub4: marks.sub4, sub5: marks.sub5
                }),
            });

            if (!res.ok) throw new Error("HTTP error");

            alert("✅ Marks added successfully!");
        } catch (err) {
            console.error("❌ Error:", err);
            alert("❌ Failed to add marks!");
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="login-container">
                <h2>Login</h2>
                <div className="login-box">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <button onClick={handleLogin} className="login-button">Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="table-container">
            <h2>Student Marks Table</h2>
            <p><strong>Student ID:</strong> {username}</p>

            <table className="student-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(marks).map((subject, index) => (
                        <tr key={index}>
                            <td>{subject.toUpperCase()}</td>
                            <td>
                                <input 
                                    type="number" 
                                    placeholder={`Enter ${subject}`} 
                                    value={marks[subject]} 
                                    onChange={(e) => setMarks({ ...marks, [subject]: Number(e.target.value) })}
                                    className="marks-input"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleMarksSubmit} className="submit-button">Submit Marks</button>
        </div>
    );
}
