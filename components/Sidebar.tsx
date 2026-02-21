'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard, Heart, Calendar, BarChart3,
  Download, User, LogOut, Languages
} from 'lucide-react'
import i18n from '@/lib/i18n'

const navItems = [
  { key: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'health',    href: '/health',    icon: Heart },
  { key: 'schedule',  href: '/schedule',  icon: Calendar },
  { key: 'analytics', href: '/analytics', icon: BarChart3 },
  { key: 'export',    href: '/export',    icon: Download },
  { key: 'profile',   href: '/profile',   icon: User },
]

export default function Sidebar() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()

  const toggleLang = () => {
    const newLang = i18n.language === 'ru' ? 'kz' : 'ru'
    i18n.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col shadow-sm">
      {/* Логотип */}
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800 leading-tight">Health Impact</div>
            <div className="text-xs text-slate-500">Monitor</div>
          </div>
        </div>
        <div className="mt-1 text-xs text-slate-400">СКУ им. М.Козыбаева</div>
      </div>

      {/* Навигация */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ key, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={key}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t(`nav.${key}`)}
            </Link>
          )
        })}
      </nav>

      {/* Переключатель языка + Выход */}
      <div className="p-3 border-t border-slate-200 space-y-1">
        <button
          onClick={toggleLang}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
        >
          <Languages className="w-4 h-4" />
          {i18n.language === 'ru' ? 'Қазақша' : 'Русский'}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          {t('nav.logout')}
        </button>
      </div>
    </aside>
  )
}
