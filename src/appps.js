import { useState } from 'react';

function App() {
    const [formdata, setFormdata] = useState({email:'', subject:'', body:''});

    function changeHandler(event){
      const {name, value} = event.target;
      setFormdata(prev =>({
        ...prev,
        [name]: value
      }));
    }

    const sendEmail = async () => {
      try {
          const response = await fetch('http://localhost:5000/api/v1/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
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
          
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
              type="email"
              placeholder="Enter recipient email"
              name="email"
              value={formdata.email}
              onChange={changeHandler}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="block text-sm font-medium text-gray-600 mt-4">Subject</label>
          <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              value={formdata.subject}
              onChange={changeHandler}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="block text-sm font-medium text-gray-600 mt-4">Message</label>
          <textarea
              name="body"
              placeholder="Enter message"
              value={formdata.body}
              onChange={changeHandler}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
          />

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
