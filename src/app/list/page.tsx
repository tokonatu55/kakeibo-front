'use client';
import { useEffect, useState } from 'react';
import { fetchKakeibo } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { KakeiboResponse } from '@/types/kakeiboResponse';

export default function Page() {
  const [month, setMonth] = useState('202507');
  const [data, setData] = useState<KakeiboResponse[]>([]);

  useEffect(() => {
    fetchKakeibo(month).then(json => {
      setData(json.kakeiboResponses);
    });
  }, [month]);
  
  return (
    <div>
      <h1 className="text-xl font-bold">家計簿一覧（{month}）</h1>
      <div className="my-4 space-x-2">
        <Button onClick={() => setMonth(prev => `${+prev - 1}`)}>前の月</Button>
        <Button onClick={() => setMonth(prev => `${+prev + 1}`)}>次の月</Button>
      </div>
      <table className="w-full border">
        <thead><tr><th>タイトル</th><th>金額</th><th>備考</th></tr></thead>
        <tbody>
          {data.map(item => (
            <tr key={item.kakeibo_id}>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.target_date}</td>
              <td>{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
