'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteKakeibo, updateKakeibo } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    // 初期データ fetch 例
    fetch(`/api/v1/kakeiboes/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setAmount(String(data.amount));
        setNote(data.note);
      });
  }, [id]);

  const handleUpdate = async () => {
    await updateKakeibo(Number(id), { title, amount: Number(amount), note });
    router.push('/list');
  };

  const handleDelete = async () => {
    if (confirm('本当に削除しますか？')) {
      await deleteKakeibo(Number(id));
      router.push('/list');
    }
  };

  return (
    <div className="space-y-4">
      <Input placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="金額" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Input placeholder="備考" value={note} onChange={(e) => setNote(e.target.value)} />
      <div className="space-x-2">
        <Button onClick={handleUpdate}>更新</Button>
        <Button variant="destructive" onClick={handleDelete}>削除</Button>
        <Button variant="outline" onClick={() => {
          if (confirm('戻りますか？未保存の変更は失われます')) router.push('/list');
        }}>戻る</Button>
      </div>
    </div>
  );
}
