import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    { rank: 1, name: 'Александр Петров', belt: '1 кю', points: 950, avatar: '🥋' },
    { rank: 2, name: 'Мария Сидорова', belt: '2 кю', points: 880, avatar: '🥋' },
    { rank: 3, name: 'Иван Козлов', belt: '1 кю', points: 820, avatar: '🥋' },
    { rank: 4, name: 'Екатерина Новикова', belt: '3 кю', points: 760, avatar: '🥋' },
    { rank: 5, name: 'Сергей Морозов', belt: '2 кю', points: 720, avatar: '🥋' }
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🥋</div>
              <h1 className="text-3xl font-bold" style={{ 
                background: 'linear-gradient(135deg, #D4FF00 0%, #8B5CF6 50%, #FF006E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                TOSHIKAN
              </h1>
            </div>
            <div className="hidden md:flex gap-6 items-center">
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
                  className={`text-sm font-medium transition-all hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 0, 110, 0.15) 0%, transparent 50%)',
        }} />
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
          <div className="text-8xl mb-8 animate-glow">🥋</div>
          <h1 className="text-7xl md:text-9xl font-black mb-6" style={{ 
            background: 'linear-gradient(135deg, #D4FF00 0%, #8B5CF6 50%, #FF006E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 80px rgba(139, 92, 246, 0.5)'
          }}>
            TOSHIKAN
          </h1>
          <p className="text-2xl md:text-3xl text-primary mb-4 font-semibold">
            АЙКИДО ДЛЯ НОВОГО ПОКОЛЕНИЯ
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Современный подход к древнему искусству. Техника, философия, сила духа
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-neon-lime text-black hover:bg-neon-lime/90 text-lg font-bold px-8 py-6 shadow-2xl shadow-primary/50"
              onClick={() => scrollToSection('contact')}
            >
              Записаться на тренировку
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg font-bold px-8 py-6"
              onClick={() => scrollToSection('schedule')}
            >
              Расписание
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-gradient-to-b from-transparent to-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-primary text-primary-foreground text-lg px-6 py-2">О клубе</Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ 
              background: 'linear-gradient(135deg, #8B5CF6 0%, #FF006E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              МЫ — ЭТО TOSHIKAN
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: 'Flame', title: 'Энергия', text: 'Современный подход к традициям. Динамичные тренировки с актуальными методиками' },
              { icon: 'Users', title: 'Комьюнити', text: 'Молодая команда единомышленников. Поддержка, мотивация, атмосфера' },
              { icon: 'Trophy', title: 'Результат', text: 'Участие в соревнованиях, аттестациях. Рост от новичка до мастера' }
            ].map((item, idx) => (
              <Card key={idx} className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-105 animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-all">
                    <Icon name={item.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground text-lg px-6 py-2">Расписание</Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-primary">
              ВЫБЕРИ СВОЁ ВРЕМЯ
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-3">
                <Icon name="Calendar" size={28} />
                Тренировки
              </h3>
              <div className="space-y-4">
                {schedule.map((item, idx) => (
                  <Card key={idx} className="bg-card/80 backdrop-blur border-primary/20 hover:border-accent/50 transition-all hover:translate-x-2">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-primary">{item.day}</h4>
                          <p className="text-2xl font-black text-primary">{item.time}</p>
                        </div>
                        <Badge variant="outline" className="border-accent text-accent">
                          {item.level}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground font-medium">{item.group}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                  <Icon name="Bell" size={28} />
                  Календарь с уведомлениями
                </h3>
                {!notificationsEnabled && (
                  <Button 
                    onClick={enableNotifications}
                    size="sm"
                    className="bg-neon-lime text-black hover:bg-neon-lime/90"
                  >
                    <Icon name="Bell" size={16} className="mr-2" />
                    Включить
                  </Button>
                )}
              </div>
              <Card className="bg-card/80 backdrop-blur border-primary/20 p-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                />
                {date && (
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Выбранная дата:</p>
                    <p className="text-lg font-bold text-primary">
                      {date.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <div className="mt-4">
                      {schedule.filter(s => date.getDay() === ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'].indexOf(s.day)).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm mt-2">
                          <Icon name="Clock" size={16} className="text-accent" />
                          <span className="text-foreground font-medium">{item.time} - {item.group}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="trainers" className="py-24 bg-gradient-to-b from-card/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-primary-foreground text-lg px-6 py-2">Тренеры</Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ 
              background: 'linear-gradient(135deg, #FF006E 0%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              КОМАНДА МАСТЕРОВ
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {trainers.map((trainer, idx) => (
              <Card key={idx} className="bg-card/50 backdrop-blur border-primary/20 hover:border-accent/50 transition-all hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl">
                    🥋
                  </div>
                  <CardTitle className="text-2xl text-primary">{trainer.name}</CardTitle>
                  <CardDescription className="text-primary text-lg font-bold">{trainer.rank}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Icon name="Award" size={20} className="text-accent" />
                    <p className="text-muted-foreground">Опыт: {trainer.experience}</p>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary mt-2">
                    {trainer.specialty}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground text-lg px-6 py-2">Галерея</Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-primary">
              НАШИ МОМЕНТЫ
            </h2>
          </div>
          <Tabs defaultValue="photos" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-card">
              <TabsTrigger value="photos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Image" size={20} className="mr-2" />
                Фото
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Icon name="Video" size={20} className="mr-2" />
                Видео
              </TabsTrigger>
            </TabsList>
            <TabsContent value="photos">
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="aspect-square bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center text-6xl hover:scale-105 transition-all border-2 border-primary/20 hover:border-primary/50">
                    🥋
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="aspect-video bg-gradient-to-br from-accent/30 to-primary/30 rounded-2xl flex items-center justify-center hover:scale-105 transition-all border-2 border-accent/20 hover:border-accent/50">
                    <Icon name="Play" size={64} className="text-primary" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="rating" className="py-24 bg-gradient-to-b from-card/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-primary-foreground text-lg px-6 py-2">Рейтинг</Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ 
              background: 'linear-gradient(135deg, #D4FF00 0%, #FF006E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ТОП УЧЕНИКОВ
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {students.map((student) => (
              <Card key={student.rank} className={`bg-card/80 backdrop-blur border-primary/20 hover:border-accent/50 transition-all hover:translate-x-2 ${student.rank <= 3 ? 'border-2 border-primary/50' : ''}`}>
                <CardContent className="p-6 flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-black ${
                    student.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900' :
                    student.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900' :
                    student.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {student.rank}
                  </div>
                  <div className="text-4xl">{student.avatar}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary">{student.name}</h3>
                    <p className="text-muted-foreground">Пояс: {student.belt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-primary">{student.points}</p>
                    <p className="text-sm text-muted-foreground">очков</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="exam" className="py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground text-lg px-6 py-2">Экзамены</Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ 
              background: 'linear-gradient(135deg, #8B5CF6 0%, #D4FF00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ПРОГРАММА АТТЕСТАЦИИ
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {examProgram.map((item, idx) => (
              <Card key={idx} className="bg-card/80 backdrop-blur border-primary/20 hover:border-primary/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center gap-3">
                    <Icon name="Target" size={28} className="text-accent" />
                    {item.belt}
                  </CardTitle>
                  <CardDescription className="text-primary font-semibold flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    {item.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 font-medium">Техники для экзамена:</p>
                  <ul className="space-y-2">
                    {item.techniques.map((tech, techIdx) => (
                      <li key={techIdx} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="py-24 bg-gradient-to-b from-card/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-primary-foreground text-lg px-6 py-2">Новости</Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-primary">
              ЧТО НОВОГО?
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {news.map((item, idx) => (
              <Card key={idx} className="bg-card/80 backdrop-blur border-primary/20 hover:border-accent/50 transition-all hover:translate-x-2">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Newspaper" size={24} className="text-accent" />
                    <Badge variant="outline" className="border-primary text-primary">
                      {item.date}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground text-lg px-6 py-2">Контакты</Badge>
            <h2 className="text-5xl md:text-6xl font-black mb-6" style={{ 
              background: 'linear-gradient(135deg, #FF006E 0%, #D4FF00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ПРИСОЕДИНЯЙСЯ!
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="bg-card/80 backdrop-blur border-primary/20 p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Запись на пробную тренировку</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">Ваше имя</Label>
                  <Input id="name" placeholder="Иван Иванов" className="mt-2 bg-background border-primary/30" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground">Телефон</Label>
                  <Input id="phone" placeholder="+7 (999) 123-45-67" className="mt-2 bg-background border-primary/30" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground">Сообщение</Label>
                  <Textarea id="message" placeholder="Расскажите о своём опыте или задайте вопрос" className="mt-2 bg-background border-primary/30" rows={4} />
                </div>
                <Button className="w-full bg-neon-lime text-black hover:bg-neon-lime/90 text-lg font-bold py-6">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="bg-card/80 backdrop-blur border-primary/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary mb-1">Адрес</h4>
                    <p className="text-muted-foreground">г. Москва, ул. Спортивная, д. 42, зал №3</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-primary/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary mb-1">Телефон</h4>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-primary/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary mb-1">Email</h4>
                    <p className="text-muted-foreground">info@toshikan.ru</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-primary/20 p-6">
                <h4 className="font-bold text-lg text-primary mb-4">Мы в соцсетях</h4>
                <div className="flex gap-4">
                  <Button size="icon" variant="outline" className="border-primary hover:bg-primary hover:text-primary-foreground">
                    <Icon name="Instagram" size={20} />
                  </Button>
                  <Button size="icon" variant="outline" className="border-primary hover:bg-primary hover:text-primary-foreground">
                    <Icon name="Youtube" size={20} />
                  </Button>
                  <Button size="icon" variant="outline" className="border-primary hover:bg-primary hover:text-primary-foreground">
                    <Icon name="MessageCircle" size={20} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-card/50 backdrop-blur border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl">🥋</div>
            <h3 className="text-3xl font-bold" style={{ 
              background: 'linear-gradient(135deg, #D4FF00 0%, #8B5CF6 50%, #FF006E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              TOSHIKAN
            </h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Айкидо клуб нового поколения
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 TOSHIKAN. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
