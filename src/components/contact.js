import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="p-8 bg-white text-gray-900">
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="name">Name:</label>
          <input type="text" id="name" className="w-full border-2 border-gray-300 p-2 rounded-md" />
        </div>
        <div>
          <label className="block mb-1" htmlFor="email">Email:</label>
          <input type="email" id="email" className="w-full border-2 border-gray-300 p-2 rounded-md" />
        </div>
        <div>
          <label className="block mb-1" htmlFor="message">Message:</label>
          <textarea id="message" className="w-full border-2 border-gray-300 p-2 rounded-md"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Send</button>
      </form>
    </section>
  );
}

export default Contact;

