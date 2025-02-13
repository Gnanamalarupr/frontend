import React, { useState, useEffect } from "react";

export default function Addmarks() {
    const [student_id, setStudentId] = useState("");
    const [sub1, setSub1] = useState("");
    const [sub2, setSub2] = useState("");
    const [sub3, setSub3] = useState("");
    const [sub4, setSub4] = useState("");
    const [sub5, setSub5] = useState("");
    

    useEffect(() => {
        
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setStudentId(storedUsername); 
        }
    }, []);

    const handleSubmit = async () => {
        if (!student_id.trim()) {
            alert("Student ID is required!");
            return;
        }

        try {
            const res = await fetch("http://localhost:7000/add-marks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },


                body: JSON.stringify({
                    student_id: student_id.trim(), 
                    sub1: Number(sub1) || 0,
                    sub2: Number(sub2) || 0,
                    sub3: Number(sub3) || 0,
                    sub4: Number(sub4) || 0,
                    sub5: Number(sub5) || 0
                })
            });

            const data = await res.json();
            setMarks(data.marks)

            console.log(data);

            if (!res.ok) {
                throw new Error("HTTP error");
            }

            console.log("Marks added successfully!");
            alert("Marks added successfully!");

            
            setSub1("");
            setSub2("");
            setSub3("");
            setSub4("");
            setSub5("");

        } catch (err) {
            console.error("Error:", err);
            alert("Failed to add marks!");
        }
    };

    return (
        <div>
            <h3>Add Marks</h3>

            <div>
                <input 
                    type="text" 
                    placeholder="Student ID" 
                    value={student_id} 
                    readOnly 
                />
            </div>

            <div>
                <input 
                    type="number" 
                    placeholder="Enter mark 1" 
                    value={sub1} 
                    onChange={(e) => setSub1(e.target.value)}
                />
            </div>

            <div>
                <input 
                    type="number" 
                    placeholder="Enter mark 2" 
                    value={sub2} 
                    onChange={(e) => setSub2(e.target.value)}
                />
            </div>

            <div>
                <input 
                    type="number" 
                    placeholder="Enter mark 3" 
                    value={sub3} 
                    onChange={(e) => setSub3(e.target.value)}
                />
            </div>

            <div>
                <input 
                    type="number" 
                    placeholder="Enter mark 4" 
                    value={sub4} 
                    onChange={(e) => setSub4(e.target.value)}
                />
            </div>

            <div>
                <input 
                    type="number" 
                    placeholder="Enter mark 5" 
                    value={sub5} 
                    onChange={(e) => setSub5(e.target.value)}
                />
            </div>

            <button onClick={handleSubmit}>
                Submit
            </button>
        </div>

      
    );
}
