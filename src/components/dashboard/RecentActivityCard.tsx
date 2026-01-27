import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  type: 'upload' | 'review' | 'approval' | 'pending';
  title: string;
  description: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'upload',
    title: 'New Transcript Uploaded',
    description: 'Sarah Johnson - Community College of Denver',
    time: '2 mins ago'
  },
  {
    id: '2',
    type: 'approval',
    title: 'Credits Approved',
    description: 'Michael Chen - 45 credits transferred',
    time: '15 mins ago'
  },
  {
    id: '3',
    type: 'review',
    title: 'Faculty Review Required',
    description: 'PHYS 150 - Needs equivalency verification',
    time: '1 hour ago'
  },
  {
    id: '4',
    type: 'pending',
    title: 'Awaiting Documents',
    description: 'Emily Rodriguez - Missing official transcript',
    time: '2 hours ago'
  }
];

const iconMap = {
  upload: FileText,
  review: Clock,
  approval: CheckCircle,
  pending: AlertCircle
};

const colorMap = {
  upload: 'text-primary',
  review: 'text-[hsl(var(--warning))]',
  approval: 'text-[hsl(var(--success))]',
  pending: 'text-destructive'
};

export function RecentActivityCard() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div key={activity.id} className="flex items-start gap-4 rounded-lg p-3 hover:bg-accent transition-colors">
              <div className={cn("rounded-full p-2 bg-card", colorMap[activity.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
