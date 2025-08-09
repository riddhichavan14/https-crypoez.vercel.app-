import React from "react";

const events = [
  {
    id: 1,
    title: "Blockchain Hackathon 2025",
    banner: "https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg",
    time: "August 15, 2025, 10:00 AM - 6:00 PM",
    where: "IIT Delhi, Seminar Hall",
    who: "Organized by Web3India & Polygon Labs",
    eventLink: "https://blockhack2025.com",
    registerLink: "https://blockhack2025.com/register",
  },
  {
    id: 2,
    title: "AI & ML for analysis of Crypto Summit",
    banner: "https://images.pexels.com/photos/29253461/pexels-photo-29253461.jpeg",
    time: "September 5, 2025, 9:00 AM - 5:00 PM",
    where: "Bangalore Tech Park",
    who: "Hosted by Google AI & OpenAI",
    eventLink: "https://aimlsummit.com",
    registerLink: "https://aimlsummit.com/register",
  },
];

export default function Eventpage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Upcoming Events</h1>
      <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
        {events.slice(0, 2).map((event) => (
          <div key={event.id} className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <img src={event.banner} alt={event.title} className="w-full h-64 object-cover" />
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
              <p><strong>🕒 Time:</strong> {event.time}</p>
              <p><strong>📍 Where:</strong> {event.where}</p>
              <p><strong>👥 Who:</strong> {event.who}</p>
              <div className="flex gap-4 mt-4">
                <a
                  href={event.eventLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Visit Event Page
                </a>
                <a
                  href={event.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
