
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import LanguageSelector from '@/components/ui/language-selector';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  currentUser: any;
  onLogout: () => void;
}

const Header = ({ currentUser, onLogout }: HeaderProps) => {
  const { t } = useLanguage();

  return (
    <header className="bg-background shadow-sm border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('system.title')}
              </h1>
              <p className="text-sm text-muted-foreground">{t('system.subtitle')}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground">
                <User className="h-4 w-4" />
                <span>{currentUser?.full_name || currentUser?.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border border-border">
              <DropdownMenuItem onClick={onLogout} className="hover:bg-accent hover:text-accent-foreground cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                {t('login.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
