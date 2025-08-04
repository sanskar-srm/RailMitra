import Header from '@/components/layout/header';
import SearchTabs from '@/components/features/search-tabs';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-12">
           <h1 className="text-4xl font-bold tracking-tight mb-8">Dashboard</h1>
           <SearchTabs />
        </div>
      </main>
    </div>
  );
}
