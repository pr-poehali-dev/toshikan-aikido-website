import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeSection, setActiveSection] = useState('home');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://cdn.poehali.dev/projects/91839e04-a5a6-43cf-bc53-5fd2013e1bf1/files/81d0d555-7bbd-44d4-9ad1-2874fe6b0583.jpg',
    'https://cdn.poehali.dev/projects/91839e04-a5a6-43cf-bc53-5fd2013e1bf1/files/70927308-cfdb-49f9-9b13-3d594abe02f7.jpg',
    'https://cdn.poehali.dev/projects/91839e04-a5a6-43cf-bc53-5fd2013e1bf1/files/41934713-2ce1-4809-b479-e61ab3eaf5de.jpg'
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'schedule', 'trainers', 'gallery', 'rating', 'exam', 'news', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trainers = [
    { name: 'Сенсей Михаил Ивановский', rank: '5 дан', experience: '25 лет', specialty: 'Техника и философия' },
    { name: 'Сенпай Анна Волкова', rank: '3 дан', experience: '12 лет', specialty: 'Работа с начинающими' },
    { name: 'Сенпай Дмитрий Соколов', rank: '4 дан', experience: '18 лет', specialty: 'Спарринг и защита' }
  ];

  const schedule = [
    { day: 'Понедельник', time: '18:00-20:00', group: 'Взрослые', level: 'Все уровни' },
    { day: 'Среда', time: '19:00-20:30', group: 'Продвинутые', level: '2 кю+' },
    { day: 'Пятница', time: '17:00-18:30', group: 'Дети 8-14 лет', level: 'Начинающие' },
    { day: 'Суббота', time: '10:00-12:00', group: 'Взрослые', level: 'Все уровни' },
    { day: 'Воскресенье', time: '11:00-13:00', group: 'Семейные', level: 'Все уровни' }
  ];

  const students = [
    { rank: 1, name: 'Александр Петров', belt: '1 кю', points: 950 },
    { rank: 2, name: 'Мария Сидорова', belt: '2 кю', points: 880 },
    { rank: 3, name: 'Иван Козлов', belt: '1 кю', points: 820 },
    { rank: 4, name: 'Екатерина Новикова', belt: '3 кю', points: 760 },
    { rank: 5, name: 'Сергей Морозов', belt: '2 кю', points: 720 }
  ];

  const examProgram = [
    { belt: '6 кю (белый пояс)', techniques: ['Укеми (страховка)', 'Шомен учи', 'Йокомен учи', 'Катате дори'], duration: '3-6 месяцев' },
    { belt: '5 кю (желтый)', techniques: ['Иккё омотэ/ура', 'Никё омотэ/ура', 'Санкё омотэ', 'Котэгаеши'], duration: '6 месяцев' },
    { belt: '4 кю (оранжевый)', techniques: ['Ёнкё', 'Шихо нагэ', 'Ирими нагэ', 'Тенчи нагэ'], duration: '6-9 месяцев' },
    { belt: '3 кю (зеленый)', techniques: ['Коте маваши', 'Кокю хо', 'Суми отоши', 'Удэ кими нагэ'], duration: '9-12 месяцев' }
  ];

  const news = [
    { date: '15 ноября 2024', title: 'Открытие нового зала', text: 'Рады сообщить об открытии второй тренировочной площадки в центре города!' },
    { date: '1 ноября 2024', title: 'Семинар с японским мастером', text: 'В декабре состоится уникальный семинар с сенсеем Такэда из Токио' },
    { date: '20 октября 2024', title: 'Результаты аттестации', text: '12 учеников успешно сдали экзамены на новые пояса. Поздравляем!' }
  ];

  const enableNotifications = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          new Notification('TOSHIKAN', {
            body: 'Уведомления о тренировках включены! Мы напомним вам о занятиях.',
            icon: '/favicon.svg'
          });
        }
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">TOSHIKAN</h1>
            <div className="hidden md:flex gap-8 items-center">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'about', label: 'О клубе' },
                { id: 'schedule', label: 'Расписание' },
                { id: 'trainers', label: 'Тренеры' },
                { id: 'gallery', label: 'Галерея' },
                { id: 'rating', label: 'Рейтинг' },
                { id: 'exam', label: 'Экзамены' },
                { id: 'news', label: 'Новости' },
                { id: 'contact', label: 'Контакты' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition-colors ${
                    activeSection === item.id ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-7xl md:text-8xl font-light mb-8 tracking-tighter">
            TOSHIKAN
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-foreground mb-4 font-light">
            Айкидо для нового поколения
          </p>
          <p className="text-sm text-muted-foreground mb-16 max-w-md mx-auto font-light">
            Современный подход к древнему искусству
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal"
              onClick={() => scrollToSection('contact')}
            >
              Записаться
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-foreground text-foreground hover:bg-foreground hover:text-background font-normal"
              onClick={() => scrollToSection('schedule')}
            >
              Расписание
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">О клубе</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-muted-foreground font-light leading-relaxed">
              Мы — это современное сообщество, которое объединяет традиции айкидо с актуальными подходами к тренировкам
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { title: 'Энергия', text: 'Динамичные тренировки с применением современных методик развития' },
              { title: 'Комьюнити', text: 'Команда единомышленников с общими целями и взаимной поддержкой' },
              { title: 'Результат', text: 'Системный рост от начинающего до опытного практика айкидо' }
            ].map((item, idx) => (
              <div key={idx} className="text-center border-l-2 border-primary pl-6">
                <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="py-32 border-t border-border bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Расписание</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <h3 className="text-lg font-medium mb-8">Тренировки</h3>
              <div className="space-y-1">
                {schedule.map((item, idx) => (
                  <div key={idx} className="py-6 border-b border-white/10 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-secondary-foreground/60 mb-1">{item.day}</p>
                        <p className="text-lg font-medium">{item.time}</p>
                      </div>
                      <Badge variant="outline" className="font-normal text-xs border-primary text-primary">
                        {item.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-secondary-foreground/60">{item.group}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-lg font-medium">Календарь</h3>
                {!notificationsEnabled && (
                  <Button 
                    onClick={enableNotifications}
                    size="sm"
                    variant="outline"
                    className="font-normal text-xs border-white/20 text-white hover:bg-white hover:text-black"
                  >
                    Уведомления
                  </Button>
                )}
              </div>
              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md text-white"
                  />
                  {date && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-xs text-secondary-foreground/60 mb-3">
                        {date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </p>
                      {schedule.filter(s => date.getDay() === ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].indexOf(s.day)).map((item, idx) => (
                        <div key={idx} className="text-sm mt-2">
                          {item.time} — {item.group}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="trainers" className="py-32 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Тренеры</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {trainers.map((trainer, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-32 h-32 mx-auto mb-6 bg-muted flex items-center justify-center text-4xl border-2 border-transparent group-hover:border-primary transition-colors">
                  🥋
                </div>
                <h3 className="text-base font-medium mb-1">{trainer.name}</h3>
                <p className="text-sm text-primary mb-1">{trainer.rank}</p>
                <p className="text-xs text-muted-foreground">{trainer.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-32 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Галерея</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>
          <Tabs defaultValue="photos" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-12 bg-muted">
              <TabsTrigger value="photos" className="font-normal text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Фото</TabsTrigger>
              <TabsTrigger value="videos" className="font-normal text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Видео</TabsTrigger>
            </TabsList>
            <TabsContent value="photos">
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-video bg-muted overflow-hidden group">
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`Тренировка ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="ChevronRight" size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 transition-colors ${
                          idx === currentImageIndex ? 'bg-primary' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-video overflow-hidden border-2 transition-colors ${
                        idx === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Миниатюра ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 gap-1 max-w-4xl mx-auto">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="aspect-video bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer group">
                    <Icon name="Play" size={48} className="text-foreground/20 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="rating" className="py-32 border-t border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Рейтинг учеников</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="max-w-2xl mx-auto space-y-1">
            {students.map((student) => (
              <div key={student.rank} className="py-6 border-b border-border last:border-0 flex items-center justify-between hover:bg-muted/50 transition-colors px-4">
                <div className="flex items-center gap-6">
                  <span className={`text-2xl font-light w-8 ${student.rank <= 3 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    {student.rank}
                  </span>
                  <div>
                    <h3 className="text-base font-medium">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.belt}</p>
                  </div>
                </div>
                <span className="text-xl font-light">{student.points}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="exam" className="py-32 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Программа аттестации</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {examProgram.map((item, idx) => (
              <div key={idx} className="border-l-2 border-primary pl-8">
                <h3 className="text-lg font-medium mb-2">{item.belt}</h3>
                <p className="text-xs text-muted-foreground mb-6">{item.duration}</p>
                <ul className="space-y-2">
                  {item.techniques.map((tech, techIdx) => (
                    <li key={techIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">—</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="py-32 border-t border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Новости</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto space-y-1">
            {news.map((item, idx) => (
              <div key={idx} className="py-8 border-b border-border last:border-0">
                <p className="text-xs text-primary mb-3">{item.date}</p>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Контакты</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div>
              <h3 className="text-lg font-medium mb-8">Запись на тренировку</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-normal text-muted-foreground mb-2 block">Имя</Label>
                  <Input id="name" placeholder="Иван Иванов" className="bg-background" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-normal text-muted-foreground mb-2 block">Телефон</Label>
                  <Input id="phone" placeholder="+7 (999) 123-45-67" className="bg-background" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-normal text-muted-foreground mb-2 block">Сообщение</Label>
                  <Textarea id="message" placeholder="Ваше сообщение" className="bg-background" rows={4} />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-normal">
                  Отправить
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-l-2 border-primary pl-6">
                <h4 className="text-sm font-medium mb-2">Адрес</h4>
                <p className="text-sm text-muted-foreground">г. Москва, ул. Спортивная, д. 42, зал №3</p>
              </div>
              <div className="border-l-2 border-primary pl-6">
                <h4 className="text-sm font-medium mb-2">Телефон</h4>
                <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
              </div>
              <div className="border-l-2 border-primary pl-6">
                <h4 className="text-sm font-medium mb-2">Email</h4>
                <p className="text-sm text-muted-foreground">info@toshikan.ru</p>
              </div>
              <div className="border-l-2 border-primary pl-6">
                <h4 className="text-sm font-medium mb-4">Социальные сети</h4>
                <div className="flex gap-3">
                  <Button size="icon" variant="outline" className="w-10 h-10 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    <Icon name="Instagram" size={18} />
                  </Button>
                  <Button size="icon" variant="outline" className="w-10 h-10 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    <Icon name="Youtube" size={18} />
                  </Button>
                  <Button size="icon" variant="outline" className="w-10 h-10 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    <Icon name="MessageCircle" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-medium mb-2">TOSHIKAN</p>
          <p className="text-xs text-secondary-foreground/60">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
