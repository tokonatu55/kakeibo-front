'use client';
import { useEffect, useState } from 'react';
import { fetchKakeiboList } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { KakeiboResponse } from '@/types/kakeiboResponse';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [month, setMonth] = useState(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  return `${year}${month}`;  // 例: '202507'
  });
  const [data, setData] = useState<KakeiboResponse[]>([]);

  useEffect(() => {
    fetchKakeiboList(month).then(json => {
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
        <thead>
          <tr>
            <th>タイトル</th>
            <th>金額</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr
              key={item.kakeiboId}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/edit/${item.kakeiboId}`)}
            >
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.note}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
