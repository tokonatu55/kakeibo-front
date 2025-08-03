import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-100 p-4">
      <div className="flex items-center mb-8 space-x-2">
        <FontAwesomeIcon icon={faBook} className="w-10 h-10" />
        <span className="font-bold">家計簿</span>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link href="/" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faHome} className="w-6 h-6" />
          <span>トップ</span>
        </Link>
        <Link href="/list" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faBook} className="w-6 h-6" />
          <span>家計簿一覧</span>
        </Link>
        <Link href="/new" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faPlus} className="w-6 h-6" />
          <span>新規登録</span>
        </Link>
      </nav>
    </aside>
  );
}
