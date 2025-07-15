import '@/app/globals.css';
import { Sidebar } from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="flex">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </body>
    </html>
  );
}
