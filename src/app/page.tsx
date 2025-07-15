
export default function Page() {
  const userName = 'TORIDA';
  return (
    <div>
      <h1 className="text-2xl font-bold">kakibo-app</h1>
      <p className="mt-4">今月の支出合計: ¥10,000</p> {/* 仮データ */}
      {userName}
    </div>
  );
}