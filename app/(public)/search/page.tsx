// 'use client';

// import { useState } from 'react';
// import SearchBar from '@/components/SearchBAr';
// import InfluencerCard from '@/components/InfluencerCard';

// export default function SearchPage() {
//   const [influencers, setInfluencers] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const handleSearch = async (city: string, minFollowers: number) => {
//     setError(null);
//     try {
//       const res = await fetch(`/api/influencers?city=${encodeURIComponent(city)}&minFollowers=${minFollowers}`);
//       if (!res.ok) throw new Error('Failed to fetch data');
//       const data = await res.json();
//       if (!Array.isArray(data.influencers)) {
//         throw new Error('Invalid data format');
//       }
//       setInfluencers(data.influencers);
//     } catch (err) {
//       setError('Error fetching influencers. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Search Influencers</h1>
//       <SearchBar onSearch={handleSearch} />
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {influencers.map((inf) => (
//           <InfluencerCard
//             key={inf.username}
//             username={inf.username}
//             followers={inf.follower_count || 0}
//             engagement={inf.engagement_rate || 0}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }