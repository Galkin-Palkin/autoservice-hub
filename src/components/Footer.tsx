import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-8 tablet:py-12 xl:py-16">
        <div className="grid grid-cols-1 tablet:grid-cols-2 xl:grid-cols-4 gap-6 tablet:gap-8">
          {/* Brand */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-3 tablet:mb-4">
              <div className="w-7 h-7 tablet:w-8 tablet:h-8 rounded-md bg-accent-gradient flex items-center justify-center shrink-0">
                <span className="font-display text-accent-foreground font-bold text-sm tablet:text-base">З</span>
              </div>
              <span className="font-display text-base tablet:text-lg break-words">ЗАПЧАСТИ + СЕРВИС</span>
            </div>
            <p className="text-primary-foreground/50 text-xs tablet:text-sm leading-relaxed">
              Профессиональный автотехцентр. Оригинальные запчасти и качественный ремонт с 2013 года.
            </p>
          </div>

          {/* Navigation */}
          <div className="min-w-0">
            <h4 className="font-display text-xs tablet:text-sm uppercase tracking-wider mb-3 tablet:mb-4 text-primary-foreground/70">Навигация</h4>
            <ul className="space-y-1.5 tablet:space-y-2 text-xs tablet:text-sm text-primary-foreground/50">
              <li><Link to="/#parts" className="hover:text-accent transition-colors">Каталог запчастей</Link></li>
              <li><Link to="/repair" className="hover:text-accent transition-colors">Запись на ремонт</Link></li>
              <li><Link to="/#promo" className="hover:text-accent transition-colors">Прайс-лист</Link></li>
              <li><Link to="/#promo" className="hover:text-accent transition-colors">Акции</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="min-w-0">
            <h4 className="font-display text-xs tablet:text-sm uppercase tracking-wider mb-3 tablet:mb-4 text-primary-foreground/70">Услуги</h4>
            <ul className="space-y-1.5 tablet:space-y-2 text-xs tablet:text-sm text-primary-foreground/50">
              <li>Диагностика</li>
              <li>Ремонт двигателя</li>
              <li>Ремонт подвески</li>
              <li>ТО и обслуживание</li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="min-w-0">
            <h4 className="font-display text-xs tablet:text-sm uppercase tracking-wider mb-3 tablet:mb-4 text-primary-foreground/70">Контакты</h4>
            <ul className="space-y-2 tablet:space-y-3 text-xs tablet:text-sm text-primary-foreground/50">
              <li className="flex items-center gap-2 min-w-0">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+78001234567" className="hover:text-accent transition-colors truncate">8 (800) 123-45-67</a>
              </li>
              <li className="flex items-center gap-2 min-w-0">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:info@autoservice.ru" className="hover:text-accent transition-colors break-all">info@autoservice.ru</a>
              </li>
              <li className="flex items-start gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>г. Москва, ул. Автомобильная, д. 42</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 tablet:mt-10 pt-4 tablet:pt-6 text-center text-[10px] tablet:text-xs text-primary-foreground/30">
          © 2025 Запчасти + Сервис. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
