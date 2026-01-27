import { FileText, Users, CheckCircle, Clock, Target, Award } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { ProcessingChart } from '@/components/dashboard/ProcessingChart';
import { dashboardStats } from '@/data/mockData';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of transcript processing and transfer credit status</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatsCard
            title="Total Transcripts"
            value={dashboardStats.totalTranscripts.toLocaleString()}
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Pending Review"
            value={dashboardStats.pendingReview}
            icon={Clock}
            description="Awaiting evaluation"
          />
          <StatsCard
            title="Completed Today"
            value={dashboardStats.completedToday}
            icon={CheckCircle}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Avg. Processing"
            value={dashboardStats.avgProcessingTime}
            icon={Target}
            description="Per transcript"
          />
          <StatsCard
            title="Accuracy Rate"
            value={`${dashboardStats.accuracyRate}%`}
            icon={Award}
            trend={{ value: 2.3, isPositive: true }}
          />
          <StatsCard
            title="Credits Processed"
            value={dashboardStats.creditsProcessed.toLocaleString()}
            icon={Users}
            description="This month"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProcessingChart />
          </div>
          <div>
            <RecentActivityCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
