import StatCard from '@/components/dashboard/StatCard';
import { Newspaper, Users, MessageSquare, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-headline text-4xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome back! Here's a snapshot of your news platform.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Articles" value="1,250" icon={Newspaper} />
        <StatCard title="Total Users" value="5,832" icon={Users} />
        <StatCard title="New Comments" value="189" icon={MessageSquare} description="In the last 24 hours" />
        <StatCard title="Today's Views" value="42,593" icon={BarChart3} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Activity feed coming soon...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Top articles list coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
