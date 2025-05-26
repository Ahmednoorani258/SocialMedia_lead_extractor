"use client";

import { useState } from "react";

type Post = {
  id: string;
  owner: {
    username: string;
    followers: number;
  };
  location: string;
  caption: string;
};

export default function SearchForm() {
  const [location, setLocation] = useState("");
  const [minFollowers, setMinFollowers] = useState(0);
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/hashtag?location=${location}&minFollowers=${minFollowers}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch results");
      }
      const data = await res.json();
      setResults(data);
    } catch (err) {
      if (err  instanceof Error){

        setError(err.message)
      }else{

        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 mr-2"
        aria-label="Location"
      />
      <input
        type="number"
        placeholder="Min Followers"
        value={minFollowers}
        onChange={(e) => setMinFollowers(Math.max(0, Number(e.target.value)))}
        className="border p-2 mr-2"
        aria-label="Minimum Followers"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2"
        disabled={loading}
        aria-label="Search Button"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4">
        {results.map((item) => (
          <div key={item.id} className="border p-2 mb-2">
            <p>
              <strong>User:</strong> {item.owner.username}
            </p>
            <p>
              <strong>Followers:</strong> {item.owner.followers}
            </p>
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Caption:</strong> {item.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
