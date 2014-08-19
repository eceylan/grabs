## Grabs Install

Node.js, Npm and Grunt must be installed.

Steps:

1. `git clone https://github.com/sercaneraslan/grabs.git`
1. `cd grabs`
1. `npm install`
1. `grunt bower:install`
1. `grunt`

Check the address: http://localhost:9000/


## Grabs Kurulumu

Kurulum için Node.js, Npm ve Grunt kurulu olmalıdır.

Adımlar:

1. `git clone https://github.com/sercaneraslan/grabs.git`
1. `cd grabs`
1. `npm install`
1. `grunt bower:install`
1. `grunt`

Adresi kontrol et: http://localhost:9000/

Grabs özellikleri aşağıda listelenmiştir.

#### Grunt
Grunt eklentileri ile dilediğiniz görevi projenize ekleyebilirsiniz.  "gruntfile.js" dosyasından ayarlar değiştirilebilir.

#### Angular
Proje içinde Angular kuruludur. HTML5 Push State desteği açıktır ve her isteğin index.html'e gitmesi için ayarlar yapılmıştır. "app/config/ng-config.js" dosyasından ayarlar değiştirilebilir.
2
#### Bower
Bower ile dışarı bağımlı olduğunuz kütüphanelerin dosyalarını otomatik olarak çekebilirsiniz. "bower.json" dosyasını düzenleyerek ve "grunt bower:install" komutunu kullanarak istediğiniz kütüphanelerin çekilmesini sağlayabilirsiniz. "gruntfile.js" dosyasındaki "bower" alanından grunt ayarları değiştirilebilir.

#### Stylus
Stylus dosyalarınızın her kod değişiminde otomatik olarak CSS'e derlenmesini ve sıkıştırılmasını sağlar. "gruntfile.js" dosyasındaki "stylus" alanından ayarlar değiştirilebilir.

#### Sprite
"app/img/sprite" klasörü altındaki imajları "sprite.png" dosyasında birleştirir ve Stylus dosyalarında dosya isimleri ile pozisyon tanımlaya gerek kalmadan otomatik olarak kullabilmeyi sağlar. "app/img/sprite-retina" altındaki imajları da "sprite-retina.png" dosyasında birleştirir ve ekstra bir işleme gerek kalmadan retina desteği olan cihazlarda retina'lı sprite'ı kullandırır. "app/img/sprite" ve "app/img/sprite-retina" haricindeki klasörler işlem görmeden otomatik olarak "build" klösörüne taşınır. "gruntfile.js" dosyasındaki "sprite" alanından ayarlar değiştirilebilir.

#### Template
HTML'e template özelliği ekler. "gruntfile.js" dosyasındaki "template" alanından ayarlar değiştirilebilir.

#### Geliştirme Modu
Geliştirme modunda HTML, CSS ve JavaScript dosyaları sıkıştırılmazlar. CSS'ler ve JavaScript'ler ayrı ayrı dosyalardadır. İmajlar küçültülmez. "grunt" komutu ile geliştirme modu çalıştırılabilir.

#### Live Modu
Live modunda HTML, CSS ve JavaScript dosyaları sıkıştırılır. CSS'ler ve JavaScript'ler tek dosya olarak birleştirilir. İmajlar küçültülür. Dosyaların cache'lenmesi engellenir. "grunt live" komutu ile live moduna geçilir.

#### JSHint
JSHint, JavaScript'lerinizin her kod değişiminde otomatik olarak kontrol edilmesi sağlar. "gruntfile.js" dosyasındaki "jshint" alanından ayarlar değiştirilebilir.

#### Kod Karmaşıklık Raporu
Proje içinde kullanılanılan JavaScript'lerin karmaşıklık raporunu oluşturur. "gruntfile.js" dosyasındaki "plato" alanından ayarlar değiştirilebilir. "grunt report" komutuyla raporu görüntüleyebilirsiniz.

#### HTML sıkıştırma
HTML dosyalarının sıkıştırılmasını sağlar. "gruntfile.js" dosyasındaki "htmlmin" alanından ayarlar değiştirilebilir.

#### İmaj sıkıştırma
Image'ların sıkıştırılmasını sağlar. "gruntfile.js" dosyasındaki "imagemin" alanından ayarlar değiştirilebilir.

#### JavaScript sıkıştırma
JavaScript'lerin sıkıştırılmasını sağlar ve source map desteği vardır. "gruntfile.js" dosyasındaki "uglify" alanından ayarlar değiştirilebilir.

#### Bilgilendirme
İşletim sistemi bazında bilgilendirme yapar. JavaScript hatalarını, konsolda oluşan hataları vb bildirim olarak gösterir. İstenilen görevler için bilgilendirmeler tanımlanabilir. "gruntfile.js" dosyasındaki "notify_hooks" alanından ayarlar değiştirilebilir.

#### Cache
Sıkıştırılan HTML, CSS, JavaScript ve imaj dosyalarının sonuna her seferinde tarihe göre değişen rakamlar ekler. Örneğin; "app.min.1408295277445.css".

#### Server
Server kullanma özelliği sağlar. "gruntfile.js" dosyasındaki "connect" alanından ayarlar değiştirilebilir.

#### Livereload
Herhangi bir HTML, CSS ya da JS dosyası değiştiğinde otomatik olarak tarayıcıdaki sayfayı yeniler. "gruntfile.js" dosyasındaki "connect" alanından ayarlar değiştirilebilir.
