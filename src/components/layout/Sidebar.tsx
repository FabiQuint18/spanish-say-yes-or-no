
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardCheck, 
  Users, 
  Settings,
  FlaskConical,
  Shield
} from 'lucide-react';
import { UserRole } from '@/types/validation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: UserRole;
  alertCounts?: {
    expiring: number;
    expired: number;
  };
}

const Sidebar = ({ activeTab, onTabChange, userRole, alertCounts }: SidebarProps) => {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 'dashboard',
      label: t('menu.dashboard'),
      icon: LayoutDashboard,
      roles: ['administrador', 'coordinador', 'analista', 'visualizador'],
    },
    {
      id: 'products',
      label: t('menu.products'),
      icon: Package,
      roles: ['administrador', 'coordinador', 'analista'],
    },
    {
      id: 'validations',
      label: t('menu.validations'),
      icon: ClipboardCheck,
      roles: ['administrador', 'coordinador', 'analista', 'visualizador'],
    },
    {
      id: 'equipments',
      label: t('menu.equipments'),
      icon: FlaskConical,
      roles: ['administrador', 'coordinador', 'analista'],
    },
    {
      id: 'users',
      label: t('menu.users'),
      icon: Users,
      roles: ['administrador'],
    },
    {
      id: 'security',
      label: 'Seguridad CFR 21',
      icon: Shield,
      roles: ['administrador', 'coordinador'],
    },
    {
      id: 'settings',
      label: t('menu.settings'),
      icon: Settings,
      roles: ['administrador'],
    },
  ];

  const filteredItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const handleTabClick = (tabId: string) => {
    console.log('Switching to tab:', tabId);
    onTabChange(tabId);
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-full">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const showAlert = item.id === 'validations' && alertCounts && (alertCounts.expiring > 0 || alertCounts.expired > 0);
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start transition-colors',
                isActive 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary/90' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              onClick={() => handleTabClick(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
              {showAlert && (
                <Badge variant="destructive" className="ml-auto text-xs px-1.5 py-0.5">
                  {alertCounts.expiring + alertCounts.expired}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
