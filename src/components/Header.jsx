import { useLocation } from 'preact-iso';

export function Header() {
  const { url, route } = useLocation();

  const isActive = (p) => url === p;

  return (
    <nav className="sticky top-0 z-50 bg-red-500">
      <div className="flex items-center py-4 px-8 relative">
        <div className="flex items-center bg-yellow-500 py-4 px-8">
          <img src="/images/logo_notext.svg" className="size-16" />
        </div>
        <ul className="ml-auto flex list-none p-0 m-0 gap-4">
          <li className="relative">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                route('/');
              }}
              className={`flex items-center gap-6 py-4 px-8 border-2 border-indigo-600 ${
                isActive('/')
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-500 text-green-500'
              }`}
            >
              <span>Home</span>
            </a>
          </li>
          <li className="relative">
          <a
            href="/404"
            onClick={(e) => {
              e.preventDefault();
              route('/404');
            }}
            className={`flex items-center gap-6 py-4 px-8 border-2 border-indigo-600 ${
              isActive('/404')
                ? 'bg-green-500 text-white'
                : 'bg-yellow-500 text-green-500'
            }`}
          >
            <span>404</span>
          </a>
        </li>

        </ul>
      </div>
    </nav>
  );
}

