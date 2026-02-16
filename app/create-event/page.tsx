"use client";

import { useState } from "react";

export default function CreateEventPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert agenda (newline separated) → JSON string
    const agendaText = formData.get("agenda") as string;
    const agendaArray = agendaText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    // Convert tags (comma separated) → JSON string
    const tagsText = formData.get("tags") as string;
    const tagsArray = tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    // IMPORTANT: Replace with JSON strings
    formData.set("agenda", JSON.stringify(agendaArray));
    formData.set("tags", JSON.stringify(tagsArray));

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage("Event created successfully.");
      form.reset();
      setPreview(null);
    } catch (err: any) {
      setMessage(err.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Create Event
        </h1>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <Input name="title" placeholder="Title" required />
          <Textarea name="description" placeholder="Short Description" required />
          <Textarea name="overview" placeholder="Overview" required />

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Event Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-600 file:text-white
                hover:file:bg-indigo-700
                cursor-pointer"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 rounded-xl w-full max-h-64 object-cover"
              />
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input name="venue" placeholder="Venue" required />
            <Input name="location" placeholder="Location" required />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input type="date" name="date" required />
            <Input type="time" name="time" required />
          </div>

          <Input
            name="mode"
            placeholder="Mode (Hybrid / Online / In-Person)"
            required
          />

          <Input
            name="audience"
            placeholder="Target Audience"
            required
          />

          <Textarea
            name="agenda"
            placeholder="Agenda (one per line)"
            rows={6}
            required
          />

          <Textarea
            name="organizer"
            placeholder="Organizer Description"
            required
          />

          <Input
            name="tags"
            placeholder="Tags (comma separated)"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-lg disabled:opacity-50"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-sm text-gray-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
      focus:outline-none focus:ring-2 focus:ring-indigo-500
      placeholder-gray-400"
    />
  );
}

function Textarea(props: any) {
  return (
    <textarea
      {...props}
      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
      focus:outline-none focus:ring-2 focus:ring-indigo-500
      placeholder-gray-400 resize-none"
    />
  );
}