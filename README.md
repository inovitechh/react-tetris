# React Tetris - Dokunmatik Kontrollü

Android cihazlar için özel olarak tasarlanmış, React ile geliştirilmiş modern bir Tetris oyunu.

## 🎮 Özellikler

- **Dokunmatik Kontroller**: Telefonlarda parmak hareketleri ile oynanabilir
- **Yön Tuşları**: Ekranda bulunan büyük, kolay kullanılabilir kontrol butonları
- **Responsive Tasarım**: Tüm ekran boyutlarına uyumlu
- **Modern Arayüz**: Glassmorphism tasarım ile şık görünüm
- **Swipe Kontrolleri**: Sola/sağa kaydırarak parça hareket ettirme
- **Gölge Sistemi**: Parçanın nereye düşeceğini gösteren gölge efekti
- **Skor Sistemi**: Seviye, satır ve skor takibi

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd react_tetris
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı başlatın:
```bash
npm start
```

4. Tarayıcınızda `http://localhost:3000` adresini açın.

## 📱 Mobil Kullanım

### Dokunmatik Kontroller:
- **Swipe Sol/Sağ**: Parçayı sola veya sağa hareket ettir
- **Kontrol Butonları**: Ekrandaki büyük butonları kullan
- **Döndürme**: ↻ butonuna basarak parçayı döndür
- **Hızlı Düşürme**: ↓ butonuna basarak parçayı hızla düşür

### Oyun Kontrolleri:
- **Duraklat/Devam**: Oyunu duraklatmak için "Duraklat" butonuna bas
- **Yeni Oyun**: Oyun bittiğinde "Yeni Oyun" butonuna bas

## 🎯 Oyun Kuralları

- Parçaları döndürerek ve hareket ettirerek boşlukları doldurun
- Tamamlanan satırlar otomatik olarak temizlenir
- Her temizlenen satır için puan kazanırsınız
- Seviye arttıkça parçalar daha hızlı düşer
- Oyun alanı dolduğunda oyun biter

## 🛠️ Teknolojiler

- **React 18**: Modern React hooks kullanımı
- **CSS3**: Glassmorphism ve responsive tasarım
- **Touch Events**: Dokunmatik cihaz desteği
- **ES6+**: Modern JavaScript özellikleri

## 📦 Build

Üretim için build almak için:

```bash
npm run build
```

Build dosyaları `build` klasöründe oluşturulacaktır.

## 🎨 Özelleştirme

Oyun sabitlerini `src/utils/constants.js` dosyasından değiştirebilirsiniz:
- Oyun tahtası boyutu
- Parça renkleri
- Oyun hızı

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

Herhangi bir sorunuz veya öneriniz için issue açabilirsiniz.

---

**Not**: Bu oyun özellikle Android cihazlar için optimize edilmiştir ve dokunmatik kontroller ile en iyi deneyimi sunar.



