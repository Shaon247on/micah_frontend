export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <header className="h-16 bg-(--color-surface) border-b border-(--color-border) flex items-center justify-between px-8">
      <div className="text-(--color-text-muted) text-sm">
        {currentDate}
      </div>
      <div className="flex items-center">
        <img
          src="https://ui-avatars.com/api/?name=Sarah+Mitchell&background=c25e28&color=fff"
          alt="Profile"
          className="w-8 h-8 rounded-full border border-(--color-border)"
        />
      </div>
    </header>
  );
}
