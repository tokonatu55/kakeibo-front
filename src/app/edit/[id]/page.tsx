'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchKakeiboDetail, deleteKakeibo, updateKakeibo } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [initialTitle, setInitialTitle] = useState('');
  const [initialPrice, setInitialPrice] = useState('');
  const [initialNote, setInitialNote] = useState('');

  useEffect(() => {
    const getData = async () => {
      if (!id) return;
      try {
        const data = await fetchKakeiboDetail(Number(id));
        setTitle(data.title);
        setPrice(String(data.price));
        setNote(data.note);
        setInitialTitle(data.title);
        setInitialPrice(String(data.price));
        setInitialNote(data.note);
      } catch (err) {
        console.error('データ取得失敗:', err);
      }
    };
    getData();
  }, [id]);

  const handleUpdate = async () => {
    const updateData: any = {};
    if (title !== initialTitle) updateData.title = title;
    if (price !== initialPrice) updateData.price = Number(price);
    if (note !== initialNote) updateData.note = note;

    await updateKakeibo(Number(id), updateData);
    router.push('/list');
  };

  const handleDelete = async () => {
    if (confirm('本当に削除しますか？')) {
      await deleteKakeibo(Number(id));
      router.push('/list');
    }
  };

  return (
    <div className="space-y-4 max-w-wl mx-suto mt-6">
      {/* タイトル */}
      <div className="flex items-center">
        <label className="w-20 text-gray-700">タイトル</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* 金額 */}
      <div className="flex items-center">
        <label className="w-20 text-gray-700">金額</label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* 備考 */}
      <div className="flex items-center">
        <label className="w-20 text-gray-700">備考</label>
        <Input value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      {/* ボタン */}
      <div className="flex space-x-2 pt-4">
        <Button onClick={handleUpdate} className="bg-black text-white">更新</Button>
        <Button variant="destructive" onClick={handleDelete}>削除</Button>
        <Button variant="outline" onClick={() => {
          if (confirm('戻りますか？未保存の変更は失われます')) router.push('/list');
        }}>戻る</Button>
      </div>
    </div>
  );
}
