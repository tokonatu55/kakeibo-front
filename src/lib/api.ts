import { KakeiboResponse } from "@/types/kakeiboResponse";
import { KakeiboResponseList } from "@/types/kakeiboResponseList";

const API_BASE = 'https://your-api-server/api/v1/kakeiboes';

export async function fetchKakeiboList(month: string) {
  const res = await fetch(`http://localhost:8080/api/v1/kakeiboes/${month}`);
  return res.json() as Promise<KakeiboResponseList>;
}

export async function addKakeibo(data: Partial<KakeiboResponse>) {
  return fetch(`http://localhost:8080/api/v1/kakeibo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateKakeibo(id: number, data: Partial<KakeiboResponse>) {
  return fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteKakeibo(id: number) {
  return fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
}

export async function fetchKakeiboDetail(id: number) {
  const res = await fetch(`http://localhost:8080/api/v1/kakeibo/${id}`);
  return res.json() as Promise<KakeiboResponse>;
}