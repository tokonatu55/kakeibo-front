import { Kakeibo } from '@/types/kakeibo';

const API_BASE = 'https://your-api-server/api/v1/kakeiboes';

export async function fetchKakeibo(month: string) {
  const res = await fetch(`http://localhost:8080/api/v1/kakeiboes/${month}`);
  //console.log(await res.json());
  return res.json();
}

export async function createKakeibo(data: Partial<Kakeibo>) {
  return fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateKakeibo(id: number, data: Partial<Kakeibo>) {
  return fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteKakeibo(id: number) {
  return fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
}
