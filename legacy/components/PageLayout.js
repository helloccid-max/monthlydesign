import Link from 'next/link';

export default function PageLayout({ pageName, prevHref, nextHref, nextLabel = '다음', children }) {
  return (
    <div className="page-layout">
      <div className="page-name">{pageName}</div>
      <div className="page-content">{children}</div>
      <footer className="page-footer">
        {prevHref ? (
          <Link href={prevHref} className="btn btn-prev">
            이전
          </Link>
        ) : (
          <span className="btn btn-prev btn-disabled">이전</span>
        )}
        <Link href={nextHref} className="btn btn-next">
          {nextLabel}
        </Link>
      </footer>
    </div>
  );
}
