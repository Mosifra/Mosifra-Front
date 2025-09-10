import { useLocation } from 'preact-iso';

export function Header() {
  const { url, route } = useLocation();

  const isActive = (p) => url === p;

  return (
    <nav className="sticky top-0 z-50 bg-[#B41C25]">
      <div className="flex items-center py-4 px-8 relative">
        <div className="flex items-center py-4 px-8">
          <img src="/images/logo_transparent_notext.svg" className="size-16" />
          <span className="pl-4 text-xl pt-5 text-[#39482A]">Mosifra</span>
        </div>
        <ul className="ml-auto flex list-none p-0 m-0 gap-4">
          <li className="relative">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                route('/');
              }}
              className={`flex items-center gap-6 py-4 px-8 ${
                isActive('/')
                  ? 'text-indigo-500'
                  : 'text-white'
              }`}
            >
              <span>Accueil</span>
            </a>
          </li>
          <li className="relative">
          <a
            href="/404"
            onClick={(e) => {
              e.preventDefault();
              route('/404');
            }}
            className={`flex items-center gap-6 py-4 px-8 ${
              isActive('/404')
                ? 'text-indigo-500'
                : 'text-white'
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

