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

  function addMonth(month: string, diff: number): string {
  const year = parseInt(month.slice(0, 4), 10);
  const mon = parseInt(month.slice(4), 10) - 1;
  const date = new Date(year, mon + diff);
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${y}${m}`;
  }

  useEffect(() => {
    fetchKakeiboList(month).then(json => {
      setData(json.kakeiboResponses);
    });
  }, [month]);

 return (
    <div className="p-4">
      <h1 className="text-2xl font-bold "> 一覧（{month}）</h1>
      <div className="my-4 space-x-2">
        <Button onClick={() => setMonth(prev => addMonth(prev, -1))}>前の月</Button>
        <Button onClick={() => setMonth(prev => addMonth(prev, 1))}>次の月</Button>
      </div>

      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr>
          <th className="border border-gray-300 w-1/4 bg-green-100">タイトル</th>
          <th className="border border-gray-300 w-1/4 bg-green-100">金額</th>
          <th className="border border-gray-300 w-1/4 bg-green-100">日付</th>
          <th className="border border-gray-300 w-1/4 bg-green-100">備考</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            const date =  new Date(item.targetDate)
            const dateString = date.toLocaleString('ja-JP', {
              timeZone: 'Asia/Tokyo',
            })
            return (
            <tr
            key={item.kakeiboId}
            className="cursor-pointer text-center"
            onClick={() => router.push(`/edit/${item.kakeiboId}`)}
            >
            <td className="border border-gray-300 w-1/4">{item.title}</td>
            <td className="border border-gray-300 w-1/4">{item.price.toLocaleString()}円</td>
            <td className="border border-gray-300 w-1/4">{dateString.split(" ")[0]}</td>
            <td className="border border-gray-300 w-1/4">{item.note}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
