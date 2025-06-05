
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
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['administrador', 'analista', 'visualizador'],
    },
    {
      id: 'products',
      label: 'Productos',
      icon: Package,
      roles: ['administrador', 'analista', 'visualizador'],
    },
    {
      id: 'validations',
      label: 'Validaciones',
      icon: ClipboardCheck,
      roles: ['administrador', 'analista', 'visualizador'],
    },
    {
      id: 'equipments',
      label: 'Equipos Analíticos',
      icon: FlaskConical,
      roles: ['administrador', 'analista', 'visualizador'],
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: Users,
      roles: ['administrador'],
    },
    {
      id: 'settings',
      label: 'Configuración',
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
