import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ArrowLeftRight,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  HelpCircle,
  Upload
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import mahaayaLogo from '@/assets/mahaaya-logo.png';

const mainMenuItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Upload Transcript', url: '/upload', icon: Upload },
  { title: 'Transcript Review', url: '/review', icon: FileText },
  { title: 'Course Equivalency', url: '/equivalency', icon: ArrowLeftRight },
  { title: 'Student Records', url: '/students', icon: Users },
  { title: 'AI Advisor', url: '/advisor', icon: MessageSquare },
  { title: 'Reports', url: '/reports', icon: BarChart3 },
];

const bottomMenuItems = [
  { title: 'Settings', url: '/settings', icon: Settings },
  { title: 'Help', url: '/help', icon: HelpCircle },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <img src={mahaayaLogo} alt="Mahaaya" className="h-8 w-auto" />
        </div>
        <div className="mt-2">
          <span className="text-xl font-semibold tracking-tight text-primary">CLARITY</span>
          <p className="text-xs text-muted-foreground">Transcript Evaluation System</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
              >
                <Link to={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
