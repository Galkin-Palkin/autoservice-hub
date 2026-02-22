import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-accent-gradient flex items-center justify-center">
                <span className="font-display text-accent-foreground font-bold">З</span>
              </div>
              <span className="font-display text-lg">ЗАПЧАСТИ + СЕРВИС</span>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              Профессиональный автотехцентр. Оригинальные запчасти и качественный ремонт с 2013 года.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-primary-foreground/70">Навигация</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/50">
              <li><Link to="/#parts" className="hover:text-accent transition-colors">Каталог запчастей</Link></li>
              <li><Link to="/repair" className="hover:text-accent transition-colors">Запись на ремонт</Link></li>
              <li><Link to="/#promo" className="hover:text-accent transition-colors">Прайс-лист</Link></li>
              <li><Link to="/#promo" className="hover:text-accent transition-colors">Акции</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-primary-foreground/70">Услуги</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/50">
              <li>Диагностика</li>
              <li>Ремонт двигателя</li>
              <li>Ремонт подвески</li>
              <li>ТО и обслуживание</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-primary-foreground/70">Контакты</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/50">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+78001234567" className="hover:text-accent transition-colors">8 (800) 123-45-67</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:info@autoservice.ru" className="hover:text-accent transition-colors">info@autoservice.ru</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>г. Москва, ул. Автомобильная, д. 42</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs text-primary-foreground/30">
          © 2025 Запчасти + Сервис. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
