'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { fetchKakeiboList } from '@/lib/api';
import { KakeiboResponse } from '@/types/kakeiboResponse';

// カテゴリ名をハッシュ化して色を作る関数
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}

export default function Page() {
  const [total, setTotal] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const now = new Date();
      const month = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
      try {
        const data = await fetchKakeiboList(month);
        const records = data.kakeiboResponses;

        // 合計金額
        const totalSum = records.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalSum);

        // カテゴリ別集計（titleごとにまとめる例）
        const map = new Map<string, number>();
        records.forEach((item: KakeiboResponse) => {
          const key = item.title || 'その他';
          map.set(key, (map.get(key) || 0) + item.price);
        });

        const chart = Array.from(map.entries()).map(([name, value]) => ({ name, value }));
        setChartData(chart);
      } catch (error) {
        console.error('支出合計またはグラフデータの取得に失敗しました', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">トップ</h1>
      <p className="mt-4 text-4xl underline decoration-double underline-offset-8">
        今月の支出合計: {total !== null ? `¥${total.toLocaleString()}` : '読み込み中...'}
      </p>

      {chartData.length > 0 && (
        <div className="mt-8 flex justify-center items-center" style={{ height: 700 }}>
          <h2 className="text-xl font-semibold mb-4">カテゴリ別支出</h2>
          <PieChart width={800} height={700}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={300}
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={stringToColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
}
