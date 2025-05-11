/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';

interface dataRowsProps {
  keys: [string];
  clicks: number;
  ctr: number;
  impressions: number;
  position: number
}

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetching the data and refresh token from the backend API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/search-console');
        console.log(response.data.data);
        setData(response.data.data); // Set the GSC data
      } catch (err: any) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='flex items-center justify-center h-auto py-10 flex-col'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2 className='text-center text-2xl font-bold'>SEO Scientist Performance Data</h2>
      <div className={`${loading ? "py-5" : "py-0"}`}>
        {loading && <Loader title='Fetching...' />}
      </div>
      {data && (
        <div className='py-5'>
          <div className="overflow-x-auto rounded-lg shadow-md p-5">
            <table className="min-w-full table-auto divide-y divide-gray-200 text-sm text-left text-gray-800">
              <thead className="bg-gray-100">
                <tr className='border-t border-gray-300'>
                  <th className="px-6 py-3 font-semibold tracking-wide border-r border-gray-300 ">Date</th>
                  <th className="px-6 py-3 font-semibold tracking-wide border-r border-gray-300">Position</th>
                  <th className="px-6 py-3 font-semibold tracking-wide border-r border-gray-300">Traffic</th>
                  <th className="px-6 py-3 font-semibold tracking-wide border-r border-gray-300">Impressions</th>
                  <th className="px-6 py-3 font-semibold tracking-wide border-r border-gray-300">Clicks</th>
                  <th className="px-6 py-3 font-semibold tracking-wide border-r border-gray-300">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {
                  data.rows?.map(({ keys, clicks, ctr, impressions, position }: dataRowsProps) => {
                    return (
                      <tr key={Math.floor(Math.random() * 10000 + 1)}>
                        <td className="px-6 py-4 text-center border-r border-gray-200">{keys[0]}</td>
                        <td className="px-6 py-4 text-center border-r border-gray-200">{position.toFixed(2)}</td>
                        <td className="px-6 py-4 text-center border-r border-gray-200">{0}</td>
                        <td className="px-6 py-4 text-center border-r border-gray-200">{impressions}</td>
                        <td className="px-6 py-4 text-center border-r border-gray-200">{clicks}</td>
                        <td className="px-6 py-4 text-center border-r border-gray-200">{ctr.toFixed(2)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      )
      }
    </section >
  );
};

export default Home;
