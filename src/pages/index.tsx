import { CS2EloBadge } from '@/components/cs2-elo-badge';
import { apiGET } from '@/utils/apiUtils';
import Head from 'next/head'
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [lastUpdated, setLastUpdated] = useState('');
  const [ranks, setRanks] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    apiGET('ranks')
      .then((data: any) => {
        setRanks(data.eloPerRank);
        setLastUpdated(new Date(parseInt(data.timestamp)).toLocaleString());
        console.log(data);
      });
  }, []);

  const eloToText = (elo: number) => {
    return elo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <Head>
        <title>Where is Global Elite?</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h5 style={{marginTop: '10px'}}>Last updated: {lastUpdated}</h5>
      
      <div style={{marginTop: '20px'}}>
        <table style={{width: '100%'}}>
          <thead>
          </thead>
          <tbody>
            {Object.keys(ranks).map((rank, i) => (
              <tr key={i}>
                <td>{rank}</td>
                <td><CS2EloBadge eloText={eloToText(ranks[rank])} size={i == 0 ? 2 : 1}></CS2EloBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
