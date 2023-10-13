import Link from "next/link";
import "./styles.css";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <strong className="header-title">Control Panel</strong>
      </Link>

      <nav className="header-nav">
        <Link href="/" className="header-anchor">
          Transactions
        </Link>
        <strong>|</strong>
        <Link href="/seller" className="header-anchor">
          Sellers
        </Link>
      </nav>
    </header>
  );
}
