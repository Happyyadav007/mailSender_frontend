import { useState, useEffect } from "react";
import API_BASE_URL from "./config";

function App() {
    const loadSavedTemplates = () => {
        return JSON.parse(localStorage.getItem("savedTemplates")) || [
            { subject: "Application for Web Developer Intern", body: "Dear Sir/Ma'am, \n\n I am writing to express my interest in the position of web developer intern as advertised recently. My qualifications, skills, and experience align closely with your requirements for this role. \n\n Please find my CV and supporting documents attached for your review. I would be delighted to discuss how I can contribute to your team and look forward to hearing from you soon about this exciting opportunity. \n\nBest Regards, \n\nHappy Yadav,\n\n8299007827\n\nhappy.yadav.contact@gmail.com" },
        ];
    };

    const [formdata, setFormdata] = useState({ email: "", subject: "", body: "" });
    const [savedTemplates, setSavedTemplates] = useState(loadSavedTemplates);
    const [newTemplate, setNewTemplate] = useState({ subject: "", body: "" });

    useEffect(() => {
        localStorage.setItem("savedTemplates", JSON.stringify(savedTemplates));
    }, [savedTemplates]);

    // Handle input changes
    function changeHandler(event) {
        const { name, value } = event.target;
        setFormdata(prev => ({ ...prev, [name]: value }));
    }

    // Select a saved template
    const handleTemplateSelect = (event) => {
        const selectedIndex = event.target.value;
        if (selectedIndex !== "") {
            const selectedTemplate = savedTemplates[selectedIndex];
            setFormdata(prev => ({
                ...prev,
                subject: selectedTemplate.subject,
                body: selectedTemplate.body
            }));
        }
    };

    // Add a new template
    const addNewTemplate = () => {
        if (newTemplate.subject.trim() && newTemplate.body.trim()) {
            setSavedTemplates(prev => [...prev, newTemplate]);
            setNewTemplate({ subject: "", body: "" });
        }
    };

    // Send email function
    const sendEmail = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata)
            });

            if (response.ok) {
                alert("Email sent successfully!");
            } else {
                alert("Failed to send email");
            }
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Send an Email</h2>

                {/* Email Input */}
                <label className="block text-sm font-medium text-gray-600">Recipient Email</label>
                <input
                    type="email"
                    placeholder="Enter recipient email"
                    name="email"
                    value={formdata.email}
                    onChange={changeHandler}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {/* Select Template */}
                <label className="block text-sm font-medium text-gray-600 mt-4">Select a Template</label>
                <select
                    onChange={handleTemplateSelect}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="">-- Choose a Template --</option>
                    {savedTemplates.map((template, index) => (
                        <option key={index} value={index}>
                            {template.subject}
                        </option>
                    ))}
                </select>

                {/* Subject Input */}
                <label className="block text-sm font-medium text-gray-600 mt-4">Subject</label>
                <input
                    type="text"
                    name="subject"
                    placeholder="Enter subject"
                    value={formdata.subject}
                    onChange={changeHandler}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {/* Message Input */}
                <label className="block text-sm font-medium text-gray-600 mt-4">Message</label>
                <textarea
                    name="body"
                    placeholder="Enter message"
                    value={formdata.body}
                    onChange={changeHandler}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                />

                {/* Add New Template */}
                <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Save New Template</h3>
                    <input
                        type="text"
                        placeholder="Template Subject"
                        value={newTemplate.subject}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <textarea
                        placeholder="Template Message"
                        value={newTemplate.body}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, body: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                    />
                    <button
                        onClick={addNewTemplate}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 mt-2 rounded-lg transition-all duration-300"
                    >
                        Save Template
                    </button>
                </div>

                {/* Send Email Button */}
                <button
                    onClick={sendEmail}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-4 rounded-lg transition-all duration-300"
                >
                    Send Email
                </button>
            </div>
        </div>
    );
}

export default App;
