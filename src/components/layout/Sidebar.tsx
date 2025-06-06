
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardCheck, 
  Users, 
  Settings,
  FlaskConical
} from 'lucide-react';
import { UserRole } from '@/types/validation';
import { useLanguage } from '@/contexts/LanguageContext';

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
      roles: ['administrador', 'analista', 'visualizador'],
    },
    {
      id: 'products',
      label: t('menu.products'),
      icon: Package,
      roles: ['administrador', 'analista', 'visualizador'],
    },
    {
      id: 'validations',
      label: t('menu.validations'),
      icon: ClipboardCheck,
      roles: ['administrador', 'analista', 'visualizador'],
    },
    {
      id: 'equipments',
      label: t('menu.equipments'),
      icon: FlaskConical,
      roles: ['administrador', 'analista', 'visualizador'],
    },
    {
      id: 'users',
      label: t('menu.users'),
      icon: Users,
      roles: ['administrador'],
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

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-full">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const showAlert = item.id === 'validations' && alertCounts && (alertCounts.expiring > 0 || alertCounts.expired > 0);
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
              {showAlert && (
                <Badge variant="destructive" className="ml-auto">
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
