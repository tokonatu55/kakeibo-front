'use client';
import { useRouter } from 'next/navigation';
import { addKakeibo } from '@/lib/api';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async () => {
  await addKakeibo({
    title,
    price: Number(price),
    note,
    targetDate: new Date().toISOString().slice(0, 10)  // "2025-07-19" 形式
  });
  router.push('/list');
};

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="text-2xl font-bold">新規登録</div>
        <Input placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="金額" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Input placeholder="備考" value={note} onChange={(e) => setNote(e.target.value)} />
        <Button onClick={handleSubmit}>登録</Button>
      </div>
    </div>
  );
}
