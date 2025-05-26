'use client'; // Optional, as it’s a presentational component, but included for consistency

export interface Influencer {
  username: string;
  follower_count: number;
  location: string;
  engagement_rate: number;
}

export default function InfluencerCard({
  username,
  followers,
  engagement,
}: {
  username: string;
  followers: number;
  engagement: number;
}) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-lg font-bold text-gray-800">{username}</h2>
      <p className="text-gray-600">Followers: {followers.toLocaleString()}</p>
      <p className="text-gray-600">Engagement: {engagement.toFixed(1)}%</p>
    </div>
  );
}