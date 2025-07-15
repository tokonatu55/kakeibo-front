'use client';
import { useRouter } from 'next/navigation';
import { createKakeibo } from '@/lib/api';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async () => {
    await createKakeibo({ title, amount: Number(amount), note });
    router.push('/list');
  };

  return (
    <div className="space-y-4">
      <Input placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="金額" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Input placeholder="備考" value={note} onChange={(e) => setNote(e.target.value)} />
      <Button onClick={handleSubmit}>登録</Button>
    </div>
  );
}
